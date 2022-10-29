package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.configuration.WebSocketConfiguration;
import com.cotyledon.appletree.domain.enums.RoomType;
import com.cotyledon.appletree.exception.InvalidStompHeaderExceptionBuilder;
import lombok.*;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

@Getter
@Builder
@ToString
public class Subscription {

    private RoomType roomType;
    private String roomId;

    public static Subscription of(StompHeaderAccessor stompHeaderAccessor, InvalidStompHeaderExceptionBuilder exception) {
        String sid = stompHeaderAccessor.getSessionId();

        String destination = stompHeaderAccessor.getDestination();

        if (destination == null) {
            throw exception.withReleasing(sid);
        }

        RoomType roomType = destination.startsWith(WebSocketConfiguration.BROKER_DESTINATION_PREFIX + "/lock-apple-room") ?
                RoomType.LOCK :
                destination.startsWith(WebSocketConfiguration.BROKER_DESTINATION_PREFIX + "/unlock-apple-room") ?
                        RoomType.UNLOCK :
                        null;

        if (roomType == null) {
            throw exception.withReleasing(sid);
        }

        String roomId;
        try {
            roomId = destination.substring(destination.indexOf('.') + 1);
        } catch (IndexOutOfBoundsException e) {
            throw exception.withReleasing(sid);
        }
        if (roomId.isBlank()) {
            throw exception.withReleasing(sid);
        }

        return Subscription.builder()
                .roomType(roomType)
                .roomId(roomId)
                .build();
    }
}
