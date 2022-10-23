package com.cotyledon.appletree.common.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseAuthService {

    private final FirebaseAuth firebaseAuth;

    public String getEmailByUid(String uid) throws FirebaseAuthException {
        UserRecord user = firebaseAuth.getUser(uid);
        log.info("email: {}", user.getEmail());
        return user.getEmail();
    }
}
