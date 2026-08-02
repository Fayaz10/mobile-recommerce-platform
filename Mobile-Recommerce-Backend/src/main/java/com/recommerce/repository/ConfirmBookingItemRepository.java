package com.recommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.ConfirmBooking;
import com.recommerce.model.ConfirmBookingItem;

public interface ConfirmBookingItemRepository
        extends JpaRepository<ConfirmBookingItem, Long> {

    List<ConfirmBookingItem> findByConfirmBooking(ConfirmBooking ConfirmBooking);

}