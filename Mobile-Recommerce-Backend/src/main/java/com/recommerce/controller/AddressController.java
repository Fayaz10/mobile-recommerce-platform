package com.recommerce.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.AddressRequest;
import com.recommerce.dto.AddressResponse;
import com.recommerce.model.User;
import com.recommerce.service.AddressService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressService addressService;


    public AddressController(
            AddressService addressService) {

        this.addressService = addressService;
    }


    // ADD ADDRESS

    @PostMapping
    public ResponseEntity<AddressResponse> createAddress(

            @AuthenticationPrincipal User user,

            @Valid
            @RequestBody AddressRequest request) {

        AddressResponse response =
                addressService.createAddress(
                        user,
                        request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // GET ALL MY ADDRESSES

    @GetMapping
    public ResponseEntity<List<AddressResponse>>
            getMyAddresses(

                    @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                addressService
                        .getMyAddresses(user));
    }


    // GET ONE ADDRESS

    @GetMapping("/{id}")
    public ResponseEntity<AddressResponse>
            getAddress(

                    @PathVariable Long id,

                    @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                addressService
                        .getAddress(id, user));
    }


    // UPDATE ADDRESS

    @PutMapping("/{id}")
    public ResponseEntity<AddressResponse>
            updateAddress(

                    @PathVariable Long id,

                    @AuthenticationPrincipal User user,

                    @Valid
                    @RequestBody AddressRequest request) {

        return ResponseEntity.ok(
                addressService.updateAddress(
                        id,
                        user,
                        request));
    }


    // DELETE ADDRESS

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>>
            deleteAddress(

                    @PathVariable Long id,

                    @AuthenticationPrincipal User user) {

        addressService.deleteAddress(
                id,
                user);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Address deleted successfully"));
    }


    // SET DEFAULT ADDRESS

    @PatchMapping("/{id}/default")
    public ResponseEntity<AddressResponse>
            setDefaultAddress(

                    @PathVariable Long id,

                    @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(
                addressService
                        .setDefaultAddress(
                                id,
                                user));
    }
}