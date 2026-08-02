package com.recommerce.controller;

import com.recommerce.dto.AdminProfileResponse;
import com.recommerce.dto.ChangePasswordRequest;
import com.recommerce.dto.ProfileUpdateRequest;
import com.recommerce.model.User;
import com.recommerce.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/profile")
public class AdminProfileController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> getProfile(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        AdminProfileResponse response =
                new AdminProfileResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getRole());

        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(
            @RequestBody ProfileUpdateRequest request,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        user.setName(request.getName());
        user.setPhone(request.getPhone());

        userRepository.save(user);

        return ResponseEntity.ok("Profile updated successfully");
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            return ResponseEntity.badRequest()
                    .body("Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {

            return ResponseEntity.badRequest()
                    .body("New password and confirm password do not match");
        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);

        return ResponseEntity.ok("Password changed successfully");
    }
}