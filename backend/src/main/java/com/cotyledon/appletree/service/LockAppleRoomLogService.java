package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.Member;

public interface LockAppleRoomLogService {

    void logForJoined(String roomId, String uid);
    void logForAdding(String roomId, String uid);
    void logForAdded(String roomId, Member member, Content content);
    void logForCancelled(String roomId, String uid);
    void logForLeft(String roomId, String uid);
}
