package com.cotyledon.appletree.domain.entity.redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "unlock_apple_room")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UnlockAppleRoom {

    @Id
    private Long appleId;
    private Double totalHealth;
    private Double currentHealth;
    private Integer appleSize;

    public void hitByPartySize(int partySize) {
        // TODO: 사과 체력 알고리즘 구현
        currentHealth -= 1d;
    }
}
