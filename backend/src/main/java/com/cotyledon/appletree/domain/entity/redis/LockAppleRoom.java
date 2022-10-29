package com.cotyledon.appletree.domain.entity.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "lock_apple_room")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LockAppleRoom {

    @Id
    private String id;
    private String hostUid;
}
