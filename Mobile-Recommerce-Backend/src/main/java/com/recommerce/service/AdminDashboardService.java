package com.recommerce.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recommerce.dto.AdminDashboardResponse;
import com.recommerce.repository.OrderRepository;
import com.recommerce.repository.ProductRepository;
import com.recommerce.repository.UserRepository;
import com.recommerce.repository.ConfirmBookingRepository;
import com.recommerce.repository.ReviewRepository;

@Service
public class AdminDashboardService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;
    
    private final ConfirmBookingRepository confirmBookingRepository;

    private final ReviewRepository reviewRepository;


    public AdminDashboardService(
            UserRepository userRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository,
            ConfirmBookingRepository confirmBookingRepository,
            ReviewRepository reviewRepository){

        this.userRepository =
                userRepository;

        this.productRepository =
                productRepository;

        this.orderRepository =
                orderRepository;
        
        this.confirmBookingRepository = confirmBookingRepository;

        this.reviewRepository = reviewRepository;
    }


    // ==========================================
    // GET ADMIN DASHBOARD STATISTICS
    // ==========================================

    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard() {

        AdminDashboardResponse response =
                new AdminDashboardResponse();


        // ------------------------------------------
        // CUSTOMER STATISTICS
        // ------------------------------------------

        long totalCustomers =
                userRepository
                        .countByRole(
                                "CUSTOMER");


        // ------------------------------------------
        // PRODUCT STATISTICS
        // ------------------------------------------

        long totalProducts =
                productRepository
                        .countByActiveTrue();


        long lowStockProducts =
                productRepository
                        .countByActiveTrueAndStockQuantityLessThan(
                                5);
        
        long totalRepairBookings =
                confirmBookingRepository.count();

        long totalReviews =
                reviewRepository.count();


        // ------------------------------------------
        // ORDER STATISTICS
        // ------------------------------------------

        long totalOrders =
                orderRepository.count();


        long placedOrders =
                orderRepository
                        .countByStatus(
                                "PLACED");


        long shippedOrders =
                orderRepository
                        .countByStatus(
                                "SHIPPED");


        long deliveredOrders =
                orderRepository
                        .countByStatus(
                                "DELIVERED");


        long cancelledOrders =
                orderRepository
                        .countByStatus(
                                "CANCELLED");


        // ------------------------------------------
        // REVENUE
        // ------------------------------------------

        BigDecimal totalRevenue =
                orderRepository
                        .calculateTotalRevenue();


        if (totalRevenue == null) {

            totalRevenue =
                    BigDecimal.ZERO;
        }


        // ------------------------------------------
        // BUILD RESPONSE
        // ------------------------------------------

        response.setTotalCustomers(
                totalCustomers);

        response.setTotalProducts(
                totalProducts);

        response.setTotalOrders(
                totalOrders);

        response.setTotalRevenue(
                totalRevenue);

        response.setPlacedOrders(
                placedOrders);

        response.setShippedOrders(
                shippedOrders);

        response.setDeliveredOrders(
                deliveredOrders);

        response.setCancelledOrders(
                cancelledOrders);

        response.setLowStockProducts(
                lowStockProducts);
        
        response.setTotalRepairBookings(
                totalRepairBookings);

        response.setTotalReviews(
                totalReviews);


        return response;
    }
}