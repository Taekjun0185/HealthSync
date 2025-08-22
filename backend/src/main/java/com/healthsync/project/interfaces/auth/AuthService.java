package com.healthsync.project.interfaces.auth;

import com.healthsync.project.domain.user.User;
import com.healthsync.project.domain.user.UserRepository;
import com.healthsync.project.interfaces.auth.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public User register(RegisterRequest req) {
        userRepo.findByEmail(req.email()).ifPresent(u -> {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        });
        String hash = passwordEncoder.encode(req.password());
        User user = User.newLocal(req.email(), hash, req.name());
        return userRepo.save(user);
    }
}
