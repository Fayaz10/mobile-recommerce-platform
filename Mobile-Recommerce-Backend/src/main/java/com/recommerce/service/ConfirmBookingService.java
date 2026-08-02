package com.recommerce.service;

import java.util.List;

import com.recommerce.model.ConfirmBooking;

public interface ConfirmBookingService {

    List<ConfirmBooking> getAllConfirmBookings();

    ConfirmBooking updateBookingStatus(
            Long id,
            String bookingStatus
    );

}