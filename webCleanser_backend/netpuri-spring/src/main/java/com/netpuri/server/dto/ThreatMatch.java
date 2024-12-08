package com.netpuri.server.dto;

import lombok.Data;

@Data
public class ThreatMatch {
    private String threatType;
    private String platformType;
    private String threatEntryType;
    private ThreatEntry threat;
    private ThreatEntryMetadata threatEntryMetadata;
    private String cacheDuration;
}
