package com.recommerce.exception;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 404

    @ExceptionHandler(
            ResourceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse>
            handleNotFound(

                    ResourceNotFoundException ex,
                    HttpServletRequest request) {

        ApiErrorResponse error =
                new ApiErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.NOT_FOUND.value(),
                        "Not Found",
                        ex.getMessage(),
                        request.getRequestURI());

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }


    // 400

    @ExceptionHandler(
            BadRequestException.class)
    public ResponseEntity<ApiErrorResponse>
            handleBadRequest(

                    BadRequestException ex,
                    HttpServletRequest request) {

        ApiErrorResponse error =
                new ApiErrorResponse(
                        LocalDateTime.now(),
                        HttpStatus.BAD_REQUEST.value(),
                        "Bad Request",
                        ex.getMessage(),
                        request.getRequestURI());

        return ResponseEntity
                .badRequest()
                .body(error);
    }


    // DTO VALIDATION ERRORS

    @ExceptionHandler(
            MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>>
            handleValidation(

                    MethodArgumentNotValidException ex,
                    HttpServletRequest request) {

        Map<String, String> fieldErrors =
                new LinkedHashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        fieldErrors.put(
                                error.getField(),
                                error.getDefaultMessage()));


        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "timestamp",
                LocalDateTime.now());

        response.put(
                "status",
                HttpStatus.BAD_REQUEST.value());

        response.put(
                "error",
                "Validation Failed");

        response.put(
                "message",
                "Request validation failed");

        response.put(
                "fieldErrors",
                fieldErrors);

        response.put(
                "path",
                request.getRequestURI());


        return ResponseEntity
                .badRequest()
                .body(response);
    }
}