package com.recommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.AdminDashboardResponse;
import com.recommerce.service.AdminDashboardService;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    private final AdminDashboardService
            adminDashboardService;


    public AdminDashboardController(
            AdminDashboardService adminDashboardService) {

        this.adminDashboardService =
                adminDashboardService;
    }


    // ==========================================
    // ADMIN - DASHBOARD STATISTICS
    // ==========================================

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponse>
            getDashboard() {

        AdminDashboardResponse response =
                adminDashboardService
                        .getDashboard();

        return ResponseEntity.ok(
                response);
    }
}