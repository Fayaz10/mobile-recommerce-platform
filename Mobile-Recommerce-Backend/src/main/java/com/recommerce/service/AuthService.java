package com.recommerce.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.recommerce.dto.RegisterRequest;
import com.recommerce.model.User;
import com.recommerce.repository.UserRepository;
import com.recommerce.dto.LoginRequest;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(
            RegisterRequest request) {

        String email =
                request.getEmail() == null
                        ? ""
                        : request.getEmail()
                                .trim()
                                .toLowerCase();

        if (request.getName() == null ||
                request.getName().isBlank()) {

            throw new RuntimeException(
                    "Name is required");
        }

        if (email.isBlank()) {

            throw new RuntimeException(
                    "Email is required");
        }

        if (request.getPhone() == null ||
                request.getPhone().isBlank()) {

            throw new RuntimeException(
                    "Phone number is required");
        }

        if (request.getPassword() == null ||
                request.getPassword().length() < 8) {

            throw new RuntimeException(
                    "Password must contain at least 8 characters");
        }

        if (userRepository.existsByEmail(email)) {

            throw new RuntimeException(
                    "Email is already registered");
        }

        User user = new User();

        user.setName(
                request.getName().trim());

        user.setEmail(email);

        user.setPhone(
                request.getPhone().trim());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setRole("CUSTOMER");

        return userRepository.save(user);
    }
    
    public User login(LoginRequest request) {

        if (request.getEmail() == null ||
                request.getEmail().isBlank()) {

            throw new RuntimeException(
                    "Email is required");
        }

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            throw new RuntimeException(
                    "Password is required");
        }

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {

            throw new RuntimeException(
                    "Invalid email or password");
        }

        return user;
    }
}