package com.recommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recommerce.dto.WishlistResponse;
import com.recommerce.exception.ResourceNotFoundException;
import com.recommerce.model.Product;
import com.recommerce.model.User;
import com.recommerce.model.Wishlist;
import com.recommerce.repository.ProductRepository;
import com.recommerce.repository.WishlistRepository;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;


    public WishlistService(
            WishlistRepository wishlistRepository,
            ProductRepository productRepository) {

        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
    }


    // ==========================================
    // ADD PRODUCT TO WISHLIST
    // ==========================================

    public WishlistResponse addToWishlist(
            User user,
            Long productId) {

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                        + productId));


        if (!Boolean.TRUE.equals(
                product.getActive())) {

            throw new IllegalArgumentException(
                    "Product is not available");
        }


        if (wishlistRepository
                .existsByUserAndProduct(
                        user,
                        product)) {

            throw new IllegalArgumentException(
                    "Product already exists in wishlist");
        }


        Wishlist wishlist =
                new Wishlist();

        wishlist.setUser(user);
        wishlist.setProduct(product);


        Wishlist saved =
                wishlistRepository.save(
                        wishlist);


        return mapToResponse(saved);
    }


    // ==========================================
    // VIEW CUSTOMER WISHLIST
    // ==========================================

    public List<WishlistResponse> getWishlist(
            User user) {

        return wishlistRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // ==========================================
    // REMOVE PRODUCT FROM WISHLIST
    // ==========================================

    @Transactional
    public void removeFromWishlist(
            User user,
            Long productId) {

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                        + productId));


        Wishlist wishlist =
                wishlistRepository
                        .findByUserAndProduct(
                                user,
                                product)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found in wishlist"));


        wishlistRepository.delete(
                wishlist);
    }


    // ==========================================
    // CONVERT ENTITY TO RESPONSE DTO
    // ==========================================

    private WishlistResponse mapToResponse(
            Wishlist wishlist) {

        Product product =
                wishlist.getProduct();

        WishlistResponse response =
                new WishlistResponse();

        response.setWishlistId(
                wishlist.getId());

        response.setProductId(
                product.getId());

        response.setTitle(
                product.getTitle());

        response.setColor(
                product.getColor());

        response.setConditionType(
                product.getConditionType());

        response.setOriginalPrice(
                product.getOriginalPrice());

        response.setSellingPrice(
                product.getSellingPrice());

        response.setStockQuantity(
                product.getStockQuantity());

        response.setWarranty(
                product.getWarranty());

        response.setImageUrl(
                product.getImageUrl());

        response.setAddedAt(
                wishlist.getCreatedAt());

        return response;
    }
}