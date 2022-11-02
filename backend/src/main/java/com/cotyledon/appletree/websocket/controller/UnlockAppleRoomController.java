package com.cotyledon.appletree.websocket.controller;

import com.cotyledon.appletree.service.StompUserService;
import com.cotyledon.appletree.service.UnlockAppleRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@MessageMapping("unlock-apple-room")
@RequiredArgsConstructor
@Slf4j
public class UnlockAppleRoomController {

    private final StompUserService stompUserService;
    private final UnlockAppleRoomService unlockAppleRoomService;

    @MessageMapping("{appleId}.attack")
    public void attack(@DestinationVariable Long appleId, Message<Object> message) {

        Optional<String> uid = stompUserService.getUidFromMessage(message);

        if (uid.isEmpty()) {
            log.warn("UID NOT FOUND");
            return;
        }

        unlockAppleRoomService.attack(appleId);
    }
}
