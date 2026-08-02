package com.recommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.ConfirmBooking;
import com.recommerce.model.User;
public interface ConfirmBookingRepository extends JpaRepository<ConfirmBooking, Long> {

    List<ConfirmBooking> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<ConfirmBooking> findByUserOrderByCreatedAtDesc(User user);
    
    List<ConfirmBooking> findAllByOrderByCreatedAtDesc();

}