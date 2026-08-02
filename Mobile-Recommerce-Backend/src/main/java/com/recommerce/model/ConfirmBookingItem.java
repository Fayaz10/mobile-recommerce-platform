package com.recommerce.model;

import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "repair_booking_items")
public class ConfirmBookingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "repair_booking_id")
    private ConfirmBooking confirmBooking;

    // Selected Repair Problem
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id", nullable = false)
    private RepairProblem repairProblem;

    // Store price at booking time
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    public ConfirmBookingItem() {
    }

    public Long getId() {
        return id;
    }

    public ConfirmBooking getConfirmBooking() {
        return confirmBooking;
    }

    public void setConfirmBooking(ConfirmBooking ConfirmBooking) {
        this.confirmBooking = ConfirmBooking;
    }

    public RepairProblem getRepairProblem() {
        return repairProblem;
    }

    public void setRepairProblem(RepairProblem repairProblem) {
        this.repairProblem = repairProblem;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setId(Long id) {
        this.id = id;
    }
}