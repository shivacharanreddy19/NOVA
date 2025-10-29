package com.example.aiaggregator;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {

    @Value("${GPT_API_KEY}")
    private String gptApiKey;

    @Value("${GEMINI_API_KEY}")
    private String geminiApiKey;

    @PostMapping("/ask/{model}")
    public ResponseEntity<String> askModel(
            @PathVariable String model,
            @RequestBody String request) {
        // TODO: Implement AI model logic
        String apiKey;
        if ("gpt".equalsIgnoreCase(model)) {
            apiKey = gptApiKey;
        } else if ("gemini".equalsIgnoreCase(model)) {
            apiKey = geminiApiKey;
        } else {
            return ResponseEntity.badRequest().body("Unsupported model");
        }
        // Now you can use the apiKey in your AI model logic
        return ResponseEntity.ok("Response from " + model + " using key: " + apiKey);
    }
}
