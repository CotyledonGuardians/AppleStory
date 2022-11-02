package com.cotyledon.appletree.messenger;

public interface UnlockAppleRoomMessenger {

    void logForJoined(Long appleId, String uid);
    void logForLeft(Long appleId, String uid);
}
