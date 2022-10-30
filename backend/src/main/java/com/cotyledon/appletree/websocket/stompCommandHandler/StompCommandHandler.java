package com.cotyledon.appletree.websocket.stompCommandHandler;

import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

public interface StompCommandHandler {

    void handle(StompHeaderAccessor stompHeaderAccessor);
}
