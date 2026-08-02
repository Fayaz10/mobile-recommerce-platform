package com.recommerce.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recommerce.dto.ChangePasswordRequest;
import com.recommerce.dto.ProfileResponse;
import com.recommerce.dto.ProfileUpdateRequest;
import com.recommerce.model.User;
import com.recommerce.repository.UserRepository;

@Service
public class ProfileService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    public ProfileService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository =
                userRepository;

        this.passwordEncoder =
                passwordEncoder;
    }


    // ==========================================
    // GET LOGGED-IN USER PROFILE
    // ==========================================

    @Transactional(readOnly = true)
    public ProfileResponse getProfile(
            User user) {

        User currentUser =
                getCurrentUser(user);

        return mapToResponse(
                currentUser);
    }


    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    @Transactional
    public ProfileResponse updateProfile(
            User user,
            ProfileUpdateRequest request) {

        User currentUser =
                getCurrentUser(user);


        currentUser.setName(
                request.getName().trim());

        currentUser.setPhone(
                request.getPhone().trim());


        User updatedUser =
                userRepository.save(
                        currentUser);


        return mapToResponse(
                updatedUser);
    }


    // ==========================================
    // CHANGE PASSWORD
    // ==========================================

    @Transactional
    public void changePassword(
            User user,
            ChangePasswordRequest request) {

        User currentUser =
                getCurrentUser(user);


        // Check current password

        boolean currentPasswordMatches =
                passwordEncoder.matches(
                        request.getCurrentPassword(),
                        currentUser.getPassword());


        if (!currentPasswordMatches) {

            throw new IllegalArgumentException(
                    "Current password is incorrect");
        }


        // Check new password confirmation

        if (!request.getNewPassword()
                .equals(
                    request.getConfirmPassword())) {

            throw new IllegalArgumentException(
                    "New password and confirm password do not match");
        }


        // Prevent reusing current password

        if (passwordEncoder.matches(
                request.getNewPassword(),
                currentUser.getPassword())) {

            throw new IllegalArgumentException(
                    "New password must be different from current password");
        }


        // Encode and save new password

        currentUser.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()));


        userRepository.save(
                currentUser);
    }


    // ==========================================
    // GET FRESH USER FROM DATABASE
    // ==========================================

    private User getCurrentUser(
            User authenticatedUser) {

        if (authenticatedUser == null ||
                authenticatedUser.getId() == null) {

            throw new IllegalArgumentException(
                    "Authentication required");
        }


        return userRepository
                .findById(
                        authenticatedUser.getId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User account not found"));
    }


    // ==========================================
    // USER ENTITY → PROFILE RESPONSE
    // ==========================================

    private ProfileResponse mapToResponse(
            User user) {

        ProfileResponse response =
                new ProfileResponse();

        response.setId(
                user.getId());

        response.setName(
                user.getName());

        response.setEmail(
                user.getEmail());

        response.setPhone(
                user.getPhone());

        response.setRole(
                user.getRole());

        response.setCreatedAt(
                user.getCreatedAt());


        return response;
    }
}