package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.configuration.WebSocketConfiguration;
import com.cotyledon.appletree.domain.enums.RoomType;
import com.cotyledon.appletree.exception.InvalidStompHeaderExceptionBuilder;
import lombok.*;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

@Getter
@Builder
@ToString
public class Send {

    private RoomType roomType;
    private String roomId;

    public static Send of(StompHeaderAccessor stompHeaderAccessor, InvalidStompHeaderExceptionBuilder exception) {
        String sid = stompHeaderAccessor.getSessionId();

        String destination = stompHeaderAccessor.getDestination();

        if (destination == null) {
            throw exception.withDefault();
        }

        RoomType roomType = destination.startsWith(WebSocketConfiguration.APPLICATION_DESTINATION_PREFIX + "/lock-apple-room") ?
                RoomType.LOCK :
                destination.startsWith(WebSocketConfiguration.APPLICATION_DESTINATION_PREFIX + "/unlock-apple-room") ?
                        RoomType.UNLOCK :
                        null;

        if (roomType == null) {
            throw exception.withDefault();
        }

        String roomId;
        try {
            roomId = destination.substring(destination.indexOf('.') + 1);
        } catch (IndexOutOfBoundsException e) {
            throw exception.withDefault();
        }
        if (roomId.isBlank()) {
            throw exception.withDefault();
        }

        return Send.builder()
                .roomType(roomType)
                .roomId(roomId)
                .build();
    }
}
