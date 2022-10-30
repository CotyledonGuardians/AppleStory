package com.cotyledon.appletree.domain.event;

import lombok.*;

@Getter
@Builder
public class ReserveLockAppleRoomEvent {

    private String roomId;
}
