package com.recommerce.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {

    private Long id;

    private String orderNumber;

    private BigDecimal totalAmount;

    private String status;

    private String paymentMethod;

    private String paymentStatus;

    private AddressResponse deliveryAddress;

    private List<OrderItemResponse> items;

    private LocalDateTime createdAt;


    public OrderResponse() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(
            String orderNumber) {
        this.orderNumber = orderNumber;
    }


    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(
            BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status) {
        this.status = status;
    }


    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(
            String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }


    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(
            String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }


    public AddressResponse getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(
            AddressResponse deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }


    public List<OrderItemResponse> getItems() {
        return items;
    }

    public void setItems(
            List<OrderItemResponse> items) {
        this.items = items;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}