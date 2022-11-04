package com.cotyledon.appletree.websocket.stompCommandHandler;

import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import com.cotyledon.appletree.service.AppleRoomUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DisconnectHandler implements StompCommandHandler {

    private final AppleRoomUserService appleRoomUserService;
    private final StompUserDAO stompUserDAO;

    @Override
    public void handle(StompHeaderAccessor stompHeaderAccessor) {

        log.info("DISCONNECT");

        String sid = stompHeaderAccessor.getSessionId();

        Optional<String> uid = stompUserDAO.get(sid);

        if (uid.isEmpty()) {
            // Disconnect 가 두 번 연속 되는 경우가 많음 그럴 경우 uid is empty
            return;
        }

        try {
            if (appleRoomUserService.removeRoomUserAndRoomIfEmptyByUid(uid.get())) {
                log.info("이 Disconnect 로 인해 멤버가 비었으므로 RoomUser, RoomGroup, Room 모두 제거");
            } else {
                log.info("Disconnect 된 사용자의 Room 이 비어있지 않으므로 RoomUser 만 제거");
            }
        } catch (Exception e) {
            log.warn("Disconnect 중 예외: uid: {}", uid.get());
            log.error("", e);
        }

        stompUserDAO.release(sid);
    }
}
