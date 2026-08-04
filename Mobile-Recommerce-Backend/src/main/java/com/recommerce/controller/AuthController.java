package com.recommerce.controller;

import java.util.LinkedHashMap;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.recommerce.repository.UserRepository;
import com.recommerce.dto.RegisterRequest;
import com.recommerce.model.User;
import com.recommerce.service.AuthService;
import com.recommerce.dto.LoginRequest;
import com.recommerce.service.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    
    private final JwtService jwtService;
    
    private final UserRepository userRepository;

    public AuthController(
            AuthService authService,
            JwtService jwtService,
            UserRepository userRepository) {

        this.authService = authService;

        this.jwtService = jwtService;

        this.userRepository =
                userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {

        try {

            User user =
                    authService.register(request);

            Map<String, Object> response =
                    new LinkedHashMap<>();

            response.put(
                    "message",
                    "Registration successful");

            response.put(
                    "userId",
                    user.getId());

            response.put(
                    "name",
                    user.getName());

            response.put(
                    "email",
                    user.getEmail());

            response.put(
                    "role",
                    user.getRole());

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        } catch (RuntimeException e) {

            Map<String, String> error =
                    new LinkedHashMap<>();

            error.put(
                    "message",
                    e.getMessage());

            return ResponseEntity
                    .badRequest()
                    .body(error);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            User user =
                    authService.login(request);
            
            String token =
                    jwtService.generateToken(user);

            System.out.println("================================");
            System.out.println("LOGIN TOKEN = " + token);
            System.out.println("================================");
            

            Map<String, Object> response =
                    new LinkedHashMap<>();

            response.put(
                    "message",
                    "Login successful");
            
            response.put(
                    "token",
                    token);

            response.put(
                    "userId",
                    user.getId());

            response.put(
                    "name",
                    user.getName());

            response.put(
                    "email",
                    user.getEmail());

            response.put(
                    "role",
                    user.getRole());

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            Map<String, String> error =
                    new LinkedHashMap<>();

            error.put(
                    "message",
                    e.getMessage());

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(error);
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            @AuthenticationPrincipal User user) {

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            Map.of(
                                    "message",
                                    "Authentication required"
                            )
                    );
        }

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "userId",
                user.getId());

        response.put(
                "name",
                user.getName());

        response.put(
                "email",
                user.getEmail());

        response.put(
                "phone",
                user.getPhone());

        response.put(
                "role",
                user.getRole());

        return ResponseEntity.ok(response);
    }
}