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
public class UnlockAppleRoomGroupRepositoryImpl implements UnlockAppleRoomGroupRepository {

    private static final String KEY = "unlock_group";
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void putGroup(Long appleId, Set<String> group) {
        redisTemplate.opsForHash().put(KEY, appleId, group);
    }

    @SuppressWarnings("unchecked")
    @Override
    public Optional<Set<String>> findGroupByAppleId(Long appleId) {
        return Optional.ofNullable((Set<String>) redisTemplate.opsForHash().get(KEY, appleId));
    }

    @Override
    public void deleteGroupByRoomId(Long appleId) {
        redisTemplate.opsForHash().delete(KEY, appleId);
    }
}
