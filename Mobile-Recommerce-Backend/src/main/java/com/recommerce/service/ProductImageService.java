package com.recommerce.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductImageService {

    private final Path uploadPath;

    private static final Set<String> ALLOWED_TYPES =
            Set.of(
                    "image/jpeg",
                    "image/png",
                    "image/webp"
            );


    public ProductImageService(
            @Value("${app.upload.dir}")
            String uploadDir) {

        this.uploadPath =
                Paths.get(uploadDir)
                        .toAbsolutePath()
                        .normalize();

        try {

            Files.createDirectories(
                    this.uploadPath);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Could not create product image upload directory",
                    e);
        }
    }


    public String saveImage(
            MultipartFile file) {

        // -----------------------------
        // CHECK EMPTY FILE
        // -----------------------------

        if (file == null ||
                file.isEmpty()) {

            throw new IllegalArgumentException(
                    "Product image is required");
        }


        // -----------------------------
        // VALIDATE FILE TYPE
        // -----------------------------

        String contentType =
                file.getContentType();

        if (contentType == null ||
                !ALLOWED_TYPES.contains(
                        contentType)) {

            throw new IllegalArgumentException(
                    "Only JPG, PNG and WEBP images are allowed");
        }


        // -----------------------------
        // GET FILE EXTENSION
        // -----------------------------

        String originalFilename =
                file.getOriginalFilename();

        String extension =
                getExtension(
                        originalFilename);


        // -----------------------------
        // GENERATE UNIQUE FILE NAME
        // -----------------------------

        String fileName =
                UUID.randomUUID()
                        + extension;


        Path targetLocation =
                uploadPath.resolve(
                        fileName)
                        .normalize();


        // Prevent writing outside upload folder

        if (!targetLocation
                .getParent()
                .equals(uploadPath)) {

            throw new IllegalArgumentException(
                    "Invalid image file name");
        }


        // -----------------------------
        // SAVE IMAGE
        // -----------------------------

        try {

            Files.copy(
                    file.getInputStream(),
                    targetLocation,
                    StandardCopyOption
                            .REPLACE_EXISTING);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Could not save product image",
                    e);
        }


        // URL that will later be stored
        // in Product.imageUrl

        return "/uploads/products/"
                + fileName;
    }


    private String getExtension(
            String filename) {

        if (filename == null ||
                !filename.contains(".")) {

            throw new IllegalArgumentException(
                    "Image file must have a valid extension");
        }

        String extension =
                filename.substring(
                        filename
                                .lastIndexOf("."))
                        .toLowerCase();


        if (!extension.equals(".jpg") &&
                !extension.equals(".jpeg") &&
                !extension.equals(".png") &&
                !extension.equals(".webp")) {

            throw new IllegalArgumentException(
                    "Only JPG, JPEG, PNG and WEBP files are allowed");
        }


        return extension;
    }
}