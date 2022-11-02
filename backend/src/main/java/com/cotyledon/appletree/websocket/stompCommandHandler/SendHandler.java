package com.cotyledon.appletree.websocket.stompCommandHandler;

import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import com.cotyledon.appletree.domain.stomp.Send;
import com.cotyledon.appletree.exception.InvalidStompMessageExceptionBuilder;
import com.cotyledon.appletree.service.LockAppleRoomService;
import com.cotyledon.appletree.service.UnlockAppleRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SendHandler implements StompCommandHandler {

    private final StompUserDAO stompUserDAO;
    private final LockAppleRoomService lockAppleRoomService;
    private final UnlockAppleRoomService unlockAppleRoomService;
    private final InvalidStompMessageExceptionBuilder exception;

    @Override
    public void handle(StompHeaderAccessor stompHeaderAccessor) {

        String uid = stompUserDAO.get(stompHeaderAccessor.getSessionId()).orElseThrow(exception::buildDefault);

        // 이 라인을 통과하면 올바른 형식의 샌드 정보임이 보장됨 (유효성이 보장되지는 않음)
        Send send = Send.of(stompHeaderAccessor, exception);

        log.debug("send: {}", send);

        if (!valid(send, uid)) {
            log.info("SEND 실패");

            throw exception.buildDefault();
        }
    }

    private boolean valid(Send send, String uid) {
        switch (send.getRoomType()) {
            case LOCK:
                String roomId = send.getRoomId();
                return lockAppleRoomService.hasRoomByRoomId(roomId) &&
                        lockAppleRoomService.isUserInRoom(uid, roomId);
            case UNLOCK:
                Long appleId = send.getAppleId();
                return unlockAppleRoomService.hasRoomByAppleId(appleId) &&
                        unlockAppleRoomService.isUserInRoom(uid, appleId);
            default:
                throw exception.buildDefault();
        }
    }
}
