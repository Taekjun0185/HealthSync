package com.healthsync.project.security.security.auth;

import com.healthsync.project.account.user.domain.User;
import com.healthsync.project.account.user.repository.UserRepository;
import com.healthsync.project.security.security.dto.MeResponse;
import com.healthsync.project.security.security.dto.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        authService.register(req);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null) return ResponseEntity.ok().body(null);
        String email = authentication.getName();
        User user = userRepo.findByEmail(email).orElse(null);
        if (user == null) return ResponseEntity.ok().body(null);
        return ResponseEntity.ok(new MeResponse(user.getId(), user.getEmail(), user.getName(), user.getRoles()));
    }
}
