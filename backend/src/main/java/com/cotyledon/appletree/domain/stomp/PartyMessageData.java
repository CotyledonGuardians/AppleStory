package com.cotyledon.appletree.domain.stomp;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PartyMessageData {

    private Double totalHealth;
    private Double currentHealth;
    private Integer appleSize;
    private Integer partySize;

    public static PartyMessageData of() {
        // TODO: 구현
        return PartyMessageData.builder().build();
    }
}
