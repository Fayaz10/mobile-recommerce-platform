package com.recommerce.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;

import com.recommerce.dto.TopSellingProductResponse;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.Order;
import com.recommerce.model.OrderItem;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {
	
	@Query("""
		       SELECT new com.recommerce.dto.TopSellingProductResponse(
		           oi.product.id,
		           oi.product.title,
		           SUM(CAST(oi.quantity AS long)),
		           SUM(oi.subtotal)
		       )
		       FROM OrderItem oi
		       WHERE oi.order.status = 'DELIVERED'
		       GROUP BY oi.product.id, oi.product.title
		       ORDER BY SUM(oi.quantity) DESC
		       """)
		List<TopSellingProductResponse>
		        findTopSellingProducts();

    List<OrderItem> findByOrder(
            Order order);
}