package com.cotyledon.appletree.messenger;

public interface UnlockAppleRoomMessenger {

    void logForJoined(Long appleId);
    void logForLeft(Long appleId, String uid);
}
