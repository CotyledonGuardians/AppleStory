package com.cotyledon.appletree.domain.event;

import com.cotyledon.appletree.domain.stomp.ChangeMessageData;
import lombok.*;

@Getter
@Builder
public class LockAppleRoomLogEvent {

    private String roomId;
    private ChangeMessageData changeMessageData;
}
