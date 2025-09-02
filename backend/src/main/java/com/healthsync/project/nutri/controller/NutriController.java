package com.healthsync.project.nutri.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.healthsync.project.nutri.service.NutriService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/nutri")
public class NutriController {

    private final NutriService nutriService;

    @GetMapping("/{api}")
    public ResponseEntity<JsonNode> search(
            @PathVariable String api,
            @RequestParam Map<String, String> params
    ) throws Exception {
        JsonNode translatedData = nutriService.getTranslatedData(api, params);
        return ResponseEntity.ok(translatedData);
    }
}
