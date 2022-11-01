package com.cotyledon.appletree.service;

public interface UnlockAppleRoomLogService {

    void logForJoined(Long appleId, String uid);
    void logForLeft(Long appleId, String uid);
}
