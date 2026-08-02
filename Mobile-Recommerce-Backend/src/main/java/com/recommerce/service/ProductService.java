package com.recommerce.service;

import org.springframework.web.multipart.MultipartFile;
import java.util.List;

import org.springframework.stereotype.Service;

import com.recommerce.dto.ProductRequest;
import com.recommerce.model.DeviceVariant;
import com.recommerce.model.Product;
import com.recommerce.repository.DeviceVariantRepository;
import com.recommerce.repository.ProductRepository;

import com.recommerce.dto.ProductUpdateRequest;
import com.recommerce.dto.ProductStockUpdateRequest;
import com.recommerce.dto.ProductStatusUpdateRequest;
import com.recommerce.exception.ResourceNotFoundException;

import java.math.BigDecimal;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import com.recommerce.specification.ProductSpecification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.recommerce.dto.ProductPageResponse;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final DeviceVariantRepository deviceVariantRepository;
    
    private final ProductImageService productImageService;

    public ProductService(
            ProductRepository productRepository,
            DeviceVariantRepository deviceVariantRepository,
            ProductImageService productImageService) {

        this.productRepository =
                productRepository;

        this.deviceVariantRepository =
                deviceVariantRepository;

        this.productImageService =
                productImageService;
    }

    public Product addProduct(ProductRequest request) {

        DeviceVariant variant =
                deviceVariantRepository
                .findById(request.getVariantId())
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Device variant not found with id: "
                        + request.getVariantId()
                    )
                );

        Product product = new Product();

        product.setTitle(request.getTitle());
        product.setColor(request.getColor());
        product.setConditionType(request.getConditionType());
        product.setOriginalPrice(request.getOriginalPrice());
        product.setSellingPrice(request.getSellingPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setWarranty(request.getWarranty());
        product.setImageUrl(request.getImageUrl());
        product.setDescription(request.getDescription());

        product.setActive(true);

        product.setDeviceVariant(variant);

        return productRepository.save(product);
    }

    public List<Product> getAllActiveProducts() {
        return productRepository.findByActiveTrue();
    }
    
 // ==========================================
 // ADMIN - GET ALL PRODUCTS
 // ACTIVE + INACTIVE
 // ==========================================

 public List<Product> getAllProductsForAdmin() {

     return productRepository.findAll();
 }

    public Product getProductById(Long id) {

        return productRepository
                .findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Product not found with id: " + id
                    )
                );
    }

    public List<Product> getProductsByBrand(Long brandId) {

        return productRepository
                .findByDeviceVariantDeviceModelBrandIdAndActiveTrue(
                    brandId
                );
    }
    
    public Product updateProduct(
            Long id,
            ProductUpdateRequest request) {

        Product product =
                productRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                        + id));


        DeviceVariant variant =
                deviceVariantRepository
                        .findById(request.getVariantId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Device variant not found with id: "
                                        + request.getVariantId()));


        product.setTitle(
                request.getTitle());

        product.setColor(
                request.getColor());

        product.setConditionType(
                request.getConditionType());

        product.setOriginalPrice(
                request.getOriginalPrice());

        product.setSellingPrice(
                request.getSellingPrice());

        product.setStockQuantity(
                request.getStockQuantity());

        product.setWarranty(
                request.getWarranty());

        product.setImageUrl(
                request.getImageUrl());

        product.setDescription(
                request.getDescription());

        product.setDeviceVariant(
                variant);


        return productRepository.save(
                product);
    }
    
    public Product updateStock(
            Long id,
            ProductStockUpdateRequest request) {

        Product product =
                productRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                        + id));


        product.setStockQuantity(
                request.getStockQuantity());


        return productRepository.save(
                product);
    }
    
    public Product updateStatus(
            Long id,
            ProductStatusUpdateRequest request) {

        Product product =
                productRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                        + id));


        product.setActive(
                request.getActive());


        return productRepository.save(
                product);
    }
    
    public void deleteProduct(Long id) {

    Product product = productRepository
            .findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Product not found"));

    productRepository.delete(product);
}
    
    public ProductPageResponse searchProducts(
            String keyword,
            Long brandId,
            String condition,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String sort,
            int page,
            int size) {

        // Prevent invalid pagination values

        if (page < 0) {
            page = 0;
        }

        if (size < 1) {
            size = 12;
        }

        // Prevent extremely large requests
        if (size > 100) {
            size = 100;
        }


        Specification<Product> specification =
                ProductSpecification.isActive()
                        .and(
                                ProductSpecification
                                        .hasKeyword(keyword))
                        .and(
                                ProductSpecification
                                        .hasBrand(brandId))
                        .and(
                                ProductSpecification
                                        .hasCondition(condition))
                        .and(
                                ProductSpecification
                                        .minPrice(minPrice))
                        .and(
                                ProductSpecification
                                        .maxPrice(maxPrice));


        Sort sorting;

        if ("price_asc".equalsIgnoreCase(sort)) {

            sorting = Sort.by(
                    Sort.Direction.ASC,
                    "sellingPrice");

        } else if ("price_desc".equalsIgnoreCase(sort)) {

            sorting = Sort.by(
                    Sort.Direction.DESC,
                    "sellingPrice");

        } else {

            sorting = Sort.by(
                    Sort.Direction.DESC,
                    "id");
        }


        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        sorting);


        Page<Product> productPage =
                productRepository.findAll(
                        specification,
                        pageable);


        return new ProductPageResponse(

                productPage.getContent(),

                productPage.getNumber(),

                productPage.getSize(),

                productPage.getTotalElements(),

                productPage.getTotalPages(),

                productPage.isFirst(),

                productPage.isLast()
        );
    }
    
    public Product uploadProductImage(
            Long id,
            MultipartFile file) {

        // Find product

        Product product =
                productRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id: "
                                        + id));


        // Save physical image file

        String imageUrl =
                productImageService
                        .saveImage(file);


        // Save image URL in product

        product.setImageUrl(
                imageUrl);


        // Update database

        return productRepository
                .save(product);
    }
}