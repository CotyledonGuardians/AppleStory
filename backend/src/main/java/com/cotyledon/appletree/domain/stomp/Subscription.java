package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.configuration.WebSocketConfiguration;
import com.cotyledon.appletree.domain.enums.RoomType;
import com.cotyledon.appletree.exception.InvalidStompHeaderExceptionBuilder;
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

    public static Subscription of(StompHeaderAccessor stompHeaderAccessor, InvalidStompHeaderExceptionBuilder exception) {
        String sid = stompHeaderAccessor.getSessionId();

        String destination = stompHeaderAccessor.getDestination();

        if (destination == null) {
            throw exception.buildWithReleasing(sid);
        }

        String roomId;
        RoomType roomType;

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

        return Subscription.builder().roomType(roomType).roomId(roomId).build();
    }
}
