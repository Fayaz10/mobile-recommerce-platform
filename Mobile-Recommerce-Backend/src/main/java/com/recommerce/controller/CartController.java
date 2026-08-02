package com.recommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.AddToCartRequest;
import com.recommerce.dto.CartResponse;
import com.recommerce.dto.UpdateCartItemRequest;
import com.recommerce.model.User;
import com.recommerce.service.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;


    public CartController(
            CartService cartService) {

        this.cartService = cartService;
    }


    // GET MY CART

    @GetMapping
    public ResponseEntity<CartResponse>
            getMyCart(

                    @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                cartService.getMyCart(user));
    }


    // ADD PRODUCT TO CART

    @PostMapping("/items")
    public ResponseEntity<CartResponse>
            addToCart(

                    @AuthenticationPrincipal User user,

                    @Valid
                    @RequestBody AddToCartRequest request) {

        return ResponseEntity.ok(
                cartService.addToCart(
                        user,
                        request));
    }


    // UPDATE ITEM QUANTITY

    @PutMapping("/items/{id}")
    public ResponseEntity<CartResponse>
            updateQuantity(

                    @PathVariable Long id,

                    @AuthenticationPrincipal User user,

                    @Valid
                    @RequestBody
                    UpdateCartItemRequest request) {

        return ResponseEntity.ok(
                cartService.updateQuantity(
                        id,
                        user,
                        request));
    }


    // REMOVE ONE ITEM

    @DeleteMapping("/items/{id}")
    public ResponseEntity<CartResponse>
            removeItem(

                    @PathVariable Long id,

                    @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                cartService.removeItem(
                        id,
                        user));
    }


    // CLEAR ENTIRE CART

    @DeleteMapping
    public ResponseEntity<CartResponse>
            clearCart(

                    @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                cartService.clearCart(user));
    }
}