package com.recommerce.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.recommerce.model.User;
import com.recommerce.repository.UserRepository;
import com.recommerce.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final UserRepository userRepository;


    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository) {

        this.jwtService = jwtService;

        this.userRepository = userRepository;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {


        // ---------------------------------
        // STEP 1: READ AUTHORIZATION HEADER
        // ---------------------------------

        String authorizationHeader =
                request.getHeader(
                        "Authorization");
        
        System.out.println("REQUEST URL = " + request.getRequestURI());
        System.out.println("AUTH HEADER = " + authorizationHeader);
        
        System.out.println("Authorization Header: " + authorizationHeader);


        // ---------------------------------
        // STEP 2: CHECK FOR BEARER TOKEN
        // ---------------------------------

        if (authorizationHeader == null ||
                !authorizationHeader
                        .startsWith("Bearer ")) {

            filterChain.doFilter(
                    request,
                    response);

            return;
        }


        // ---------------------------------
        // STEP 3: EXTRACT JWT
        // ---------------------------------

        String token =
                authorizationHeader
                        .substring(7);
        
        System.out.println("JWT Token: " + token);


        try {

            // ---------------------------------
            // STEP 4: VALIDATE JWT
            // ---------------------------------

            if (jwtService
                    .isTokenValid(token)) {
            	
            	
            	System.out.println("JWT is VALID");


                // ---------------------------------
                // STEP 5: GET EMAIL FROM JWT
                // ---------------------------------

                String email =
                        jwtService
                                .extractEmail(token);


                // ---------------------------------
                // STEP 6: FIND USER IN DATABASE
                // ---------------------------------

                User user =
                        userRepository
                                .findByEmail(email)
                                .orElse(null);


                // ---------------------------------
                // STEP 7: AUTHENTICATE USER
                // ---------------------------------

                if (user != null &&
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                == null) {


                    String role =
                            String.valueOf(
                                    user.getRole());
                    System.out.println(
                            "JWT USER = " + user.getEmail()
                            + " | ROLE = " + user.getRole());


                    if (!role.startsWith(
                            "ROLE_")) {

                        role =
                                "ROLE_" + role;
                    }


                    SimpleGrantedAuthority
                            authority =
                            new SimpleGrantedAuthority(
                                    role);


                    UsernamePasswordAuthenticationToken
                            authentication =
                            new UsernamePasswordAuthenticationToken(

                                    user,

                                    null,

                                    List.of(
                                            authority)
                            );


                    // ---------------------------------
                    // STEP 8:
                    // SAVE AUTHENTICATION IN SPRING
                    // ---------------------------------

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            SecurityContextHolder.clearContext();
        }

        // ---------------------------------
        // STEP 9:
        // CONTINUE TO CONTROLLER
        // ---------------------------------

        filterChain.doFilter(
                request,
                response);
    }
}