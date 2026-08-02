package com.recommerce.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class SalesReportResponse {

    private LocalDate startDate;

    private LocalDate endDate;

    private long totalOrders;

    private long deliveredOrders;

    private long cancelledOrders;

    private BigDecimal totalRevenue;

    private LocalDateTime generatedAt;


    public SalesReportResponse() {
    }


    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(
            LocalDate startDate) {
        this.startDate = startDate;
    }


    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(
            LocalDate endDate) {
        this.endDate = endDate;
    }


    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(
            long totalOrders) {
        this.totalOrders = totalOrders;
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


    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(
            BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }


    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(
            LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }
}