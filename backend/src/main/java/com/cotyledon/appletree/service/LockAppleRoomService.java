package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.RoomDTO;
import com.cotyledon.appletree.domain.entity.redis.LockAppleRoom;

import java.util.Optional;

public interface LockAppleRoomService {

    RoomDTO reserveRoomAndGetRoomDTO(String hostUid, AppleDTO apple, long appleId);
    boolean deleteRoomIfEmpty(String roomId);
    boolean enterRoomAndSaveRoomUser(String uid, String roomId);
    boolean hasRoomByRoomId(String roomId);
    Optional<LockAppleRoom> findByRoomId(String roomId);
    boolean saveAppleIfHostByRoomAndUid(LockAppleRoom room, String uid);
    void setSavedToTrueByRoomId(String roomId);
}
