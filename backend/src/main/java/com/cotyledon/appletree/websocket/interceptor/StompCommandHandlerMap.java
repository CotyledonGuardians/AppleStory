package com.cotyledon.appletree.websocket.interceptor;

import com.cotyledon.appletree.websocket.stompCommandHandler.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.stereotype.Component;

import java.util.HashMap;

import static org.springframework.messaging.simp.stomp.StompCommand.*;

@Component
public class StompCommandHandlerMap extends HashMap<StompCommand, StompCommandHandler> {

    @Autowired
    public StompCommandHandlerMap(
            EchoCommandHandler echoCommandHandler,
            ConnectHandler connectHandler,
            SubscribeHandler subscribeHandler,
            SendHandler sendHandler,
            DisconnectHandler disconnectHandler
    ) {
        put(UNSUBSCRIBE, echoCommandHandler);

        put(CONNECT, connectHandler);
        put(SUBSCRIBE, subscribeHandler);
        put(SEND, sendHandler);
        put(DISCONNECT, disconnectHandler);
    }
}
