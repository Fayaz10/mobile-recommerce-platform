package com.recommerce.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recommerce.dto.AddToCartRequest;
import com.recommerce.dto.CartItemResponse;
import com.recommerce.dto.CartResponse;
import com.recommerce.dto.UpdateCartItemRequest;
import com.recommerce.model.Cart;
import com.recommerce.model.CartItem;
import com.recommerce.model.Product;
import com.recommerce.model.User;
import com.recommerce.repository.CartItemRepository;
import com.recommerce.repository.CartRepository;
import com.recommerce.repository.ProductRepository;

import com.recommerce.exception.BadRequestException;
import com.recommerce.exception.ResourceNotFoundException;

@Service
public class CartService {

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final ProductRepository productRepository;


    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository) {

        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }


    // ==========================================
    // 1. GET MY CART
    // ==========================================

    @Transactional
    public CartResponse getMyCart(
            User user) {

        Cart cart =
                getOrCreateCart(user);

        return toResponse(cart);
    }


    // ==========================================
    // 2. ADD PRODUCT TO CART
    // ==========================================

    @Transactional
    public CartResponse addToCart(
            User user,
            AddToCartRequest request) {

        Cart cart =
                getOrCreateCart(user);


        Product product =
                productRepository
                        .findById(
                                request.getProductId())
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Product not found"));


        validateProductAvailable(
                product);


        int requestedQuantity =
                request.getQuantity();


        CartItem existingItem =
                cartItemRepository
                        .findByCartAndProduct(
                                cart,
                                product)
                        .orElse(null);


        if (existingItem != null) {

            int newQuantity =
                    existingItem.getQuantity()
                    + requestedQuantity;


            validateStock(
                    product,
                    newQuantity);


            existingItem.setQuantity(
                    newQuantity);

            cartItemRepository.save(
                    existingItem);

        } else {

            validateStock(
                    product,
                    requestedQuantity);


            CartItem newItem =
                    new CartItem();

            newItem.setCart(cart);

            newItem.setProduct(product);

            newItem.setQuantity(
                    requestedQuantity);


            cartItemRepository.save(
                    newItem);
        }


        return toResponse(cart);
    }


    // ==========================================
    // 3. UPDATE CART ITEM QUANTITY
    // ==========================================

    @Transactional
    public CartResponse updateQuantity(
            Long cartItemId,
            User user,
            UpdateCartItemRequest request) {

        Cart cart =
                getOrCreateCart(user);


        CartItem item =
                cartItemRepository
                        .findByIdAndCart(
                                cartItemId,
                                cart)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Cart item not found"));


        Product product =
                item.getProduct();


        validateProductAvailable(
                product);


        validateStock(
                product,
                request.getQuantity());


        item.setQuantity(
                request.getQuantity());


        cartItemRepository.save(
                item);


        return toResponse(cart);
    }


    // ==========================================
    // 4. REMOVE ONE ITEM
    // ==========================================

    @Transactional
    public CartResponse removeItem(
            Long cartItemId,
            User user) {

        Cart cart =
                getOrCreateCart(user);


        CartItem item =
                cartItemRepository
                        .findByIdAndCart(
                                cartItemId,
                                cart)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Cart item not found"));


        cart.getItems()
                .remove(item);


        cartItemRepository.delete(
                item);


        return toResponse(cart);
    }


    // ==========================================
    // 5. CLEAR ENTIRE CART
    // ==========================================

    @Transactional
    public CartResponse clearCart(
            User user) {

        Cart cart =
                getOrCreateCart(user);


        cartItemRepository.deleteByCart(
                cart);


        cart.getItems().clear();


        return toResponse(cart);
    }


    // ==========================================
    // GET OR CREATE USER CART
    // ==========================================

    private Cart getOrCreateCart(
            User user) {

        return cartRepository
                .findByUser(user)
                .orElseGet(
                        () -> {

                            Cart cart =
                                    new Cart();

                            cart.setUser(user);

                            return cartRepository.save(
                                    cart);
                        });
    }


    // ==========================================
    // VALIDATE PRODUCT
    // ==========================================

    private void validateProductAvailable(
            Product product) {

        if (!Boolean.TRUE.equals(
                product.getActive())) {

            throw new BadRequestException(
                    "Product is not available: "
                    + product.getTitle());
        }


        if (product.getSellingPrice()
                == null) {

            throw new BadRequestException(
                    "Selling price is not available for: "
                    + product.getTitle());
        }


        if (product.getStockQuantity()
                == null
                || product.getStockQuantity() <= 0) {

            throw new BadRequestException(
                    "Product is out of stock: "
                    + product.getTitle());
        }
    }


    // ==========================================
    // VALIDATE STOCK
    // ==========================================

    private void validateStock(
            Product product,
            int quantity) {

        if (quantity
                > product.getStockQuantity()) {

            throw new BadRequestException(
                    "Only "
                    + product.getStockQuantity()
                    + " item(s) available for "
                    + product.getTitle());
        }
    }


    // ==========================================
    // CART → RESPONSE DTO
    // ==========================================

    private CartResponse toResponse(
            Cart cart) {

        CartResponse response =
                new CartResponse();


        response.setCartId(
                cart.getId());


        List<CartItemResponse> itemResponses =
                new ArrayList<>();


        BigDecimal totalAmount =
                BigDecimal.ZERO;

        int totalItems = 0;


        for (CartItem item
                : cart.getItems()) {

            Product product =
                    item.getProduct();


            BigDecimal unitPrice =
                    product.getSellingPrice();


            BigDecimal subtotal =
                    unitPrice.multiply(
                            BigDecimal.valueOf(
                                    item.getQuantity()));


            CartItemResponse itemResponse =
                    new CartItemResponse();


            itemResponse.setId(
                    item.getId());

            itemResponse.setProductId(
                    product.getId());

            itemResponse.setTitle(
                    product.getTitle());

            itemResponse.setImageUrl(
                    product.getImageUrl());

            itemResponse.setColor(
                    product.getColor());

            itemResponse.setConditionType(
                    product.getConditionType());

            itemResponse.setUnitPrice(
                    unitPrice);

            itemResponse.setQuantity(
                    item.getQuantity());

            itemResponse.setSubtotal(
                    subtotal);

            itemResponse.setAvailableStock(
                    product.getStockQuantity());


            itemResponses.add(
                    itemResponse);


            totalItems +=
                    item.getQuantity();


            totalAmount =
                    totalAmount.add(
                            subtotal);
        }


        response.setItems(
                itemResponses);

        response.setTotalItems(
                totalItems);

        response.setTotalAmount(
                totalAmount);


        return response;
    }
}