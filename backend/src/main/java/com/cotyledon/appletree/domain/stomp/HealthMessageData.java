package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.domain.entity.redis.UnlockAppleRoom;
import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class HealthMessageData {

    private Double currentHealth;

    public static HealthMessageData of(UnlockAppleRoom room) {
        return new HealthMessageData(room.getCurrentHealth());
    }
}
