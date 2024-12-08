package com.netpuri.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class CheckResult {
    @JsonProperty("matches")
    private List<ThreatMatch> threatMatches;
}
