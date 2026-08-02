package com.recommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recommerce.dto.ReviewRequest;
import com.recommerce.dto.ReviewResponse;
import com.recommerce.exception.ResourceNotFoundException;
import com.recommerce.model.Product;
import com.recommerce.model.Review;
import com.recommerce.model.User;
import com.recommerce.repository.ProductRepository;
import com.recommerce.repository.ReviewRepository;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;


    public ReviewService(
            ReviewRepository reviewRepository,
            ProductRepository productRepository) {

        this.reviewRepository =
                reviewRepository;

        this.productRepository =
                productRepository;
    }


    // ==========================================
    // ADD REVIEW
    // ==========================================

    public ReviewResponse addReview(
            User user,
            Long productId,
            ReviewRequest request) {

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


        if (reviewRepository
                .existsByUserAndProduct(
                        user,
                        product)) {

            throw new IllegalArgumentException(
                    "You have already reviewed this product");
        }


        Review review =
                new Review();

        review.setUser(user);

        review.setProduct(product);

        review.setRating(
                request.getRating());

        review.setComment(
                request.getComment());


        Review saved =
                reviewRepository.save(
                        review);


        return mapToResponse(saved);
    }


    // ==========================================
    // GET ALL REVIEWS FOR PRODUCT
    // ==========================================

    @Transactional(readOnly = true)
    public List<ReviewResponse> getProductReviews(
            Long productId) {

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                        + productId));


        return reviewRepository
                .findByProductOrderByCreatedAtDesc(
                        product)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }


    // ==========================================
    // UPDATE OWN REVIEW
    // ==========================================

    public ReviewResponse updateReview(
            User user,
            Long reviewId,
            ReviewRequest request) {

        Review review =
                reviewRepository
                        .findByIdAndUser(
                                reviewId,
                                user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Review not found or does not belong to you"));


        review.setRating(
                request.getRating());

        review.setComment(
                request.getComment());


        Review updated =
                reviewRepository.save(
                        review);


        return mapToResponse(updated);
    }


    // ==========================================
    // DELETE OWN REVIEW
    // ==========================================

    public void deleteReview(
            User user,
            Long reviewId) {

        Review review =
                reviewRepository
                        .findByIdAndUser(
                                reviewId,
                                user)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Review not found or does not belong to you"));


        reviewRepository.delete(
                review);
    }


    // ==========================================
    // AVERAGE RATING
    // ==========================================

    @Transactional(readOnly = true)
    public double getAverageRating(
            Long productId) {

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                        + productId));


        List<Review> reviews =
                reviewRepository
                        .findByProductOrderByCreatedAtDesc(
                                product);


        if (reviews.isEmpty()) {
            return 0.0;
        }


        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }


    // ==========================================
    // REVIEW COUNT
    // ==========================================

    @Transactional(readOnly = true)
    public long getReviewCount(
            Long productId) {

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                        + productId));


        return reviewRepository
                .countByProduct(product);
    }


    // ==========================================
    // ENTITY → RESPONSE DTO
    // ==========================================

    private ReviewResponse mapToResponse(
            Review review) {

        ReviewResponse response =
                new ReviewResponse();

        response.setReviewId(
                review.getId());

        response.setProductId(
                review.getProduct()
                        .getId());

        response.setUserId(
                review.getUser()
                        .getId());

        response.setCustomerName(
                review.getUser()
                        .getName());

        response.setRating(
                review.getRating());

        response.setComment(
                review.getComment());

        response.setCreatedAt(
                review.getCreatedAt());

        response.setUpdatedAt(
                review.getUpdatedAt());


        return response;
    }
}