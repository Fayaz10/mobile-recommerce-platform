package com.recommerce.dto;

import java.math.BigDecimal;

public class TopSellingProductResponse {

    private Long productId;

    private String productTitle;

    private Long totalQuantitySold;

    private BigDecimal totalSalesAmount;


    public TopSellingProductResponse() {
    }


    public TopSellingProductResponse(
            Long productId,
            String productTitle,
            Long totalQuantitySold,
            BigDecimal totalSalesAmount) {

        this.productId = productId;
        this.productTitle = productTitle;
        this.totalQuantitySold = totalQuantitySold;
        this.totalSalesAmount = totalSalesAmount;
    }


    public Long getProductId() {
        return productId;
    }

    public void setProductId(
            Long productId) {
        this.productId = productId;
    }


    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(
            String productTitle) {
        this.productTitle = productTitle;
    }


    public Long getTotalQuantitySold() {
        return totalQuantitySold;
    }

    public void setTotalQuantitySold(
            Long totalQuantitySold) {
        this.totalQuantitySold =
                totalQuantitySold;
    }


    public BigDecimal getTotalSalesAmount() {
        return totalSalesAmount;
    }

    public void setTotalSalesAmount(
            BigDecimal totalSalesAmount) {
        this.totalSalesAmount =
                totalSalesAmount;
    }
}