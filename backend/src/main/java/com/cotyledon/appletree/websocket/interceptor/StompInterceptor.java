package com.cotyledon.appletree.websocket.interceptor;

import com.cotyledon.appletree.websocket.stompCommandHandler.StompCommandHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class StompInterceptor implements ChannelInterceptor {

    private final Map<StompCommand, StompCommandHandler> stompCommandHandlerMap;
    private final StompCommandHandler defaultHandler = header -> {};

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);
        StompCommand stompCommand = stompHeaderAccessor.getCommand();

        stompCommandHandlerMap.getOrDefault(stompCommand, defaultHandler)
                .handle(stompHeaderAccessor);

        return message;
    }
}
