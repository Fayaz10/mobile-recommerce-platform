package com.recommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.DeviceVariant;

public interface DeviceVariantRepository
        extends JpaRepository<DeviceVariant, Long> {

    // All variants of a model
    List<DeviceVariant> findByDeviceModelIdOrderByDisplayOrderAsc(
            Long deviceModelId);

    // Active variants for customer side
    List<DeviceVariant> findByDeviceModelIdAndActiveTrueOrderByDisplayOrderAsc(
            Long deviceModelId);

    // Search
    List<DeviceVariant> findByStorageContainingIgnoreCaseOrRamContainingIgnoreCase(
            String storage,
            String ram);

    // Duplicate validation
    boolean existsByDeviceModelIdAndStorageIgnoreCaseAndRamIgnoreCaseAndColorIgnoreCase(
            Long deviceModelId,
            String storage,
            String ram,
            String color);

    // Duplicate validation while editing
    boolean existsByDeviceModelIdAndStorageIgnoreCaseAndRamIgnoreCaseAndColorIgnoreCaseAndIdNot(
            Long deviceModelId,
            String storage,
            String ram,
            String color,
            Long id);
}