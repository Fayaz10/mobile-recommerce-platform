package com.recommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.DeviceModel;

public interface DeviceModelRepository
        extends JpaRepository<DeviceModel, Long> {

    // Models of a brand
    List<DeviceModel> findByBrandIdOrderByDisplayOrderAsc(Long brandId);

    // Only active models of a brand (for customer side)
    List<DeviceModel> findByBrandIdAndActiveTrueOrderByDisplayOrderAsc(Long brandId);

    // Duplicate validation
    boolean existsByBrandIdAndNameIgnoreCase(Long brandId, String name);

    // Duplicate validation while editing
    boolean existsByBrandIdAndNameIgnoreCaseAndIdNot(
            Long brandId,
            String name,
            Long id);

    // Search by brand + model name
    List<DeviceModel> findByBrandIdAndNameContainingIgnoreCase(
            Long brandId,
            String keyword);

    // Search all models
    List<DeviceModel> findByNameContainingIgnoreCase(String keyword);

    Optional<DeviceModel> findById(Long id);
}