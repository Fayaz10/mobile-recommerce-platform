package com.recommerce.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class WishlistResponse {

    private Long wishlistId;

    private Long productId;

    private String title;

    private String color;

    private String conditionType;

    private BigDecimal originalPrice;

    private BigDecimal sellingPrice;

    private Integer stockQuantity;

    private String warranty;

    private String imageUrl;

    private LocalDateTime addedAt;


    public WishlistResponse() {
    }


    public Long getWishlistId() {
        return wishlistId;
    }

    public void setWishlistId(Long wishlistId) {
        this.wishlistId = wishlistId;
    }


    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }


    public String getConditionType() {
        return conditionType;
    }

    public void setConditionType(
            String conditionType) {
        this.conditionType = conditionType;
    }


    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(
            BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }


    public BigDecimal getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(
            BigDecimal sellingPrice) {
        this.sellingPrice = sellingPrice;
    }


    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(
            Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }


    public String getWarranty() {
        return warranty;
    }

    public void setWarranty(String warranty) {
        this.warranty = warranty;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(
            LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }
}