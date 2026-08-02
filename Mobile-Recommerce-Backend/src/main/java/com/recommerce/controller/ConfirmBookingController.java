package com.recommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.model.ConfirmBooking;
import com.recommerce.service.ConfirmBookingService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.recommerce.dto.ConfirmBookingStatusRequest;

@RestController
@RequestMapping("/api/admin/repair-bookings")
public class ConfirmBookingController {

    @Autowired
    private ConfirmBookingService ConfirmBookingService;

    @GetMapping
    public List<ConfirmBooking> getAllConfirmBookings() {
        return ConfirmBookingService.getAllConfirmBookings();
    }
    
    @PutMapping("/{id}/status")
    public ConfirmBooking updateBookingStatus(

            @PathVariable Long id,

            @RequestBody ConfirmBookingStatusRequest request

    ) {

        return ConfirmBookingService.updateBookingStatus(
                id,
                request.getBookingStatus()
        );

    }

}