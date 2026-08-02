package com.recommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.Product;
import com.recommerce.model.User;
import com.recommerce.model.Wishlist;

public interface WishlistRepository
        extends JpaRepository<Wishlist, Long> {

    // Get all wishlist items for logged-in customer
    List<Wishlist> findByUserOrderByCreatedAtDesc(
            User user);


    // Check whether product already exists
    // in customer's wishlist
    boolean existsByUserAndProduct(
            User user,
            Product product);


    // Find a specific wishlist item
    // belonging to customer and product
    Optional<Wishlist> findByUserAndProduct(
            User user,
            Product product);


    // Remove product from customer's wishlist
    void deleteByUserAndProduct(
            User user,
            Product product);
}