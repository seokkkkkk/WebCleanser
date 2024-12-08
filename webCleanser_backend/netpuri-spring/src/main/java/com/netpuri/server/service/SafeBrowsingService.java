package com.netpuri.server.service;

import com.netpuri.server.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class SafeBrowsingService {

    @Value("${google.safeBrowsing.api.key}")
    private String googleApiKey;

    private String getCheckUrl() {
        String urlPrefix = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=";
        return urlPrefix + googleApiKey;
    }

    public CheckResult checkUrl(List<ThreatEntry> urls) {
        RestTemplate restTemplate = new RestTemplate();
        SafeBrowsingRequest checkRequest = new SafeBrowsingRequest();
        ThreatInfo threatInfo = new ThreatInfo();

        threatInfo.setThreatEntries(urls);
        checkRequest.setClient(new ClientInfo());
        checkRequest.setThreatInfo(threatInfo);

        try {
            return restTemplate.postForEntity(getCheckUrl(), checkRequest, CheckResult.class).getBody();
        } catch (Exception e) {
            throw  new RuntimeException("Error while checking URL safety", e);
        }
    }

    public List<UrlSafetyResult> urlSafetyCheck(List<ThreatEntry> urls) {
        List<UrlSafetyResult> safetyResults = new ArrayList<>();
        for (ThreatEntry url : urls) {
            CheckResult result = checkUrl(List.of(url));
            boolean isSafe = result.getThreatMatches() == null || result.getThreatMatches().isEmpty();
            safetyResults.add(new UrlSafetyResult(url.getUrl(), isSafe));
        }
        return safetyResults;
    }
}
