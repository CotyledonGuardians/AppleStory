package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.configuration.WebSocketConfiguration;
import com.cotyledon.appletree.domain.enums.RoomType;
import com.cotyledon.appletree.exception.InvalidStompMessageExceptionBuilder;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

@Getter
@Builder
@ToString
public class Subscription {

    private RoomType roomType;
    private String roomId;
    private Long appleId;

    public static Subscription of(StompHeaderAccessor stompHeaderAccessor, InvalidStompMessageExceptionBuilder exception) {
        String sid = stompHeaderAccessor.getSessionId();

        String destination = stompHeaderAccessor.getDestination();

        if (destination == null) {
            throw exception.buildWithReleasing(sid);
        }

        RoomType roomType;
        String roomId;
        Long appleId = null;

        try {
            String[] strings = destination.split("\\.");

            roomId = strings[1];

            roomType = (WebSocketConfiguration.BROKER_DESTINATION_PREFIX + "/lock-apple-room").equals(strings[0]) ?
                    RoomType.LOCK :
                    (WebSocketConfiguration.BROKER_DESTINATION_PREFIX + "/unlock-apple-room").equals(strings[0]) ?
                            RoomType.UNLOCK :
                            null;
        } catch (RuntimeException e) {
            throw exception.buildWithReleasing(sid);
        }
        if (roomType == null || roomId.isBlank()) {
            throw exception.buildWithReleasing(sid);
        }

        if (roomType == RoomType.UNLOCK) {
            try {
                appleId = Long.parseLong(roomId);
            } catch (NumberFormatException e) {
                throw exception.buildWithReleasing(sid);
            }
        }

        return Subscription.builder().roomType(roomType).roomId(roomId).appleId(appleId).build();
    }
}
