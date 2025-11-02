package com.example.aiaggregator;

import com.example.aiaggregator.model.ChatRequest;
import com.example.aiaggregator.model.ChatResponse;
import com.example.aiaggregator.service.AIService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final Map<String, AIService> aiServices;

    public ApiController(@Qualifier("openAiService") AIService openAiService,
                         @Qualifier("geminiService") AIService geminiService) {
        this.aiServices = Map.of(
                "gpt", openAiService,
                "gemini", geminiService
        );
    }

    @PostMapping("/ask/{model}")
    public ResponseEntity<ChatResponse> ask(@PathVariable String model, @RequestBody ChatRequest request) {
        AIService service = aiServices.get(model);

        if (service == null) {
            throw new IllegalArgumentException("Unsupported AI model: " + model);
        }

        ChatResponse response = service.generateResponse(request);
        return ResponseEntity.ok(response);
    }
}