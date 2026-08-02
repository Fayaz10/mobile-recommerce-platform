package com.recommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    // Customer pages - only active brands
    List<Brand> findByActiveTrueOrderByDisplayOrderAscNameAsc();

    // Prevent duplicate brand names
    boolean existsByNameIgnoreCase(String name);
}