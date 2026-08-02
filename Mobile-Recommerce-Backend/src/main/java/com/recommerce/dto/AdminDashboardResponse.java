package com.recommerce.dto;

import java.math.BigDecimal;

public class AdminDashboardResponse {

    private long totalCustomers;
    private long totalProducts;
    private long totalOrders;

    private BigDecimal totalRevenue;

    private long placedOrders;
    private long shippedOrders;
    private long deliveredOrders;
    private long cancelledOrders;

    private long lowStockProducts;
    private long totalRepairBookings;

    private long totalReviews;


    public AdminDashboardResponse() {
    }


    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(
            long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }


    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(
            long totalProducts) {
        this.totalProducts = totalProducts;
    }


    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(
            long totalOrders) {
        this.totalOrders = totalOrders;
    }


    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(
            BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }


    public long getPlacedOrders() {
        return placedOrders;
    }

    public void setPlacedOrders(
            long placedOrders) {
        this.placedOrders = placedOrders;
    }


    public long getShippedOrders() {
        return shippedOrders;
    }

    public void setShippedOrders(
            long shippedOrders) {
        this.shippedOrders = shippedOrders;
    }


    public long getDeliveredOrders() {
        return deliveredOrders;
    }

    public void setDeliveredOrders(
            long deliveredOrders) {
        this.deliveredOrders = deliveredOrders;
    }


    public long getCancelledOrders() {
        return cancelledOrders;
    }

    public void setCancelledOrders(
            long cancelledOrders) {
        this.cancelledOrders = cancelledOrders;
    }


    public long getLowStockProducts() {
        return lowStockProducts;
    }

    public void setLowStockProducts(
            long lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }
    
    public long getTotalRepairBookings() {
        return totalRepairBookings;
    }

    public void setTotalRepairBookings(long totalRepairBookings) {
        this.totalRepairBookings = totalRepairBookings;
    }

    public long getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(long totalReviews) {
        this.totalReviews = totalReviews;
    }
}