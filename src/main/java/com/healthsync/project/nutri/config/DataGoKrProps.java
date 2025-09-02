package com.healthsync.project.nutri.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.HashMap;
import java.util.Map;

@Data
@ConfigurationProperties(prefix = "data-go-kr")
public class DataGoKrProps {

    private String baseUrl;
    private String serviceKey; // 공통 키
    private Map<String, String> defaultParams = new HashMap<>();
    private Map<String, Api> apis = new HashMap<>();

    @Data
    public static class Api {
        private String path;
        private String serviceKey; // 있으면 개별 override
    }
}