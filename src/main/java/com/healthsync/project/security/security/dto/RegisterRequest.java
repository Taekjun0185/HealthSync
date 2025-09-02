package com.healthsync.project.security.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
    @Email @NotBlank String email,
    @NotBlank @Size(min = 6, max = 50) String password,
    @NotBlank @Size(min = 2, max = 30) String name
) {}


