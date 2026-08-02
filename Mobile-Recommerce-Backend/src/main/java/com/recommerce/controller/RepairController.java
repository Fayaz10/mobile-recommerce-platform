package com.recommerce.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.RepairProblemResponse;
import com.recommerce.service.RepairService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.recommerce.dto.ConfirmBookingRequest;
import com.recommerce.dto.ConfirmBookingResponse;
import com.recommerce.model.User;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.recommerce.dto.RepairProblemRequest;
import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/api/repair")
public class RepairController {

    private final RepairService repairService;

    public RepairController(RepairService repairService) {
        this.repairService = repairService;
    }

    @GetMapping("/problems/{modelId}")
    public List<RepairProblemResponse> getProblems(
            @PathVariable Long modelId) {

        return repairService.getProblemsByModel(modelId);
    }
    
    @GetMapping("/admin/problems")
    public List<RepairProblemResponse> getAllProblems() {

        return repairService.getAllProblems();

    }
    
    @PostMapping("/admin/problems")
    public RepairProblemResponse addProblem(
            @RequestBody RepairProblemRequest request) {

        return repairService.addProblem(request);
    }

    @PutMapping("/admin/problems/{id}")
    public RepairProblemResponse updateProblem(
            @PathVariable Long id,
            @RequestBody RepairProblemRequest request) {

        return repairService.updateProblem(id, request);
    }

    @DeleteMapping("/admin/problems/{id}")
    public void deleteProblem(
            @PathVariable Long id) {

        repairService.deleteProblem(id);
    }
    
    @PostMapping("/book")
    public ConfirmBookingResponse bookRepair(
            @RequestBody ConfirmBookingRequest request,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();
        
        System.out.println("Controller Email = " + user.getEmail());
        System.out.println("Controller Name  = " + authentication.getName());

        return repairService.bookRepair(
                request,
                user.getEmail());
    }
    
    @GetMapping("/my-bookings")
    public List<ConfirmBookingResponse> myBookings(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return repairService.myConfirmBookings(user.getEmail());
    }
    
    @GetMapping("/admin/bookings")
    public List<ConfirmBookingResponse> getAllBookings() {

        return repairService.getAllConfirmBookings();
    }
    
    @PutMapping("/admin/bookings/{bookingId}/status")
    public ConfirmBookingResponse updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam String status) {

        return repairService.updateBookingStatus(
                bookingId,
                status);
    }
}