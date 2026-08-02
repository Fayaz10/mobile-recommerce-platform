package com.recommerce.security;

import org.springframework.context.annotation.Bean;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.access.AccessDeniedHandler;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter =
                jwtAuthenticationFilter;
    }


    // ==========================================
    // RETURN 401 WHEN NOT AUTHENTICATED
    // ==========================================

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {

        return (request, response, authException) -> {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED);

            response.setContentType(
                    "application/json");

            response.setCharacterEncoding(
                    "UTF-8");

            response.getWriter().write(
                    "{\"message\":\"Authentication required\"}");
        };
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {

        return (request, response, accessDeniedException) -> {

            response.setStatus(
                    HttpServletResponse.SC_FORBIDDEN);

            response.setContentType(
                    "application/json");

            response.setCharacterEncoding(
                    "UTF-8");

            response.getWriter().write(
                    "{\"message\":\"Access denied: ADMIN role required\"}");
        };
    }
    // ==========================================
    // SECURITY CONFIGURATION
    // ==========================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            AuthenticationEntryPoint authenticationEntryPoint,
            AccessDeniedHandler accessDeniedHandler)
            throws Exception {

    	http

        .cors(cors -> {})

        .csrf(csrf ->
                csrf.disable())


            .exceptionHandling(exception ->
            exception
                .authenticationEntryPoint(
                        authenticationEntryPoint)
                .accessDeniedHandler(
                        accessDeniedHandler))


            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS))


            .authorizeHttpRequests(auth ->
                    auth
                    
                     // =================================
                     // CORS PREFLIGHT
                    // =================================
                    .requestMatchers(
                            HttpMethod.OPTIONS,
                            "/**"
                    )
                    .permitAll()

                        // =================================
                        // PUBLIC AUTH APIs
                        // =================================

                    .requestMatchers(
                            "/api/auth/register",
                            "/api/auth/login",
                            "/api/upload/**",
                            "/uploads/**")
                    .permitAll()
                    
                 // =================================
                 // ADMIN - GET ALL PRODUCTS
                 // ACTIVE + INACTIVE
                 // =================================

                 .requestMatchers(
                         HttpMethod.GET,
                         "/api/products/admin/all"
                 )
                 .hasRole("ADMIN")


                        // =================================
                        // PUBLIC PRODUCT BROWSING
                        // GET ONLY
                        // =================================

                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/brands/**",
                                "/api/device-models/**",
                                "/api/device-variants/**",
                                "/api/products/**")
                        .permitAll()


                        // =================================
                        // ADMIN-ONLY MANAGEMENT
                        // POST / PUT / DELETE
                        // =================================

                        .requestMatchers(
                                "/api/brands/**",
                                "/api/device-models/**",
                                "/api/device-variants/**",
                                "/api/products/**")
                        .hasRole("ADMIN")
                        
                        
                        
                     // =================================
                     // ADMIN ORDER MANAGEMENT
                     // =================================

                     .requestMatchers(
                             "/api/admin/**")
                     .hasRole("ADMIN")
                     
                     
                     .requestMatchers(HttpMethod.GET, "/api/repair/problems/**").permitAll()


                        // =================================
                        // EVERYTHING ELSE
                        // LOGIN REQUIRED
                        // =================================

                        .anyRequest()
                        .authenticated()
            )


            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"
                )
        );

        CorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        ((UrlBasedCorsConfigurationSource) source)
                .registerCorsConfiguration(
                        "/**",
                        configuration
                );

        return source;
    }
}