package com.recommerce.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recommerce.dto.SalesReportResponse;
import com.recommerce.repository.OrderRepository;

import java.util.List;

import com.recommerce.dto.TopSellingProductResponse;
import com.recommerce.repository.OrderItemRepository;

@Service
public class SalesReportService {

    private final OrderRepository orderRepository;

    private final OrderItemRepository orderItemRepository;


    public SalesReportService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository) {

        this.orderRepository =
                orderRepository;

        this.orderItemRepository =
                orderItemRepository;
    }


    // ==========================================
    // DAILY SALES REPORT
    // ==========================================

    @Transactional(readOnly = true)
    public SalesReportResponse getDailyReport() {

        LocalDate today =
                LocalDate.now();

        return generateReport(
                today,
                today);
    }


    // ==========================================
    // MONTHLY SALES REPORT
    // ==========================================

    @Transactional(readOnly = true)
    public SalesReportResponse getMonthlyReport() {

        LocalDate today =
                LocalDate.now();

        LocalDate firstDay =
                today.withDayOfMonth(1);

        LocalDate lastDay =
                today.withDayOfMonth(
                        today.lengthOfMonth());


        return generateReport(
                firstDay,
                lastDay);
    }


    // ==========================================
    // CUSTOM DATE-RANGE REPORT
    // ==========================================

    @Transactional(readOnly = true)
    public SalesReportResponse getDateRangeReport(
            LocalDate startDate,
            LocalDate endDate) {

        if (startDate == null ||
                endDate == null) {

            throw new IllegalArgumentException(
                    "Start date and end date are required");
        }


        if (startDate.isAfter(endDate)) {

            throw new IllegalArgumentException(
                    "Start date cannot be after end date");
        }


        return generateReport(
                startDate,
                endDate);
    }


    // ==========================================
    // GENERATE REPORT
    // ==========================================

    private SalesReportResponse generateReport(
            LocalDate startDate,
            LocalDate endDate) {

        // Start of requested first day

        LocalDateTime startDateTime =
                startDate.atStartOfDay();


        // Start of day AFTER requested end date.
        // This makes the entire end date included.

        LocalDateTime endDateTime =
                endDate
                        .plusDays(1)
                        .atStartOfDay();


        // --------------------------------------
        // TOTAL ORDERS
        // --------------------------------------

        long totalOrders =
                orderRepository
                        .countByCreatedAtBetween(
                                startDateTime,
                                endDateTime);


        // --------------------------------------
        // DELIVERED ORDERS
        // --------------------------------------

        long deliveredOrders =
                orderRepository
                        .countByStatusAndCreatedAtBetween(
                                "DELIVERED",
                                startDateTime,
                                endDateTime);


        // --------------------------------------
        // CANCELLED ORDERS
        // --------------------------------------

        long cancelledOrders =
                orderRepository
                        .countByStatusAndCreatedAtBetween(
                                "CANCELLED",
                                startDateTime,
                                endDateTime);


        // --------------------------------------
        // DELIVERED REVENUE
        // --------------------------------------

        BigDecimal totalRevenue =
                orderRepository
                        .calculateRevenueByDateRange(
                                startDateTime,
                                endDateTime);


        if (totalRevenue == null) {

            totalRevenue =
                    BigDecimal.ZERO;
        }


        // --------------------------------------
        // BUILD RESPONSE
        // --------------------------------------

        SalesReportResponse response =
                new SalesReportResponse();

        response.setStartDate(
                startDate);

        response.setEndDate(
                endDate);

        response.setTotalOrders(
                totalOrders);

        response.setDeliveredOrders(
                deliveredOrders);

        response.setCancelledOrders(
                cancelledOrders);

        response.setTotalRevenue(
                totalRevenue);

        response.setGeneratedAt(
                LocalDateTime.now());


        return response;
    }
    
 // ==========================================
 // TOP SELLING PRODUCTS
 // ==========================================

 @Transactional(readOnly = true)
 public List<TopSellingProductResponse>
         getTopSellingProducts() {

     return orderItemRepository
             .findTopSellingProducts();
 }
}