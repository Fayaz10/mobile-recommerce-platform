package com.recommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recommerce.dto.AddressRequest;
import com.recommerce.dto.AddressResponse;
import com.recommerce.model.Address;
import com.recommerce.model.User;
import com.recommerce.repository.AddressRepository;

import com.recommerce.exception.ResourceNotFoundException;

@Service
public class AddressService {

    private final AddressRepository addressRepository;


    public AddressService(
            AddressRepository addressRepository) {

        this.addressRepository =
                addressRepository;
    }


    // ==========================================
    // 1. CREATE ADDRESS
    // ==========================================

    @Transactional
    public AddressResponse createAddress(
            User user,
            AddressRequest request) {

        // If this is the first address,
        // automatically make it default.

        List<Address> existingAddresses =
                addressRepository
                        .findByUserOrderByDefaultAddressDescIdDesc(
                                user);

        boolean shouldBeDefault =
                existingAddresses.isEmpty()
                || request.isDefaultAddress();


        // If new address should be default,
        // remove old default first.

        if (shouldBeDefault) {

            clearExistingDefault(user);
        }


        Address address =
                new Address();

        address.setUser(user);

        copyRequestToAddress(
                request,
                address);

        address.setDefaultAddress(
                shouldBeDefault);


        Address savedAddress =
                addressRepository.save(
                        address);


        return toResponse(
                savedAddress);
    }


    // ==========================================
    // 2. GET ALL ADDRESSES OF LOGGED-IN USER
    // ==========================================

    @Transactional(readOnly = true)
    public List<AddressResponse> getMyAddresses(
            User user) {

        return addressRepository
                .findByUserOrderByDefaultAddressDescIdDesc(
                        user)
                .stream()
                .map(this::toResponse)
                .toList();
    }


    // ==========================================
    // 3. GET ONE ADDRESS
    // ==========================================

    @Transactional(readOnly = true)
    public AddressResponse getAddress(
            Long addressId,
            User user) {

        Address address =
                findOwnedAddress(
                        addressId,
                        user);

        return toResponse(
                address);
    }


    // ==========================================
    // 4. UPDATE ADDRESS
    // ==========================================

    @Transactional
    public AddressResponse updateAddress(
            Long addressId,
            User user,
            AddressRequest request) {

        Address address =
                findOwnedAddress(
                        addressId,
                        user);


        boolean wasDefault =
                address.isDefaultAddress();

        boolean shouldBeDefault =
                wasDefault
                || request.isDefaultAddress();


        // If customer is making this address
        // the default, clear the old default.

        if (request.isDefaultAddress()) {

            clearExistingDefault(user);
        }


        copyRequestToAddress(
                request,
                address);


        address.setDefaultAddress(
                shouldBeDefault);


        Address updatedAddress =
                addressRepository.save(
                        address);


        return toResponse(
                updatedAddress);
    }


    // ==========================================
    // 5. DELETE ADDRESS
    // ==========================================

    @Transactional
    public void deleteAddress(
            Long addressId,
            User user) {

        Address address =
                findOwnedAddress(
                        addressId,
                        user);

        boolean deletedWasDefault =
                address.isDefaultAddress();


        addressRepository.delete(
                address);


        // If the deleted address was default,
        // make another existing address default.

        if (deletedWasDefault) {

            List<Address> remaining =
                    addressRepository
                            .findByUserOrderByDefaultAddressDescIdDesc(
                                    user);

            if (!remaining.isEmpty()) {

                Address newDefault =
                        remaining.get(0);

                newDefault.setDefaultAddress(
                        true);

                addressRepository.save(
                        newDefault);
            }
        }
    }


    // ==========================================
    // 6. SET AN ADDRESS AS DEFAULT
    // ==========================================

    @Transactional
    public AddressResponse setDefaultAddress(
            Long addressId,
            User user) {

        Address address =
                findOwnedAddress(
                        addressId,
                        user);


        clearExistingDefault(
                user);


        address.setDefaultAddress(
                true);


        Address updatedAddress =
                addressRepository.save(
                        address);


        return toResponse(
                updatedAddress);
    }


    // ==========================================
    // FIND ADDRESS OWNED BY THIS USER
    // ==========================================

    private Address findOwnedAddress(
            Long addressId,
            User user) {

        return addressRepository
                .findByIdAndUser(
                        addressId,
                        user)
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "Address not found"));
    }


    // ==========================================
    // CLEAR CURRENT DEFAULT
    // ==========================================

    private void clearExistingDefault(
            User user) {

        addressRepository
                .findByUserAndDefaultAddressTrue(
                        user)
                .ifPresent(
                        oldDefault -> {

                            oldDefault
                                    .setDefaultAddress(
                                            false);

                            addressRepository
                                    .save(
                                            oldDefault);
                        });
    }


    // ==========================================
    // COPY DTO → ENTITY
    // ==========================================

    private void copyRequestToAddress(
            AddressRequest request,
            Address address) {

        address.setAddressType(
                request
                        .getAddressType()
                        .trim()
                        .toUpperCase());

        address.setFullName(
                request
                        .getFullName()
                        .trim());

        address.setPhone(
                request
                        .getPhone()
                        .trim());

        address.setAddressLine1(
                request
                        .getAddressLine1()
                        .trim());


        if (request.getAddressLine2()
                != null) {

            address.setAddressLine2(
                    request
                            .getAddressLine2()
                            .trim());

        } else {

            address.setAddressLine2(
                    null);
        }


        address.setCity(
                request
                        .getCity()
                        .trim());

        address.setState(
                request
                        .getState()
                        .trim());

        address.setPostalCode(
                request
                        .getPostalCode()
                        .trim());


        String country =
                request.getCountry();

        if (country == null
                || country.isBlank()) {

            country = "India";
        }


        address.setCountry(
                country.trim());
    }


    // ==========================================
    // ENTITY → RESPONSE DTO
    // ==========================================

    private AddressResponse toResponse(
            Address address) {

        AddressResponse response =
                new AddressResponse();

        response.setId(
                address.getId());

        response.setAddressType(
                address.getAddressType());

        response.setFullName(
                address.getFullName());

        response.setPhone(
                address.getPhone());

        response.setAddressLine1(
                address.getAddressLine1());

        response.setAddressLine2(
                address.getAddressLine2());

        response.setCity(
                address.getCity());

        response.setState(
                address.getState());

        response.setPostalCode(
                address.getPostalCode());

        response.setCountry(
                address.getCountry());

        response.setDefaultAddress(
                address.isDefaultAddress());

        response.setCreatedAt(
                address.getCreatedAt());

        response.setUpdatedAt(
                address.getUpdatedAt());

        return response;
    }
}