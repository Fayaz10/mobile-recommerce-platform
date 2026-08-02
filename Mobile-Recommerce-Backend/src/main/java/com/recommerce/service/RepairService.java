package com.recommerce.service;

import java.util.List;

import com.recommerce.dto.ConfirmBookingRequest;
import com.recommerce.dto.ConfirmBookingResponse;
import com.recommerce.dto.RepairProblemRequest;
import com.recommerce.dto.RepairProblemResponse;

public interface RepairService {

    // ---------- Customer ----------

    List<RepairProblemResponse> getProblemsByModel(Long modelId);

    ConfirmBookingResponse bookRepair(
            ConfirmBookingRequest request,
            String customerEmail);

    List<ConfirmBookingResponse> myConfirmBookings(
            String customerEmail);


    // ---------- Admin ----------
    
    List<RepairProblemResponse> getAllProblems();

    RepairProblemResponse addProblem(
            RepairProblemRequest request);

    RepairProblemResponse updateProblem(
            Long id,
            RepairProblemRequest request);

    void deleteProblem(Long id);

    List<ConfirmBookingResponse> getAllConfirmBookings();

    ConfirmBookingResponse updateBookingStatus(
            Long bookingId,
            String status);

}