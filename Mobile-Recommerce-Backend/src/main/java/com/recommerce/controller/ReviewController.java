package com.recommerce.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
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

import com.recommerce.dto.ReviewRequest;
import com.recommerce.dto.ReviewResponse;
import com.recommerce.model.User;
import com.recommerce.service.ReviewService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;


    public ReviewController(
            ReviewService reviewService) {

        this.reviewService =
                reviewService;
    }


    // ==========================================
    // CUSTOMER - ADD REVIEW
    // ==========================================

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<ReviewResponse>
            addReview(

            @AuthenticationPrincipal
            User user,

            @PathVariable
            Long productId,

            @Valid
            @RequestBody
            ReviewRequest request) {

        ReviewResponse response =
                reviewService.addReview(
                        user,
                        productId,
                        request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // ==========================================
    // PUBLIC - VIEW PRODUCT REVIEWS
    // ==========================================

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<List<ReviewResponse>>
            getProductReviews(

            @PathVariable
            Long productId) {

        return ResponseEntity.ok(
                reviewService
                        .getProductReviews(
                                productId));
    }


    // ==========================================
    // CUSTOMER - UPDATE OWN REVIEW
    // ==========================================

    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<ReviewResponse>
            updateReview(

            @AuthenticationPrincipal
            User user,

            @PathVariable
            Long reviewId,

            @Valid
            @RequestBody
            ReviewRequest request) {

        return ResponseEntity.ok(
                reviewService.updateReview(
                        user,
                        reviewId,
                        request));
    }


    // ==========================================
    // CUSTOMER - DELETE OWN REVIEW
    // ==========================================

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void>
            deleteReview(

            @AuthenticationPrincipal
            User user,

            @PathVariable
            Long reviewId) {

        reviewService.deleteReview(
                user,
                reviewId);

        return ResponseEntity
                .noContent()
                .build();
    }


    // ==========================================
    // PUBLIC - PRODUCT RATING SUMMARY
    // ==========================================

    @GetMapping(
            "/products/{productId}/rating")
    public ResponseEntity<Map<String, Object>>
            getProductRating(

            @PathVariable
            Long productId) {

        double averageRating =
                reviewService
                        .getAverageRating(
                                productId);

        long reviewCount =
                reviewService
                        .getReviewCount(
                                productId);

        return ResponseEntity.ok(
                Map.of(
                    "productId", productId,
                    "averageRating", averageRating,
                    "reviewCount", reviewCount
                ));
    }
}