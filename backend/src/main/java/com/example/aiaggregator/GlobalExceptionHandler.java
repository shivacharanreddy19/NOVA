package com.example.aiaggregator.controller;

import com.example.aiaggregator.model.ChatResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ChatResponse> handleException(Exception e) {
        logger.error("An unexpected error occurred: ", e);
        return new ResponseEntity<>(new ChatResponse("An internal error occurred: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}