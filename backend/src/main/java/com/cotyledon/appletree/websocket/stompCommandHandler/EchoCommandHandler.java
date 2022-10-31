package com.cotyledon.appletree.websocket.stompCommandHandler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class EchoCommandHandler implements StompCommandHandler {

    @Override
    public void handle(StompHeaderAccessor stompHeaderAccessor) {
        log.info("command: {}", stompHeaderAccessor.getCommand());
    }
}
