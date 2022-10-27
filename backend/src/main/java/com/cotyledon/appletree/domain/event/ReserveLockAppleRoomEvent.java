package com.cotyledon.appletree.domain.event;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReserveLockAppleRoomEvent {

    private String roomId;
}
