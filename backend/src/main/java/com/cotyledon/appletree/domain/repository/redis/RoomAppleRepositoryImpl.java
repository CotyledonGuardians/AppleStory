package com.cotyledon.appletree.domain.repository.redis;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class RoomAppleRepositoryImpl implements RoomAppleRepository {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void putApple(String roomId, AppleDTO apple) {
        redisTemplate.opsForHash().put("apple", roomId, apple);
    }

    @Override
    public Optional<AppleDTO> findAppleByRoomId(String roomId) {
        return Optional.ofNullable((AppleDTO) redisTemplate.opsForHash().get("apple", roomId));
    }

    @Override
    public void deleteAppleByRoomId(String roomId) {
        redisTemplate.opsForHash().delete("apple", roomId);
    }
}
