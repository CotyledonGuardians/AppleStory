package com.cotyledon.mail.service;

import com.google.firebase.auth.FirebaseAuthException;

public interface FirebaseAuthService {
    void setClaimToAppleId(String uid, Long appleId) throws FirebaseAuthException;
    String getEmailByUid(String uid) throws FirebaseAuthException;
    void auth(String idToken) throws FirebaseAuthException;
    String getUidFromIdToken(String idToken) throws FirebaseAuthException;
}

