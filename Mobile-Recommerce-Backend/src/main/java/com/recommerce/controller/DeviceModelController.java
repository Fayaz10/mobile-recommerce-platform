package com.recommerce.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.recommerce.model.DeviceModel;
import com.recommerce.service.DeviceModelService;

@RestController
@RequestMapping("/api/device-models")
public class DeviceModelController {

    private final DeviceModelService deviceModelService;

    public DeviceModelController(DeviceModelService deviceModelService) {
        this.deviceModelService = deviceModelService;
    }

    @GetMapping
    public List<DeviceModel> getAllModels() {
        return deviceModelService.getAllModels();
    }

    @GetMapping("/brand/{brandId}")
    public List<DeviceModel> getModelsByBrand(
            @PathVariable Long brandId) {

        return deviceModelService.getModelsByBrand(brandId);
    }

    @GetMapping("/search")
    public List<DeviceModel> searchModels(
            @RequestParam String keyword) {

        return deviceModelService.searchModels(keyword);
    }

    @PostMapping("/brand/{brandId}")
    public ResponseEntity<DeviceModel> addModel(
            @PathVariable Long brandId,
            @RequestBody DeviceModel deviceModel) {

        DeviceModel savedModel =
                deviceModelService.addModel(brandId, deviceModel);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedModel);
    }

    @PutMapping("/{id}")
    public DeviceModel updateModel(
            @PathVariable Long id,
            @RequestBody DeviceModel deviceModel) {

        return deviceModelService.updateModel(id, deviceModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModel(
            @PathVariable Long id) {

        deviceModelService.deleteModel(id);

        return ResponseEntity.noContent().build();
    }
}