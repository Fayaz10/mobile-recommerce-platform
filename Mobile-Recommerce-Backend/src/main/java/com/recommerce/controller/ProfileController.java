package com.recommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.ChangePasswordRequest;
import com.recommerce.dto.ProfileResponse;
import com.recommerce.dto.ProfileUpdateRequest;
import com.recommerce.model.User;
import com.recommerce.service.ProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(
            ProfileService profileService) {

        this.profileService = profileService;
    }


    // ==========================================
    // GET LOGGED-IN USER PROFILE
    // ==========================================

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(
            @AuthenticationPrincipal User user) {

        ProfileResponse response =
                profileService.getProfile(user);

        return ResponseEntity.ok(response);
    }


    // ==========================================
    // UPDATE LOGGED-IN USER PROFILE
    // ==========================================

    @PutMapping
    public ResponseEntity<ProfileResponse> updateProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ProfileUpdateRequest request) {

        ProfileResponse response =
                profileService.updateProfile(
                        user,
                        request);

        return ResponseEntity.ok(response);
    }


    // ==========================================
    // CHANGE PASSWORD
    // ==========================================

    @PutMapping("/password")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ChangePasswordRequest request) {

        profileService.changePassword(
                user,
                request);

        return ResponseEntity
                .noContent()
                .build();
    }
}