package com.recommerce.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.Cart;
import com.recommerce.model.CartItem;
import com.recommerce.model.Product;

public interface CartItemRepository
        extends JpaRepository<CartItem, Long> {

    // Check if a product already exists in the cart
    Optional<CartItem> findByCartAndProduct(
            Cart cart,
            Product product);


    // Find one cart item only inside this user's cart
    Optional<CartItem> findByIdAndCart(
            Long id,
            Cart cart);
    
    List<CartItem> findByCart(Cart cart);


    // Delete all items from a cart
    void deleteByCart(
            Cart cart);
}