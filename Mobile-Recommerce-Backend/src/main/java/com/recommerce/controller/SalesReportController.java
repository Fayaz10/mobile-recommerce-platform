package com.recommerce.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.SalesReportResponse;
import com.recommerce.service.SalesReportService;

import java.util.List;

import com.recommerce.dto.TopSellingProductResponse;

@RestController
@RequestMapping("/api/admin/reports")
public class SalesReportController {

    private final SalesReportService salesReportService;


    public SalesReportController(
            SalesReportService salesReportService) {

        this.salesReportService =
                salesReportService;
    }


    // ==========================================
    // ADMIN - DAILY SALES REPORT
    // ==========================================

    @GetMapping("/daily")
    public ResponseEntity<SalesReportResponse>
            getDailyReport() {

        SalesReportResponse response =
                salesReportService
                        .getDailyReport();

        return ResponseEntity.ok(
                response);
    }


    // ==========================================
    // ADMIN - MONTHLY SALES REPORT
    // ==========================================

    @GetMapping("/monthly")
    public ResponseEntity<SalesReportResponse>
            getMonthlyReport() {

        SalesReportResponse response =
                salesReportService
                        .getMonthlyReport();

        return ResponseEntity.ok(
                response);
    }


    // ==========================================
    // ADMIN - CUSTOM DATE RANGE REPORT
    // ==========================================

    @GetMapping
    public ResponseEntity<SalesReportResponse>
            getDateRangeReport(

            @RequestParam
            @DateTimeFormat(
                    iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam
            @DateTimeFormat(
                    iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate) {

        SalesReportResponse response =
                salesReportService
                        .getDateRangeReport(
                                startDate,
                                endDate);

        return ResponseEntity.ok(
                response);
    }
    
 // ==========================================
 // ADMIN - TOP SELLING PRODUCTS
 // ==========================================

 @GetMapping("/top-products")
 public ResponseEntity<List<TopSellingProductResponse>>
         getTopSellingProducts() {

     List<TopSellingProductResponse> response =
             salesReportService
                     .getTopSellingProducts();

     return ResponseEntity.ok(response);
 }
}