package com.recommerce.specification;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.recommerce.model.Product;

public class ProductSpecification {

    private ProductSpecification() {
    }


    // Only active products

    public static Specification<Product>
            isActive() {

        return (root, query, cb) ->
                cb.isTrue(
                        root.get("active"));
    }


    // Search product title

    public static Specification<Product>
            hasKeyword(String keyword) {

        return (root, query, cb) -> {

            if (keyword == null
                    || keyword.isBlank()) {

                return cb.conjunction();
            }

            return cb.like(
                    cb.lower(
                            root.get("title")),
                    "%"
                    + keyword
                            .trim()
                            .toLowerCase()
                    + "%");
        };
    }


    // Filter by brand

    public static Specification<Product>
            hasBrand(Long brandId) {

        return (root, query, cb) -> {

            if (brandId == null) {

                return cb.conjunction();
            }

            return cb.equal(
                    root.get("deviceVariant")
                        .get("deviceModel")
                        .get("brand")
                        .get("id"),
                    brandId);
        };
    }


    // Filter by condition

    public static Specification<Product>
            hasCondition(
                    String condition) {

        return (root, query, cb) -> {

            if (condition == null
                    || condition.isBlank()) {

                return cb.conjunction();
            }

            return cb.equal(
                    cb.lower(
                            root.get(
                                    "conditionType")),
                    condition
                            .trim()
                            .toLowerCase());
        };
    }


    // Minimum selling price

    public static Specification<Product>
            minPrice(
                    BigDecimal minPrice) {

        return (root, query, cb) -> {

            if (minPrice == null) {

                return cb.conjunction();
            }

            return cb.greaterThanOrEqualTo(
                    root.get("sellingPrice"),
                    minPrice);
        };
    }


    // Maximum selling price

    public static Specification<Product>
            maxPrice(
                    BigDecimal maxPrice) {

        return (root, query, cb) -> {

            if (maxPrice == null) {

                return cb.conjunction();
            }

            return cb.lessThanOrEqualTo(
                    root.get("sellingPrice"),
                    maxPrice);
        };
    }
}