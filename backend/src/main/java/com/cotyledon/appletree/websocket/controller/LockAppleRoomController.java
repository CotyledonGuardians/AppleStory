package com.cotyledon.appletree.websocket.controller;

import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import com.cotyledon.appletree.domain.stomp.BaseMessage;
import com.cotyledon.appletree.domain.stomp.DestinationBuilder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class LockAppleRoomController {

    @Getter
    @Setter
    @ToString
    public static class SomeData {
        public String uid;
        public String item;
    }

    @Getter
    @Setter
    @ToString
    public static class SomeType {
        public String data;
    }

    private final StompUserDAO stompUserDAO;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/lock-apple-room.{roomId}")
    public void receive(@DestinationVariable String roomId, Message<SomeType> message) {

        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);

        String sid = stompHeaderAccessor.getSessionId();

        Optional<String> uid = stompUserDAO.get(sid);

        if (uid.isEmpty()) {
            log.warn("뭔가 잘못됨");
            return;
        }

        String data = message.getPayload().getData();

        SomeData someData = new SomeData();
        someData.setUid(uid.get());
        someData.setItem(data);

        simpMessagingTemplate.convertAndSend(DestinationBuilder.build("lock-apple-room", roomId),
                BaseMessage.withCommandAndData("add", someData));
    }
}
