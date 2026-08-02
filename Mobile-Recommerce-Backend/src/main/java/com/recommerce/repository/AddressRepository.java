package com.recommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.Address;
import com.recommerce.model.User;

public interface AddressRepository
        extends JpaRepository<Address, Long> {

    // Get all addresses belonging to one user
    List<Address> findByUserOrderByDefaultAddressDescIdDesc(
            User user);


    // Find one specific address,
    // but only if it belongs to this user
    Optional<Address> findByIdAndUser(
            Long id,
            User user);


    // Find the user's current default address
    Optional<Address> findByUserAndDefaultAddressTrue(
            User user);
}