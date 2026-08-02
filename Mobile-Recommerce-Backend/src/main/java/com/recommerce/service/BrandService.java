package com.recommerce.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.recommerce.model.Brand;
import com.recommerce.repository.BrandRepository;

@Service
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandService(
            BrandRepository brandRepository) { 

        this.brandRepository = brandRepository;
    }

    public List<Brand> getAllBrands() {

        return brandRepository.findAll();
    }

    // ==========================================
    // GET BRAND BY ID
    // ==========================================

    public Brand getBrandById(Long id) {

        return brandRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Brand not found with id: " + id
                        )
                );
    }

    public Brand addBrand(Brand brand) {

        return brandRepository.save(brand);
    }
    
 // ==========================================
 // GET ACTIVE BRANDS (CUSTOMER)
 // ==========================================
 public List<Brand> getActiveBrands() {
     return brandRepository.findByActiveTrueOrderByDisplayOrderAscNameAsc();
 }

 // ==========================================
 // UPDATE BRAND
 // ==========================================
 public Brand updateBrand(Long id, Brand updatedBrand) {

     Brand brand = getBrandById(id);

     brand.setName(updatedBrand.getName());
     brand.setLogoUrl(updatedBrand.getLogoUrl());
     brand.setActive(updatedBrand.getActive());
     brand.setDisplayOrder(updatedBrand.getDisplayOrder());

     return brandRepository.save(brand);
 }

 // ==========================================
 // DELETE BRAND
 // ==========================================
 public void deleteBrand(Long id) {

     Brand brand = getBrandById(id);

     brandRepository.delete(brand);
 }
}