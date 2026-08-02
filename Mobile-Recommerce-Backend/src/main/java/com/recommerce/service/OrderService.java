package com.recommerce.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recommerce.dto.OrderStatusUpdateRequest;
import com.recommerce.dto.AddressResponse;
import com.recommerce.dto.CheckoutItemRequest;
import com.recommerce.dto.CheckoutRequest;
import com.recommerce.dto.OrderItemResponse;
import com.recommerce.dto.OrderResponse;
import com.recommerce.model.Address;
import com.recommerce.model.Order;
import com.recommerce.model.OrderItem;
import com.recommerce.model.Product;
import com.recommerce.model.User;
import com.recommerce.repository.AddressRepository;
import com.recommerce.repository.OrderRepository;
import com.recommerce.repository.ProductRepository;

import com.recommerce.dto.CartCheckoutRequest;
import com.recommerce.model.Cart;
import com.recommerce.model.CartItem;
import com.recommerce.repository.CartItemRepository;
import com.recommerce.repository.CartRepository;

import com.recommerce.exception.BadRequestException;
import com.recommerce.exception.ResourceNotFoundException;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final AddressRepository addressRepository;
    
    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;


    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            AddressRepository addressRepository,
            CartRepository cartRepository,
            CartItemRepository cartItemRepository) {

        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.addressRepository = addressRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
    }


    @Transactional
    public OrderResponse checkoutFromCart(
            User user,
            CartCheckoutRequest request) {

        // 1. Verify delivery address belongs to user

        Address address =
                addressRepository
                        .findByIdAndUser(
                                request.getAddressId(),
                                user)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Delivery address not found"));


        // 2. Find user's cart

        Cart cart =
                cartRepository
                        .findByUser(user)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Cart not found"));


        List<CartItem> cartItems =
                cartItemRepository.findByCart(cart);


        if (cartItems.isEmpty()) {

            throw new BadRequestException(
                    "Cannot checkout an empty cart");
        }


        // 3. Create order

        Order order = new Order();

        order.setUser(user);
        order.setAddress(address);

        order.setOrderNumber(
                generateOrderNumber());

        order.setStatus("PLACED");

        order.setPaymentMethod(
                request.getPaymentMethod()
                        .trim()
                        .toUpperCase());

        order.setPaymentStatus("PENDING");


        BigDecimal totalAmount =
                BigDecimal.ZERO;


        // 4. Convert cart items into order items

        for (CartItem cartItem : cartItems) {

            Product product =
                    cartItem.getProduct();

            int quantity =
                    cartItem.getQuantity();


            if (!Boolean.TRUE.equals(
                    product.getActive())) {

                throw new BadRequestException(
                        "Product is not available: "
                        + product.getTitle());
            }


            if (product.getSellingPrice() == null) {

                throw new BadRequestException(
                        "Price not available for: "
                        + product.getTitle());
            }


            if (product.getStockQuantity() == null
                    || product.getStockQuantity()
                            < quantity) {

                throw new BadRequestException(
                        "Insufficient stock for: "
                        + product.getTitle());
            }


            // Always use current database price

            BigDecimal unitPrice =
                    product.getSellingPrice();

            BigDecimal subtotal =
                    unitPrice.multiply(
                            BigDecimal.valueOf(quantity));


            OrderItem orderItem =
                    new OrderItem();

            orderItem.setProduct(product);
            orderItem.setQuantity(quantity);
            orderItem.setUnitPrice(unitPrice);
            orderItem.setSubtotal(subtotal);

            order.addItem(orderItem);


            totalAmount =
                    totalAmount.add(subtotal);


            // Reduce stock

            product.setStockQuantity(
                    product.getStockQuantity()
                    - quantity);

            productRepository.save(product);
        }


        // 5. Save order

        order.setTotalAmount(totalAmount);

        Order savedOrder =
                orderRepository.save(order);


        // 6. Clear cart only after order creation

        cartItemRepository.deleteByCart(cart);

        cart.getItems().clear();


        return toResponse(savedOrder);
    }
    
    // ==========================================
    // 1. CHECKOUT / PLACE ORDER
    // ==========================================

    @Transactional
    public OrderResponse checkout(
            User user,
            CheckoutRequest request) {

        // Verify address belongs to logged-in user

        Address address =
                addressRepository
                        .findByIdAndUser(
                                request.getAddressId(),
                                user)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Delivery address not found"));


        Order order =
                new Order();

        order.setUser(user);

        order.setAddress(address);

        order.setOrderNumber(
                generateOrderNumber());

        order.setStatus(
                "PLACED");

        order.setPaymentMethod(
                request
                        .getPaymentMethod()
                        .trim()
                        .toUpperCase());


        if ("COD".equals(
                order.getPaymentMethod())) {

            order.setPaymentStatus(
                    "PENDING");

        } else {

            // Online payment gateway will be
            // integrated later.

            order.setPaymentStatus(
                    "PENDING");
        }


        BigDecimal totalAmount =
                BigDecimal.ZERO;


        // Process every cart item

        for (CheckoutItemRequest itemRequest
                : request.getItems()) {


            Product product =
                    productRepository
                            .findById(
                                    itemRequest
                                            .getProductId())
                            .orElseThrow(
                                    () ->
                                            new ResourceNotFoundException(
                                                    "Product not found: "
                                                    + itemRequest
                                                            .getProductId()));


            // Product must be active

            if (!Boolean.TRUE.equals(
                    product.getActive())) {

                throw new BadRequestException(
                        "Product is not available: "
                        + product.getTitle());
            }


            // Price must exist

            if (product.getSellingPrice()
                    == null) {

                throw new BadRequestException(
                        "Selling price is not available for: "
                        + product.getTitle());
            }


            // Stock must exist

            if (product.getStockQuantity()
                    == null) {

                throw new BadRequestException(
                        "Stock information is not available for: "
                        + product.getTitle());
            }


            int requestedQuantity =
                    itemRequest.getQuantity();
            
            if (requestedQuantity <= 0) {

                throw new BadRequestException(
                        "Quantity must be greater than 0");
            }


            // Check stock

            if (product.getStockQuantity()
                    < requestedQuantity) {

                throw new BadRequestException(
                        "Insufficient stock for: "
                        + product.getTitle());
            }


            BigDecimal unitPrice =
                    product.getSellingPrice();


            BigDecimal subtotal =
                    unitPrice.multiply(
                            BigDecimal.valueOf(
                                    requestedQuantity));


            OrderItem orderItem =
                    new OrderItem();

            orderItem.setProduct(
                    product);

            orderItem.setQuantity(
                    requestedQuantity);

            orderItem.setUnitPrice(
                    unitPrice);

            orderItem.setSubtotal(
                    subtotal);


            // addItem() also sets:
            // orderItem.setOrder(order)

            order.addItem(
                    orderItem);


            totalAmount =
                    totalAmount.add(
                            subtotal);


            // Reduce product stock

            product.setStockQuantity(

                    product.getStockQuantity()
                    - requestedQuantity
            );


            productRepository.save(
                    product);
        }


        order.setTotalAmount(
                totalAmount);


        // Cascade saves OrderItems too

        Order savedOrder =
                orderRepository.save(
                        order);


        return toResponse(
                savedOrder);
    }


    // ==========================================
    // 2. GET ALL MY ORDERS
    // ==========================================

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(
            User user) {

        return orderRepository
                .findByUserOrderByCreatedAtDesc(
                        user)
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // ==========================================
    // 3. GET ONE OF MY ORDERS
    // ==========================================

    @Transactional(readOnly = true)
    public OrderResponse getMyOrder(
            Long orderId,
            User user) {

        Order order =
                orderRepository
                        .findByIdAndUser(
                                orderId,
                                user)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Order not found"));

        return toResponse(
                order);
    }
    
    
 // ==========================================
 // 4. ADMIN - GET ALL ORDERS
 // ==========================================

 @Transactional(readOnly = true)
 public List<OrderResponse> getAllOrders() {

     return orderRepository
             .findAllByOrderByCreatedAtDesc()
             .stream()
             .map(this::toResponse)
             .toList();
 }
 
//==========================================
//5. ADMIN - GET ONE ORDER
//==========================================

@Transactional(readOnly = true)
public OrderResponse getOrderById(
      Long orderId) {

  Order order =
          orderRepository
                  .findById(orderId)
                  .orElseThrow(
                          () ->
                                  new ResourceNotFoundException(
                                          "Order not found"));

  return toResponse(order);
}

//==========================================
//6. ADMIN - UPDATE ORDER STATUS
//==========================================

@Transactional
public OrderResponse updateOrderStatus(
        Long orderId,
        OrderStatusUpdateRequest request) {

    Order order =
            orderRepository
                    .findById(orderId)
                    .orElseThrow(
                            () ->
                                    new ResourceNotFoundException(
                                            "Order not found"));


    if (request.getStatus() == null
            || request.getStatus().isBlank()) {

        throw new BadRequestException(
                "Order status is required");
    }


    String currentStatus =
            order.getStatus()
                    .trim()
                    .toUpperCase();

    String newStatus =
            request.getStatus()
                    .trim()
                    .toUpperCase();


    // Same status - no change needed

    if (currentStatus.equals(newStatus)) {

        return toResponse(order);
    }


    // Validate transition

    boolean validTransition =
            switch (currentStatus) {

                case "PLACED" ->
                        newStatus.equals("CONFIRMED")
                        || newStatus.equals("CANCELLED");

                case "CONFIRMED" ->
                        newStatus.equals("SHIPPED")
                        || newStatus.equals("CANCELLED");

                case "SHIPPED" ->
                        newStatus.equals("DELIVERED");

                case "DELIVERED", "CANCELLED" ->
                        false;

                default ->
                        false;
            };


    if (!validTransition) {

        throw new BadRequestException(
                "Cannot change order status from "
                + currentStatus
                + " to "
                + newStatus);
    }


    // If order is cancelled,
    // restore purchased stock

    if (newStatus.equals("CANCELLED")) {

        for (OrderItem item : order.getItems()) {

            Product product =
                    item.getProduct();

            int currentStock =
                    product.getStockQuantity() == null
                            ? 0
                            : product.getStockQuantity();

            product.setStockQuantity(
                    currentStock
                    + item.getQuantity());

            productRepository.save(product);
        }
    }


    order.setStatus(newStatus);

    Order savedOrder =
            orderRepository.save(order);

    return toResponse(savedOrder);
}

    // ==========================================
    // GENERATE ORDER NUMBER
    // ==========================================

    private String generateOrderNumber() {

        String randomPart =
                UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase();

        return "ORD-" + randomPart;
    }


    // ==========================================
    // ORDER ENTITY → RESPONSE
    // ==========================================

    private OrderResponse toResponse(
            Order order) {

        OrderResponse response =
                new OrderResponse();

        response.setId(
                order.getId());

        response.setOrderNumber(
                order.getOrderNumber());

        response.setTotalAmount(
                order.getTotalAmount());

        response.setStatus(
                order.getStatus());

        response.setPaymentMethod(
                order.getPaymentMethod());

        response.setPaymentStatus(
                order.getPaymentStatus());

        response.setCreatedAt(
                order.getCreatedAt());


        // Delivery address

        response.setDeliveryAddress(
                toAddressResponse(
                        order.getAddress()));


        // Order items

        List<OrderItemResponse> itemResponses =
                new ArrayList<>();


        for (OrderItem item
                : order.getItems()) {

            OrderItemResponse itemResponse =
                    new OrderItemResponse();

            itemResponse.setId(
                    item.getId());

            itemResponse.setProductId(
                    item.getProduct()
                            .getId());

            itemResponse.setProductName(
                    item.getProduct()
                            .getTitle());
            
            itemResponse.setImageUrl(
                    item.getProduct()
                            .getImageUrl());

            itemResponse.setColor(
                    item.getProduct()
                            .getColor());

            itemResponse.setConditionType(
                    item.getProduct()
                            .getConditionType());

            itemResponse.setQuantity(
                    item.getQuantity());

            itemResponse.setUnitPrice(
                    item.getUnitPrice());

            itemResponse.setSubtotal(
                    item.getSubtotal());


            itemResponses.add(
                    itemResponse);
        }


        response.setItems(
                itemResponses);


        return response;
    }


    // ==========================================
    // ADDRESS ENTITY → RESPONSE
    // ==========================================

    private AddressResponse toAddressResponse(
            Address address) {

        AddressResponse response =
                new AddressResponse();

        response.setId(
                address.getId());

        response.setAddressType(
                address.getAddressType());

        response.setFullName(
                address.getFullName());

        response.setPhone(
                address.getPhone());

        response.setAddressLine1(
                address.getAddressLine1());

        response.setAddressLine2(
                address.getAddressLine2());

        response.setCity(
                address.getCity());

        response.setState(
                address.getState());

        response.setPostalCode(
                address.getPostalCode());

        response.setCountry(
                address.getCountry());

        response.setDefaultAddress(
                address.isDefaultAddress());

        response.setCreatedAt(
                address.getCreatedAt());

        response.setUpdatedAt(
                address.getUpdatedAt());

        return response;
    }
}