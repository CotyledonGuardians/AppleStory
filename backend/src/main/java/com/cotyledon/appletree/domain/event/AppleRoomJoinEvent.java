package com.cotyledon.appletree.domain.event;

import lombok.*;

@Getter
@Builder
@ToString
public class AppleRoomJoinEvent {

    private String roomId;
    private String uid;
}
