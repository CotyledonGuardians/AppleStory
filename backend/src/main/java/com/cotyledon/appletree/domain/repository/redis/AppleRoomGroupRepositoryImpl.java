package com.cotyledon.appletree.domain.repository.redis;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
@RequiredArgsConstructor
@Slf4j
public class AppleRoomGroupRepositoryImpl implements AppleRoomGroupRepository {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void putGroup(String roomId, Set<String> group) {
        redisTemplate.opsForHash().put("group", roomId, group);
    }

    @Override
    public Optional<Set<String>> findGroupByRoomId(String roomId) {
        return Optional.ofNullable((Set<String>) redisTemplate.opsForHash().get("group", roomId));
    }

    @Override
    public void deleteGroupByRoomId(String roomId) {
        redisTemplate.opsForHash().delete("group", roomId);
    }
}
