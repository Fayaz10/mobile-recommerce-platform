package com.recommerce.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.recommerce.model.Brand;
import com.recommerce.service.BrandService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
@RestController
@RequestMapping("/api/brands")
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    public List<Brand> getAllBrands() {
        return brandService.getAllBrands();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrandById(
            @PathVariable Long id) {

        Brand brand = brandService.getBrandById(id);

        return ResponseEntity.ok(brand);
    }

    @PostMapping
    public ResponseEntity<Brand> addBrand(@RequestBody Brand brand) {

        Brand savedBrand = brandService.addBrand(brand);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedBrand);
    }
    
 // CUSTOMER
    @GetMapping("/active")
    public List<Brand> getActiveBrands() {
        return brandService.getActiveBrands();
    }

    // ADMIN
    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(
            @PathVariable Long id,
            @RequestBody Brand brand) {

        return ResponseEntity.ok(
                brandService.updateBrand(id, brand));
    }

    // ADMIN
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(
            @PathVariable Long id) {

        brandService.deleteBrand(id);

        return ResponseEntity.noContent().build();
    }
}