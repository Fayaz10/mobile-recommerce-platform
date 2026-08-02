 package com.recommerce.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // Customer who owns this address

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false)
    private User user;


    // HOME / WORK / OTHER

    @Column(
            name = "address_type",
            nullable = false,
            length = 20)
    private String addressType;


    // Receiver's full name

    @Column(
            name = "full_name",
            nullable = false,
            length = 100)
    private String fullName;


    // Receiver's phone number

    @Column(
            nullable = false,
            length = 15)
    private String phone;


    // House / Flat / Building

    @Column(
            name = "address_line1",
            nullable = false,
            length = 255)
    private String addressLine1;


    // Area / Landmark - optional

    @Column(
            name = "address_line2",
            length = 255)
    private String addressLine2;


    @Column(
            nullable = false,
            length = 100)
    private String city;


    @Column(
            nullable = false,
            length = 100)
    private String state;


    @Column(
            name = "postal_code",
            nullable = false,
            length = 10)
    private String postalCode;


    @Column(
            nullable = false,
            length = 100)
    private String country = "India";


    @Column(
            name = "is_default",
            nullable = false)
    private boolean defaultAddress = false;


    @CreationTimestamp
    @Column(
            name = "created_at",
            updatable = false)
    private LocalDateTime createdAt;


    @UpdateTimestamp
    @Column(
            name = "updated_at")
    private LocalDateTime updatedAt;



    // =========================
    // CONSTRUCTORS
    // =========================

    public Address() {

    }



    // =========================
    // GETTERS AND SETTERS
    // =========================

    public Long getId() {

        return id;
    }


    public void setId(Long id) {

        this.id = id;
    }


    public User getUser() {

        return user;
    }


    public void setUser(User user) {

        this.user = user;
    }


    public String getAddressType() {

        return addressType;
    }


    public void setAddressType(
            String addressType) {

        this.addressType = addressType;
    }


    public String getFullName() {

        return fullName;
    }


    public void setFullName(
            String fullName) {

        this.fullName = fullName;
    }


    public String getPhone() {

        return phone;
    }


    public void setPhone(
            String phone) {

        this.phone = phone;
    }


    public String getAddressLine1() {

        return addressLine1;
    }


    public void setAddressLine1(
            String addressLine1) {

        this.addressLine1 =
                addressLine1;
    }


    public String getAddressLine2() {

        return addressLine2;
    }


    public void setAddressLine2(
            String addressLine2) {

        this.addressLine2 =
                addressLine2;
    }


    public String getCity() {

        return city;
    }


    public void setCity(
            String city) {

        this.city = city;
    }


    public String getState() {

        return state;
    }


    public void setState(
            String state) {

        this.state = state;
    }


    public String getPostalCode() {

        return postalCode;
    }


    public void setPostalCode(
            String postalCode) {

        this.postalCode =
                postalCode;
    }


    public String getCountry() {

        return country;
    }


    public void setCountry(
            String country) {

        this.country = country;
    }


    public boolean isDefaultAddress() {

        return defaultAddress;
    }


    public void setDefaultAddress(
            boolean defaultAddress) {

        this.defaultAddress =
                defaultAddress;
    }


    public LocalDateTime getCreatedAt() {

        return createdAt;
    }


    public void setCreatedAt(
            LocalDateTime createdAt) {

        this.createdAt = createdAt;
    }


    public LocalDateTime getUpdatedAt() {

        return updatedAt;
    }


    public void setUpdatedAt(
            LocalDateTime updatedAt) {

        this.updatedAt = updatedAt;
    }
}