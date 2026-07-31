package com.Project.SmartStay.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String model;

    public String chat(String userMessage) {

        try {

            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/"
                            + model
                            + ":generateContent?key="
                            + apiKey;

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            String prompt = """
                    You are SmartStay AI.

                    You only answer questions related to:

                    - PG Accommodation
                    - Booking
                    - Rooms
                    - Rent
                    - Amenities
                    - SmartStay Project

                    If the question is unrelated,
                    politely reply:

                    "I can only help with SmartStay PG related queries."

                    User Question:
                    """ + userMessage;

            Map<String, Object> body = Map.of(
                    "contents",
                    List.of(
                            Map.of(
                                    "parts",
                                    List.of(
                                            Map.of(
                                                    "text",
                                                    prompt
                                            )
                                    )
                            )
                    )
            );

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            Map response =
                    restTemplate.postForObject(url, request, Map.class);

            List candidates =
                    (List) response.get("candidates");

            Map candidate =
                    (Map) candidates.get(0);

            Map content =
                    (Map) candidate.get("content");

            List parts =
                    (List) content.get("parts");

            Map first =
                    (Map) parts.get(0);

            return first.get("text").toString();

        } catch (Exception e) {

            e.printStackTrace();

            return "ERROR: " + e.getMessage();

        }

    }

}