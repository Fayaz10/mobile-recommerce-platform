package com.recommerce.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recommerce.dto.ProductRequest;
import com.recommerce.model.Product;
import com.recommerce.service.ProductService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;

import jakarta.validation.Valid;

import com.recommerce.dto.ProductUpdateRequest;
import com.recommerce.dto.ProductStockUpdateRequest;
import com.recommerce.dto.ProductStatusUpdateRequest;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.RequestParam;

import com.recommerce.dto.ProductPageResponse;

import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(
            ProductService productService) {

        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(
            @RequestBody ProductRequest request) {

        Product saved =
                productService.addProduct(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }

    @GetMapping
    public List<Product> getAllProducts() {

        return productService
                .getAllActiveProducts();
    }
    
 // ==========================================
 // ADMIN - GET ALL PRODUCTS
 // ACTIVE + INACTIVE
 // ==========================================

 @GetMapping("/admin/all")
 public List<Product> getAllProductsForAdmin() {

     return productService
             .getAllProductsForAdmin();
 }
    
 // ==========================================
 // PUBLIC - SEARCH / FILTER / SORT / PAGINATION
 // ==========================================

 @GetMapping("/search")
 public ProductPageResponse searchProducts(

         @RequestParam(required = false)
         String keyword,

         @RequestParam(required = false)
         Long brandId,

         @RequestParam(required = false)
         String condition,

         @RequestParam(required = false)
         BigDecimal minPrice,

         @RequestParam(required = false)
         BigDecimal maxPrice,

         @RequestParam(required = false)
         String sort,

         @RequestParam(defaultValue = "0")
         int page,

         @RequestParam(defaultValue = "12")
         int size) {

     return productService.searchProducts(
             keyword,
             brandId,
             condition,
             minPrice,
             maxPrice,
             sort,
             page,
             size);
 }
 
    @GetMapping("/{id}")
    public Product getProduct(
            @PathVariable Long id) {

        return productService
                .getProductById(id);
    }

    @GetMapping("/brand/{brandId}")
    public List<Product> getByBrand(
            @PathVariable Long brandId) {

        return productService
                .getProductsByBrand(brandId);
    }
    
 // ==========================================
 // ADMIN - UPDATE PRODUCT
 // ==========================================

 @PutMapping("/{id}")
 public ResponseEntity<Product> updateProduct(
         @PathVariable Long id,
         @RequestBody ProductUpdateRequest request) {

     Product updated =
             productService.updateProduct(
                     id,
                     request);

     return ResponseEntity.ok(updated);
 }
 
//==========================================
//ADMIN - UPDATE PRODUCT STOCK
//==========================================

@PatchMapping("/{id}/stock")
public ResponseEntity<Product> updateStock(
      @PathVariable Long id,
      @Valid
      @RequestBody ProductStockUpdateRequest request) {

  Product updated =
          productService.updateStock(
                  id,
                  request);

  return ResponseEntity.ok(updated);
}

//==========================================
//ADMIN - UPDATE PRODUCT STATUS
//==========================================

@PatchMapping("/{id}/status")
public ResponseEntity<Product> updateStatus(
     @PathVariable Long id,
     @Valid
     @RequestBody ProductStatusUpdateRequest request) {

 Product updated =
         productService.updateStatus(
                 id,
                 request);

 return ResponseEntity.ok(updated);
}

//==========================================
//ADMIN - SOFT DELETE PRODUCT
//==========================================

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteProduct(
        @PathVariable Long id) {

    productService.deleteProduct(id);

    return ResponseEntity.noContent().build();
}

//==========================================
//ADMIN - UPLOAD PRODUCT IMAGE
//==========================================

@PostMapping("/{id}/image")
public ResponseEntity<Product> uploadProductImage(

     @PathVariable Long id,

     @RequestParam("file")
     MultipartFile file) {

 Product updated =
         productService
                 .uploadProductImage(
                         id,
                         file);

 return ResponseEntity.ok(
         updated);
}
}