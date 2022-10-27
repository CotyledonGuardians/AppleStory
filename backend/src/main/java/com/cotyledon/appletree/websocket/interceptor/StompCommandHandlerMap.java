package com.cotyledon.appletree.websocket.interceptor;

import com.cotyledon.appletree.websocket.stompCommandHandler.StompCommandHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class StompCommandHandlerMap extends HashMap<StompCommand, StompCommandHandler> {

    @Autowired
    public StompCommandHandlerMap() {
    }
}
