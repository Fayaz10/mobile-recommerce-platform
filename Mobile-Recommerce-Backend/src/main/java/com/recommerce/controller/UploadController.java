package com.recommerce.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "*")
public class UploadController {
	
	@PostMapping
	public ResponseEntity<Map<String, String>> uploadImage(
	        @RequestParam("file") MultipartFile file) {

	    try {

	        String uploadDir = "uploads";

	        Files.createDirectories(Paths.get(uploadDir));

	        String fileName =
	                UUID.randomUUID() + "_" + file.getOriginalFilename();

	        Path filePath = Paths.get(uploadDir, fileName);

	        Files.copy(
	                file.getInputStream(),
	                filePath,
	                StandardCopyOption.REPLACE_EXISTING);

	        Map<String, String> response = new HashMap<>();

	        response.put("fileName", fileName);

	        response.put(
	                "url",
	                "/uploads/" + fileName);

	        return ResponseEntity.ok(response);

	    } catch (IOException e) {

	        return ResponseEntity.internalServerError().build();

	    }

	}

}