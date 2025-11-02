package com.example.aiaggregator.model;

import java.util.List;
import java.util.Map;

public class ChatRequest {
    private String question;
    private List<Map<String, String>> history;
    private Map<String, Object> options;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<Map<String, String>> getHistory() {
        return history;
    }

    public void setHistory(List<Map<String, String>> history) {
        this.history = history;
    }

    public Map<String, Object> getOptions() {
        return options;
    }

    public void setOptions(Map<String, Object> options) {
        this.options = options;
    }
}