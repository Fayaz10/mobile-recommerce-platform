package com.recommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class CartCheckoutRequest {

    @NotNull(message = "Delivery address is required")
    private Long addressId;

    @NotBlank(message = "Payment method is required")
    @Pattern(
        regexp = "COD|ONLINE",
        flags = Pattern.Flag.CASE_INSENSITIVE,
        message = "Payment method must be COD or ONLINE"
    )
    private String paymentMethod;


    public CartCheckoutRequest() {
    }


    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }


    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(
            String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}