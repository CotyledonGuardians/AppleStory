package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.entity.redis.UnlockAppleRoom;

import java.util.Optional;

public interface UnlockAppleRoomService {

    Optional<UnlockAppleRoom> findById(Long appleId);
    void save(UnlockAppleRoom room);
    boolean enterRoomAndSaveRoomUser(String uid, Long appleId);
}
