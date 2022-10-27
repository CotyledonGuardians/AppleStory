package com.cotyledon.appletree.service;

import com.google.firebase.auth.FirebaseAuthException;

public interface FirebaseAuthService {
    void setClaimToAppleId(String uid, Long appleId) throws FirebaseAuthException;
    String getEmailByUid(String uid) throws FirebaseAuthException;
}
