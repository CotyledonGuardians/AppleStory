package com.cotyledon.appletree.websocket.stompCommandHandler;

import com.cotyledon.appletree.service.FirebaseAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class ConnectHandler implements StompCommandHandler {

    private final FirebaseAuthService firebaseAuthService;

    @Override
    public void handle(StompHeaderAccessor stompHeaderAccessor) {
        auth(stompHeaderAccessor);
    }

    private void auth(StompHeaderAccessor stompHeaderAccessor) {
        String idToken = stompHeaderAccessor.getFirstNativeHeader("accessToken");

        if (idToken == null || idToken.isBlank()) {
            throw new IllegalArgumentException("Unauthorized");
        }

        try {
            firebaseAuthService.auth(idToken);
        } catch (Exception e) {
            throw new IllegalArgumentException("Unauthorized");
        }
    }
}
