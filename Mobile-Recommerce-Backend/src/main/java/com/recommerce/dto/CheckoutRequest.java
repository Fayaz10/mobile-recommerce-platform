package com.recommerce.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.NotBlank;


public class CheckoutRequest {

    @NotNull(
        message = "Delivery address is required"
    )
    private Long addressId;


    @NotBlank(
        message = "Payment method is required"
    )
    @Pattern(
        regexp = "COD|ONLINE",
        flags = Pattern.Flag.CASE_INSENSITIVE,
        message = "Payment method must be COD or ONLINE"
    )
    private String paymentMethod;


    @NotEmpty(
        message = "Order must contain at least one item"
    )
    @Valid
    private List<CheckoutItemRequest> items;


    public CheckoutRequest() {
    }


    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(
            Long addressId) {
        this.addressId = addressId;
    }


    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(
            String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }


    public List<CheckoutItemRequest> getItems() {
        return items;
    }

    public void setItems(
            List<CheckoutItemRequest> items) {
        this.items = items;
    }
}