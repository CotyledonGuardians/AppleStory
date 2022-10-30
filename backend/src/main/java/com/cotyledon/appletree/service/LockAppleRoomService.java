package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.RoomDTO;

public interface LockAppleRoomService {

    RoomDTO reserveRoomAndGetRoomDTO(String hostUid, AppleDTO apple);
    void deleteRoomIfEmpty(String roomId);
    boolean enterRoomAndSaveRoomUser(String uid, String roomId);
    boolean hasRoomByRoomId(String roomId);
}
