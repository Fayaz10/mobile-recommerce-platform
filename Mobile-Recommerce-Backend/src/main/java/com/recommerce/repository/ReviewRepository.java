package com.recommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.Product;
import com.recommerce.model.Review;
import com.recommerce.model.User;

public interface ReviewRepository
        extends JpaRepository<Review, Long> {

    // Get all reviews for a product
    // Newest reviews first
    List<Review> findByProductOrderByCreatedAtDesc(
            Product product);


    // Check if customer already reviewed product
    boolean existsByUserAndProduct(
            User user,
            Product product);


    // Find customer's review for a product
    Optional<Review> findByUserAndProduct(
            User user,
            Product product);


    // Find a review only if it belongs
    // to the logged-in customer
    Optional<Review> findByIdAndUser(
            Long id,
            User user);


    // Count product reviews
    long countByProduct(
            Product product);
}