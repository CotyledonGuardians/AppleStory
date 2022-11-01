package com.cotyledon.appletree.websocket.stompCommandHandler;

import com.cotyledon.appletree.domain.stomp.Send;
import com.cotyledon.appletree.exception.InvalidStompMessageExceptionBuilder;
import com.cotyledon.appletree.service.LockAppleRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SendHandler implements StompCommandHandler {

    private final LockAppleRoomService lockAppleRoomService;
    private final InvalidStompMessageExceptionBuilder exception;

    @Override
    public void handle(StompHeaderAccessor stompHeaderAccessor) {

        // 이 라인을 통과하면 올바른 형식의 샌드 정보임이 보장됨 (유효성이 보장되지는 않음)
        Send send = Send.of(stompHeaderAccessor, exception);

        log.debug("send: {}", send);

        if (!valid(send)) {
            log.info("SEND 실패");

            throw exception.buildDefault();
        }
    }

    private boolean valid(Send send) {
        switch (send.getRoomType()) {
            case LOCK:
                return lockAppleRoomService.hasRoomByRoomId(send.getRoomId());
            case UNLOCK:
                // TODO: unlock 서비스 호출
                log.warn("여기 unlock 으로 바꿔야 함~~~~~");
                return lockAppleRoomService.hasRoomByRoomId(send.getRoomId());
            default:
                throw exception.buildDefault();
        }
    }
}
