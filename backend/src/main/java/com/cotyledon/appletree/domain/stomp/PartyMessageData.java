package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.domain.entity.redis.UnlockAppleRoom;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PartyMessageData {

    private Integer appleSize;
    private Integer partySize;
    private Double totalHealth;
    private Double currentHealth;

    public static PartyMessageData withRoomAndPartySize(UnlockAppleRoom room, int partySize) {
        return PartyMessageData.builder()
                .appleSize(room.getAppleSize())
                .partySize(partySize)
                .totalHealth(room.getTotalHealth())
                .currentHealth(room.getCurrentHealth())
                .build();
    }
}
