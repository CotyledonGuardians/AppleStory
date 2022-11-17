package com.cotyledon.mail.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseAuthServiceImpl implements FirebaseAuthService{
    private final FirebaseAuth firebaseAuth;

    @Override
    public void setClaimToAppleId(String uid, Long appleId) throws FirebaseAuthException {
        Map<String, Object> claims = new HashMap<>();
        claims.put("appleId", appleId.toString());
        firebaseAuth.setCustomUserClaims(uid, claims);
    }

    @Override
    public String getEmailByUid(String uid) throws FirebaseAuthException {
        UserRecord user = firebaseAuth.getUser(uid);
        log.info("email: {}", user.getEmail());
        return user.getEmail();
    }

    @Override
    public void auth(String idToken) throws FirebaseAuthException {
        firebaseAuth.verifyIdToken(idToken);
    }

    @Override
    public String getUidFromIdToken(String idToken) throws FirebaseAuthException {
        return firebaseAuth.verifyIdToken(idToken).getUid();
    }
}
