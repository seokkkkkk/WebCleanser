package com.netpuri.server.controller;

import com.netpuri.server.dto.CheckResult;
import com.netpuri.server.dto.ThreatEntry;
import com.netpuri.server.dto.UrlSafetyResult;
import com.netpuri.server.service.SafeBrowsingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SafeBrowsingController {

    SafeBrowsingService safeBrowsingService;

    @Autowired
    public SafeBrowsingController(SafeBrowsingService safeBrowsingService) {
        this.safeBrowsingService = safeBrowsingService;
    }

    @PostMapping("/checkUrl")
    public CheckResult checkUrl(@RequestBody ThreatEntry url) {
        return safeBrowsingService.checkUrl(List.of(url));
    }

    @PostMapping("/checkUrls")
    public CheckResult checkUrl(@RequestBody List<ThreatEntry> urls) {
        return safeBrowsingService.checkUrl(urls);
    }

    @PostMapping("/checkUrlSafety")
    public boolean checkUrlSafety(@RequestBody ThreatEntry url) {
        return safeBrowsingService.urlSafetyCheck(List.of(url)).get(0).isSafe();
    }

    @PostMapping("/checkUrlsSafety")
    public List<UrlSafetyResult> checkUrlsSafety(@RequestBody List<ThreatEntry> urls) {
        return safeBrowsingService.urlSafetyCheck(urls);
    }
}
