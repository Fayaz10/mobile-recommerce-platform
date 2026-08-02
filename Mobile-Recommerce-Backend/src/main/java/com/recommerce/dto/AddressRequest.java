package com.recommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AddressRequest {

    @NotBlank(message = "Address type is required")
    @Pattern(
        regexp = "HOME|WORK|OTHER",
        flags = Pattern.Flag.CASE_INSENSITIVE,
        message = "Address type must be HOME, WORK or OTHER"
    )
    private String addressType;


    @NotBlank(message = "Full name is required")
    @Size(
        max = 100,
        message = "Full name cannot exceed 100 characters"
    )
    private String fullName;


    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[6-9][0-9]{9}$",
        message = "Enter a valid 10-digit Indian mobile number"
    )
    private String phone;


    @NotBlank(message = "Address line 1 is required")
    @Size(
        max = 255,
        message = "Address line 1 cannot exceed 255 characters"
    )
    private String addressLine1;


    @Size(
        max = 255,
        message = "Address line 2 cannot exceed 255 characters"
    )
    private String addressLine2;


    @NotBlank(message = "City is required")
    @Size(
        max = 100,
        message = "City cannot exceed 100 characters"
    )
    private String city;


    @NotBlank(message = "State is required")
    @Size(
        max = 100,
        message = "State cannot exceed 100 characters"
    )
    private String state;


    @NotBlank(message = "Postal code is required")
    @Pattern(
        regexp = "^[1-9][0-9]{5}$",
        message = "Enter a valid 6-digit Indian PIN code"
    )
    private String postalCode;


    @NotBlank(message = "Country is required")
    @Size(
        max = 100,
        message = "Country cannot exceed 100 characters"
    )
    private String country = "India";


    private boolean defaultAddress;


    public AddressRequest() {
    }


    public String getAddressType() {
        return addressType;
    }

    public void setAddressType(String addressType) {
        this.addressType = addressType;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }


    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }


    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }


    public boolean isDefaultAddress() {
        return defaultAddress;
    }

    public void setDefaultAddress(boolean defaultAddress) {
        this.defaultAddress = defaultAddress;
    }
}