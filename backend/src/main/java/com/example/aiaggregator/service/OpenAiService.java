package com.example.aiaggregator.service;

import com.example.aiaggregator.model.ChatRequest;
import com.example.aiaggregator.model.ChatResponse;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("openAiService")
public class OpenAiService implements AIService {

    private final OpenAiChatModel chatModel;

    public OpenAiService(@Value("${spring.ai.openai.api-key}") String apiKey) {
        var openAiApi = new OpenAiApi(apiKey);
        this.chatModel = new OpenAiChatModel(openAiApi, OpenAiChatOptions.builder()
                .withModel("gpt-3.5-turbo")
                .withTemperature(0.4)
                .build());
    }

    @Override
    public ChatResponse generateResponse(ChatRequest request) {
        try {
            var prompt = new Prompt(request.getQuestion());
            var aiResponse = chatModel.call(prompt);
            return new ChatResponse(aiResponse.getResult().getOutput().getContent(), null);
        } catch (Exception e) {
            return new ChatResponse("Error generating response from OpenAI: " + e.getMessage());
        }
    }
}
