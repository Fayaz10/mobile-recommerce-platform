package com.recommerce.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.WishlistResponse;
import com.recommerce.model.User;
import com.recommerce.service.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;


    public WishlistController(
            WishlistService wishlistService) {

        this.wishlistService =
                wishlistService;
    }


    // ==========================================
    // ADD PRODUCT TO WISHLIST
    // ==========================================

    @PostMapping("/{productId}")
    public ResponseEntity<WishlistResponse>
            addToWishlist(

            @AuthenticationPrincipal
            User user,

            @PathVariable
            Long productId) {

        WishlistResponse response =
                wishlistService
                        .addToWishlist(
                                user,
                                productId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // ==========================================
    // VIEW LOGGED-IN CUSTOMER'S WISHLIST
    // ==========================================

    @GetMapping
    public ResponseEntity<List<WishlistResponse>>
            getWishlist(

            @AuthenticationPrincipal
            User user) {

        return ResponseEntity.ok(
                wishlistService
                        .getWishlist(user));
    }


    // ==========================================
    // REMOVE PRODUCT FROM WISHLIST
    // ==========================================

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void>
            removeFromWishlist(

            @AuthenticationPrincipal
            User user,

            @PathVariable
            Long productId) {

        wishlistService
                .removeFromWishlist(
                        user,
                        productId);

        return ResponseEntity
                .noContent()
                .build();
    }
}