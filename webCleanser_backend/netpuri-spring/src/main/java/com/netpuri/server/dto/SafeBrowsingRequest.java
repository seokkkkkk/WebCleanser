package com.netpuri.server.dto;

import lombok.Data;

@Data
public class SafeBrowsingRequest {
    private ClientInfo client;
    private ThreatInfo threatInfo;
}
