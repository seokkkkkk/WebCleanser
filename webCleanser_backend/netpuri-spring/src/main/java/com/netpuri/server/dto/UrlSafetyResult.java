package com.netpuri.server.dto;

import lombok.Data;

@Data
public class UrlSafetyResult {
    private String url;
    private boolean isSafe;

    public UrlSafetyResult(String url, boolean isSafe) {
        this.url = url;
        this.isSafe = isSafe;
    }
}
