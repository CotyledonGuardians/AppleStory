package com.cotyledon.appletree.domain.repository.redis;

import com.cotyledon.appletree.domain.entity.redis.RoomApple;

import java.util.Optional;

public interface RoomAppleRepository {

    void putRoomApple(String roomId, RoomApple apple);
    Optional<RoomApple> findRoomAppleByRoomId(String roomId);
    void deleteRoomAppleByRoomId(String roomId);
}
