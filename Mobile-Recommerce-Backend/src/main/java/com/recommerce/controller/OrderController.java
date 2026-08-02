package com.recommerce.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.CartCheckoutRequest;
import com.recommerce.dto.CheckoutRequest;
import com.recommerce.dto.OrderResponse;
import com.recommerce.model.User;
import com.recommerce.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;


    public OrderController(
            OrderService orderService) {

        this.orderService = orderService;
    }


    // ==========================================
    // PLACE ORDER / CHECKOUT
    // ==========================================

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(

            @AuthenticationPrincipal User user,

            @Valid
            @RequestBody CheckoutRequest request) {

        OrderResponse response =
                orderService.checkout(
                        user,
                        request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // ==========================================
    // GET MY ORDERS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<OrderResponse>>
            getMyOrders(

                    @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                orderService
                        .getMyOrders(user));
    }


    // ==========================================
    // GET ONE OF MY ORDERS
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse>
            getMyOrder(

                    @PathVariable Long id,

                    @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                orderService
                        .getMyOrder(
                                id,
                                user));
    }
    
    @PostMapping("/checkout/cart")
    public ResponseEntity<OrderResponse>
            checkoutFromCart(

                    @AuthenticationPrincipal User user,

                    @Valid
                    @RequestBody
                    CartCheckoutRequest request) {

        OrderResponse response =
                orderService.checkoutFromCart(
                        user,
                        request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}