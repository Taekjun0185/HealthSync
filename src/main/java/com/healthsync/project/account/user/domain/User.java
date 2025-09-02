package com.healthsync.project.account.user.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "users", indexes = {
        @Index(name = "ux_users_email", columnList = "email", unique = true)
})

public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash")
    private String passwordHash;  //소셜 유저이면 null 허용

    @Column(name = "name")
    private String name;

    @Column(name = "roles", nullable = false)
    private String roles = "USER";

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createAt;

    @PrePersist
    void prePersist() {
        if (createAt == null) createAt = LocalDateTime.now();
    }

    //정적 팩토리 (세터대신 의도확인)
    public static User newLocal(String email, String encodedPw, String name) {
        User u = new User();
        u.email = email;
        u.passwordHash = encodedPw;
        u.name = name;
        return u;
    }
//
//    public static User newSocial(String email, String name) {
//        User u = new User();
//        u.email = email;
//        u.passwordHash = null;
//        u.name = name;
//        return u;
//    }
}
