package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.configuration.WebSocketConfiguration;
import com.cotyledon.appletree.domain.enums.RoomType;
import com.cotyledon.appletree.exception.InvalidStompMessageExceptionBuilder;
import lombok.*;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

@Getter
@Builder
@ToString
public class Send {

    private RoomType roomType;
    private String roomId;
    private Long appleId;

    public static Send of(StompHeaderAccessor stompHeaderAccessor, InvalidStompMessageExceptionBuilder exception) {
        String destination = stompHeaderAccessor.getDestination();

        if (destination == null) {
            throw exception.buildDefault();
        }

        RoomType roomType;
        String roomId;
        long appleId = -1L;

        try {
            String[] strings = destination.split("\\.");

            roomId = strings[1];

            roomType = (WebSocketConfiguration.APPLICATION_DESTINATION_PREFIX + "/lock-apple-room").equals(strings[0]) ?
                    RoomType.LOCK :
                    (WebSocketConfiguration.APPLICATION_DESTINATION_PREFIX + "/unlock-apple-room").equals(strings[0]) ?
                            RoomType.UNLOCK :
                            null;
        } catch (RuntimeException e) {
            throw exception.buildDefault();
        }
        if (roomType == null || roomId.isBlank()) {
            throw exception.buildDefault();
        }

        switch (roomType) {
            case LOCK:
                roomId = roomId.toUpperCase();
                break;
            case UNLOCK:
                try {
                    appleId = Long.parseLong(roomId);
                } catch (NumberFormatException e) {
                    throw exception.buildDefault();
                }
                break;
        }

        return Send.builder().roomType(roomType).roomId(roomId).appleId(appleId).build();
    }
}
