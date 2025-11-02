package com.example.aiaggregator.model;

import org.json.JSONObject;

public class ChatResponse {
    private String response;
    private String summary;
    private String error;

    public ChatResponse(String response, String summary) {
        this.response = response;
        this.summary = summary;
    }

    public ChatResponse(String error) {
        this.error = error;
    }

    public static ChatResponse fromJson(String json) {
        JSONObject jsonObject = new JSONObject(json);
        String response = jsonObject.optString("response", "No response content found.");
        String summary = jsonObject.optString("summary", "No summary available.");
        return new ChatResponse(response, summary);
    }

    public String getResponse() {
        return response;
    }

    public String getSummary() {
        return summary;
    }

    public String getError() {
        return error;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public void setError(String error) {
        this.error = error;
    }
}