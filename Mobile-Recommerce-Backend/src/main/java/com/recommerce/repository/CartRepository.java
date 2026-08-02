package com.recommerce.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.Cart;
import com.recommerce.model.User;

public interface CartRepository
        extends JpaRepository<Cart, Long> {

    // Find the cart belonging to a user
    Optional<Cart> findByUser(User user);
}