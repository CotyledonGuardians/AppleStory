package com.cotyledon.appletree.domain.repository.redis;

import com.cotyledon.appletree.domain.stomp.ChangeMessageData;

import java.util.Optional;

public interface LockAppleRoomLogRepository {

    void putChangeMessageDataLog(String roomId, ChangeMessageData changeMessageData);
    Optional<ChangeMessageData> findLogByRoomId(String roomId);
    void deleteLogByRoomId(String roomId);
}
