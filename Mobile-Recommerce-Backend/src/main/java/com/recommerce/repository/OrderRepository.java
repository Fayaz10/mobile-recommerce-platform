package com.recommerce.repository;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.Order;
import com.recommerce.model.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    // Get all orders belonging to logged-in user
    // Newest orders first
    List<Order> findByUserOrderByCreatedAtDesc(
            User user);


    // Get one order only if it belongs to logged-in user
    Optional<Order> findByIdAndUser(
            Long id,
            User user);


    // Find order using public order number
    Optional<Order> findByOrderNumber(
            String orderNumber);
    
    
 // Admin: get all customer orders
 // Newest orders first
 List<Order> findAllByOrderByCreatedAtDesc();
 
 long countByStatus(
	        String status);


	@Query("""
	       SELECT COALESCE(SUM(o.totalAmount), 0)
	       FROM Order o
	       WHERE o.status = 'DELIVERED'
	       """)
	BigDecimal calculateTotalRevenue();
	
	// ==========================================
	// SALES REPORT - TOTAL ORDERS BY DATE RANGE
	// ==========================================

	long countByCreatedAtBetween(
	        LocalDateTime startDateTime,
	        LocalDateTime endDateTime);


	// ==========================================
	// SALES REPORT - STATUS COUNT BY DATE RANGE
	// ==========================================

	long countByStatusAndCreatedAtBetween(
	        String status,
	        LocalDateTime startDateTime,
	        LocalDateTime endDateTime);


	// ==========================================
	// SALES REPORT - DELIVERED REVENUE
	// BY DATE RANGE
	// ==========================================

	@Query("""
	       SELECT COALESCE(SUM(o.totalAmount), 0)
	       FROM Order o
	       WHERE o.status = 'DELIVERED'
	       AND o.createdAt >= :startDateTime
	       AND o.createdAt < :endDateTime
	       """)
	BigDecimal calculateRevenueByDateRange(
	        @Param("startDateTime")
	        LocalDateTime startDateTime,

	        @Param("endDateTime")
	        LocalDateTime endDateTime);
    
}