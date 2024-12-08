package com.netpuri.server.dto;

import lombok.Data;

import java.util.List;

@Data
public class ThreatEntryMetadata {
    private List<MetadataEntry> entries;
}
