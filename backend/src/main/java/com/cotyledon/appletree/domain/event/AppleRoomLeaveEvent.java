package com.cotyledon.appletree.domain.event;

import lombok.*;

@Getter
@Builder
@ToString
public class AppleRoomLeaveEvent {

    private String roomId;
    private String uid;
}
