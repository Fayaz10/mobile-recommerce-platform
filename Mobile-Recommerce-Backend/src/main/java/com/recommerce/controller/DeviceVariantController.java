package com.recommerce.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recommerce.model.DeviceVariant;
import com.recommerce.service.DeviceVariantService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/device-variants")
public class DeviceVariantController {

    private final DeviceVariantService deviceVariantService;

    public DeviceVariantController(
            DeviceVariantService deviceVariantService) {

        this.deviceVariantService = deviceVariantService;
    }

    @GetMapping
    public List<DeviceVariant> getAllVariants() {
        return deviceVariantService.getAllVariants();
    }

    @GetMapping("/model/{modelId}")
    public List<DeviceVariant> getVariantsByModel(
            @PathVariable Long modelId) {

        return deviceVariantService.getVariantsByModel(modelId);
    }

    @GetMapping("/search")
    public List<DeviceVariant> searchVariants(
            @RequestParam String keyword) {

        return deviceVariantService.searchVariants(keyword);
    }

    @PostMapping("/model/{modelId}")
    public ResponseEntity<DeviceVariant> addVariant(
            @PathVariable Long modelId,
            @RequestBody DeviceVariant variant) {

        DeviceVariant saved =
                deviceVariantService.addVariant(modelId, variant);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    @PutMapping("/{id}")
    public DeviceVariant updateVariant(
            @PathVariable Long id,
            @RequestBody DeviceVariant variant) {

        return deviceVariantService.updateVariant(id, variant);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVariant(
            @PathVariable Long id) {

        deviceVariantService.deleteVariant(id);

        return ResponseEntity.noContent().build();
    }
}