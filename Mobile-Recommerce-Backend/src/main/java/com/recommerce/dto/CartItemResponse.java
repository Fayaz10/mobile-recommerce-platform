package com.recommerce.dto;

import java.math.BigDecimal;

public class CartItemResponse {

    private Long id;

    private Long productId;

    private String title;

    private String imageUrl;

    private String color;

    private String conditionType;

    private BigDecimal unitPrice;

    private Integer quantity;

    private BigDecimal subtotal;

    private Integer availableStock;


    public CartItemResponse() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Long getProductId() {
        return productId;
    }

    public void setProductId(
            Long productId) {
        this.productId = productId;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(
            String title) {
        this.title = title;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(
            String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public String getColor() {
        return color;
    }

    public void setColor(
            String color) {
        this.color = color;
    }


    public String getConditionType() {
        return conditionType;
    }

    public void setConditionType(
            String conditionType) {
        this.conditionType =
                conditionType;
    }


    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(
            BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }


    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(
            Integer quantity) {
        this.quantity = quantity;
    }


    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(
            BigDecimal subtotal) {
        this.subtotal = subtotal;
    }


    public Integer getAvailableStock() {
        return availableStock;
    }

    public void setAvailableStock(
            Integer availableStock) {
        this.availableStock =
                availableStock;
    }
}