package com.recommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recommerce.model.ConfirmBooking;
import com.recommerce.repository.ConfirmBookingRepository;

@Service
public class ConfirmBookingServiceImpl implements ConfirmBookingService {

    @Autowired
    private ConfirmBookingRepository ConfirmBookingRepository;

    @Override
    public List<ConfirmBooking> getAllConfirmBookings() {
        return ConfirmBookingRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    public ConfirmBooking updateBookingStatus(
            Long id,
            String bookingStatus
    ) {

        ConfirmBooking booking =
                ConfirmBookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        booking.setBookingStatus(bookingStatus);

        return ConfirmBookingRepository.save(booking);
    }

}