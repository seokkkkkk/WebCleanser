package com.netpuri.server.controller;

import com.netpuri.server.dto.TextRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PredictController {

    private final WebClient webClient;

    public PredictController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:5050").build();
    }

    @PostMapping(value = "/checkText", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<String> getPrediction(@RequestBody TextRequest request) {
        return webClient.post()
                .uri("/predict")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class);
    }
}
