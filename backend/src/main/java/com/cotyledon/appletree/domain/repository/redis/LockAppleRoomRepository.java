package com.cotyledon.appletree.domain.repository.redis;

import com.cotyledon.appletree.domain.entity.redis.LockAppleRoom;
import org.springframework.data.repository.CrudRepository;

public interface LockAppleRoomRepository extends CrudRepository<LockAppleRoom, String> {
}
