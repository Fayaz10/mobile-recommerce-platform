package com.recommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.recommerce.model.Brand;
import com.recommerce.model.DeviceModel;
import com.recommerce.repository.BrandRepository;
import com.recommerce.repository.DeviceModelRepository;

@Service
public class DeviceModelService {

    private final DeviceModelRepository deviceModelRepository;
    private final BrandRepository brandRepository;

    public DeviceModelService(
            DeviceModelRepository deviceModelRepository,
            BrandRepository brandRepository) {

        this.deviceModelRepository = deviceModelRepository;
        this.brandRepository = brandRepository;
    }

    public List<DeviceModel> getAllModels() {
        return deviceModelRepository.findAll();
    }

    public List<DeviceModel> getModelsByBrand(Long brandId) {
        return deviceModelRepository
                .findByBrandIdOrderByDisplayOrderAsc(brandId);
    }

    public DeviceModel addModel(Long brandId, DeviceModel deviceModel) {

    Brand brand = brandRepository.findById(brandId)
            .orElseThrow(() ->
                    new RuntimeException("Brand not found"));

    if (deviceModelRepository.existsByBrandIdAndNameIgnoreCase(
            brandId,
            deviceModel.getName())) {

        throw new RuntimeException(
                "Model already exists for this brand");
    }

    deviceModel.setBrand(brand);

    return deviceModelRepository.save(deviceModel);
}
    
    public DeviceModel updateModel(Long id, DeviceModel updatedModel) {

        DeviceModel model = deviceModelRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Device model not found"));

        Long brandId = updatedModel.getBrand().getId();

        if (deviceModelRepository
                .existsByBrandIdAndNameIgnoreCaseAndIdNot(
                        brandId,
                        updatedModel.getName(),
                        id)) {

            throw new RuntimeException(
                    "Model already exists for this brand");
        }

        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() ->
                        new RuntimeException("Brand not found"));

        model.setBrand(brand);
        model.setName(updatedModel.getName());
        model.setImageUrl(updatedModel.getImageUrl());
        model.setDisplayOrder(updatedModel.getDisplayOrder());
        model.setActive(updatedModel.getActive());

        return deviceModelRepository.save(model);
    }
    
    public void deleteModel(Long id) {

        if (!deviceModelRepository.existsById(id)) {

            throw new RuntimeException(
                    "Device model not found");

        }

        deviceModelRepository.deleteById(id);
    }
    
    public List<DeviceModel> searchModels(String keyword) {

        return deviceModelRepository
                .findByNameContainingIgnoreCase(keyword);

    }
}
