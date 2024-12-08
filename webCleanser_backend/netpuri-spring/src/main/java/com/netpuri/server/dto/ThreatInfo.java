package com.netpuri.server.dto;

import lombok.Data;

import java.util.List;

@Data
public class ThreatInfo {
    private String[] threatTypes={"MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"};
    private String[] platformTypes={"ANY_PLATFORM"};
    private String[] threatEntryTypes={"URL"};
    private List<ThreatEntry> threatEntries;
}
