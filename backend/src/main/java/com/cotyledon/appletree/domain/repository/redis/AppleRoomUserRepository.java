package com.cotyledon.appletree.domain.repository.redis;

import com.cotyledon.appletree.domain.entity.redis.AppleRoomUser;
import org.springframework.data.repository.CrudRepository;

public interface AppleRoomUserRepository extends CrudRepository<AppleRoomUser, String> {
}
