package com.recommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.recommerce.model.DeviceModel;
import com.recommerce.model.DeviceVariant;
import com.recommerce.repository.DeviceModelRepository;
import com.recommerce.repository.DeviceVariantRepository;

@Service
public class DeviceVariantService {

    private final DeviceVariantRepository deviceVariantRepository;
    private final DeviceModelRepository deviceModelRepository;

    public DeviceVariantService(
            DeviceVariantRepository deviceVariantRepository,
            DeviceModelRepository deviceModelRepository) {

        this.deviceVariantRepository = deviceVariantRepository;
        this.deviceModelRepository = deviceModelRepository;
    }

    public List<DeviceVariant> getAllVariants() {
        return deviceVariantRepository.findAll();
    }

    public List<DeviceVariant> getVariantsByModel(Long modelId) {

        return deviceVariantRepository
                .findByDeviceModelIdOrderByDisplayOrderAsc(modelId);

    }

    public DeviceVariant addVariant(
        Long modelId,
        DeviceVariant variant) {

    DeviceModel model = deviceModelRepository
            .findById(modelId)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Device model not found"));

    if (deviceVariantRepository
            .existsByDeviceModelIdAndStorageIgnoreCaseAndRamIgnoreCaseAndColorIgnoreCase(
                    modelId,
                    variant.getStorage(),
                    variant.getRam(),
                    variant.getColor())) {

        throw new RuntimeException(
                "Variant already exists");

    }

    variant.setDeviceModel(model);

    return deviceVariantRepository.save(variant);

}
    
    public DeviceVariant updateVariant(
            Long id,
            DeviceVariant updatedVariant) {

        DeviceVariant variant = deviceVariantRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Variant not found"));

        Long modelId =
                updatedVariant.getDeviceModel().getId();

        if (deviceVariantRepository
                .existsByDeviceModelIdAndStorageIgnoreCaseAndRamIgnoreCaseAndColorIgnoreCaseAndIdNot(
                        modelId,
                        updatedVariant.getStorage(),
                        updatedVariant.getRam(),
                        updatedVariant.getColor(),
                        id)) {

            throw new RuntimeException(
                    "Variant already exists");

        }

        DeviceModel model = deviceModelRepository
                .findById(modelId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Device model not found"));

        variant.setDeviceModel(model);
        variant.setStorage(updatedVariant.getStorage());
        variant.setRam(updatedVariant.getRam());
        variant.setColor(updatedVariant.getColor());
        variant.setBasePrice(updatedVariant.getBasePrice());
        variant.setDisplayOrder(updatedVariant.getDisplayOrder());
        variant.setActive(updatedVariant.getActive());

        return deviceVariantRepository.save(variant);

    }
    
    public void deleteVariant(Long id) {

        if (!deviceVariantRepository.existsById(id)) {

            throw new RuntimeException(
                    "Variant not found");

        }

        deviceVariantRepository.deleteById(id);

    }
    
    public List<DeviceVariant> searchVariants(
            String keyword) {

        return deviceVariantRepository
                .findByStorageContainingIgnoreCaseOrRamContainingIgnoreCase(
                        keyword,
                        keyword);

    }
}