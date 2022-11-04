package com.cotyledon.appletree.notifier;

import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.Member;
import com.cotyledon.appletree.domain.stomp.ChangeMessageData;

public interface LockAppleRoomNotifier {

    void notifyForJoined(String roomId, String uid, ChangeMessageData defaultMessage);
    void notifyForAdding(String roomId, String uid);
    void notifyForAdded(String roomId, Member member, Content content);
    void notifyForCancelled(String roomId, String uid);
    void notifyForLeft(String roomId, String uid);
}
