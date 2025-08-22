package com.healthsync.project.Infrastructure.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain security(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())       // 개발 단계 단순화
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()       // ★ 전부 공개: 로그인 화면 절대 안 뜸
                )
                .formLogin(form -> form.disable()); // 기본 로그인 폼 비활성화
        // .oauth2Login(oauth -> ...)       // ← 나중에 키 넣고 켤 거야

        return http.build();
    }
}
