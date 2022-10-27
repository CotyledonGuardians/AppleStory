package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.service.FirebaseAuthService;
import com.cotyledon.appletree.domain.repository.AppleRepository;
import com.google.firebase.auth.FirebaseAuthException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/test")
@RequiredArgsConstructor
@Slf4j
public class TestController {

    private final FirebaseAuthService firebaseAuthService;
    private final AppleRepository appleRepository;

    @GetMapping("/auth")
    public ResponseEntity<?> authTest(Principal principal) {
        return ResponseEntity.ok(principal.getName());
    }

    @GetMapping("/email")
    public ResponseEntity<?> email(Principal principal) throws FirebaseAuthException {
        return ResponseEntity.ok(firebaseAuthService.getEmailByUid(principal.getName()));
    }

    @GetMapping("/deploy")
    public ResponseEntity<?> deploy() {
        return ResponseEntity.ok(appleRepository.findById(0L).isEmpty());
    }
}
