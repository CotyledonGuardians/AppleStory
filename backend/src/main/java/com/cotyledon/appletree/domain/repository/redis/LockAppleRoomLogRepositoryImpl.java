package com.cotyledon.appletree.domain.repository.redis;

import com.cotyledon.appletree.domain.stomp.ChangeMessageData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class LockAppleRoomLogRepositoryImpl implements LockAppleRoomLogRepository {

    private static final String KEY = "room_log";
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void putChangeMessageDataLog(String roomId, ChangeMessageData changeMessageData) {
        redisTemplate.opsForHash().put(KEY, roomId, changeMessageData);
    }

    @Override
    public Optional<ChangeMessageData> findLogByRoomId(String roomId) {
        return Optional.ofNullable((ChangeMessageData) redisTemplate.opsForHash().get(KEY, roomId));
    }

    @Override
    public void deleteLogByRoomId(String roomId) {
        redisTemplate.opsForHash().delete(KEY, roomId);
    }
}
