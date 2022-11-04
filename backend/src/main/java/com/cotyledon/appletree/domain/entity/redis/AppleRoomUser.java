package com.cotyledon.appletree.domain.entity.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "apple_room_user")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppleRoomUser {

    @Id
    private String uid;
    private String roomId;
    private Long appleId;
}
