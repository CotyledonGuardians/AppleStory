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

    private Double totalHealth;
    private Integer appleSize;
    private Integer partySize;

    public static PartyMessageData withRoomAndPartySize(UnlockAppleRoom room, int partySize) {
        return PartyMessageData.builder()
                .totalHealth(room.getTotalHealth())
                .appleSize(room.getAppleSize())
                .partySize(partySize)
                .build();
    }
}
