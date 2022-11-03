package com.cotyledon.appletree.domain.event;

import com.cotyledon.appletree.domain.stomp.PartyMessageData;
import lombok.*;

@Builder
@Getter
public class PartyChangeEvent {

    private Long appleId;
    private PartyMessageData partyMessageData;
}
