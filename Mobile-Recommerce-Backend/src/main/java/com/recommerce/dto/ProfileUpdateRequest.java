package com.recommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProfileUpdateRequest {

    @NotBlank(
        message = "Name is required"
    )
    @Size(
        min = 2,
        max = 100,
        message = "Name must be between 2 and 100 characters"
    )
    private String name;


    @NotBlank(
        message = "Phone number is required"
    )
    @Size(
        min = 10,
        max = 15,
        message = "Phone number must be between 10 and 15 characters"
    )
    private String phone;


    public ProfileUpdateRequest() {
    }


    public String getName() {
        return name;
    }

    public void setName(
            String name) {
        this.name = name;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(
            String phone) {
        this.phone = phone;
    }
}