 package com.recommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recommerce.model.Product;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProductRepository
extends JpaRepository<Product, Long>,
        JpaSpecificationExecutor<Product> {
    List<Product> findByActiveTrue();

    List<Product> findByDeviceVariantDeviceModelBrandIdAndActiveTrue(
            Long brandId);
    
    long countByActiveTrue();

    long countByActiveTrueAndStockQuantityLessThan(
            Integer quantity);
}