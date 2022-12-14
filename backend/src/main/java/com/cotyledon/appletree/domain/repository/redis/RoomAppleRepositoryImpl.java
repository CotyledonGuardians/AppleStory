package com.cotyledon.appletree.domain.repository.redis;

import com.cotyledon.appletree.domain.entity.redis.RoomApple;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class RoomAppleRepositoryImpl implements RoomAppleRepository {

    private static final String KEY = "room_apple";
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void putRoomApple(String roomId, RoomApple apple) {
        redisTemplate.opsForHash().put(KEY, roomId, apple);
    }

    @Override
    public Optional<RoomApple> findRoomAppleByRoomId(String roomId) {
        return Optional.ofNullable((RoomApple) redisTemplate.opsForHash().get(KEY, roomId));
    }

    @Override
    public void deleteRoomAppleByRoomId(String roomId) {
        redisTemplate.opsForHash().delete(KEY, roomId);
    }
}
