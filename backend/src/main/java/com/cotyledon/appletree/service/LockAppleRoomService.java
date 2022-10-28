package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.RoomDTO;

public interface LockAppleRoomService {

    RoomDTO makeRoomAndGet();
    void deleteRoomIfEmpty(String roomId);
    boolean enterRoomAndSaveRoomUser(String uid, String roomId);
    boolean hasRoomByRoomId(String roomId);
}
