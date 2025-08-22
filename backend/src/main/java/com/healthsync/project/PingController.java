package com.healthsync.project;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 서버 살아있나 TEST  localhost:8080/ping 진입시 "pong" 나오면 정상
 */
@RestController
public class PingController {
    @GetMapping("/ping")
    public String ping() { return "pong"; }
}
