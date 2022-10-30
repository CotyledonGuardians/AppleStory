package com.cotyledon.appletree.domain.repository.redis;

import com.cotyledon.appletree.domain.dto.AppleDTO;

import java.util.Optional;

public interface RoomAppleRepository {

    void putApple(String roomId, AppleDTO apple);
    Optional<AppleDTO> findAppleByRoomId(String roomId);
    void deleteAppleByRoomId(String roomId);
}
