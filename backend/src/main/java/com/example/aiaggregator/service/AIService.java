package com.example.aiaggregator.service;

import com.example.aiaggregator.model.ChatRequest;
import com.example.aiaggregator.model.ChatResponse;

public interface AIService {
    ChatResponse generateResponse(ChatRequest request);
}
