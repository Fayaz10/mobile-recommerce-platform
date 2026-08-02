package com.recommerce.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.OrderResponse;
import com.recommerce.dto.OrderStatusUpdateRequest;
import com.recommerce.service.OrderService;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;


    public AdminOrderController(
            OrderService orderService) {

        this.orderService = orderService;
    }


    // ==========================================
    // ADMIN - GET ALL ORDERS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<OrderResponse>>
            getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders());
    }


    // ==========================================
    // ADMIN - GET ONE ORDER
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse>
            getOrderById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                orderService.getOrderById(id));
    }


    // ==========================================
    // ADMIN - UPDATE ORDER STATUS
    // ==========================================

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse>
            updateOrderStatus(

                    @PathVariable Long id,

                    @RequestBody
                    OrderStatusUpdateRequest request) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(
                        id,
                        request));
    }
}