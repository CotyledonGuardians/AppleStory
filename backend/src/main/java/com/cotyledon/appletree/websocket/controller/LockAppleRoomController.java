package com.cotyledon.appletree.websocket.controller;

import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.Member;
import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import com.cotyledon.appletree.service.LockAppleRoomLogService;
import com.cotyledon.appletree.service.RoomAppleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@MessageMapping("/lock-apple-room.{roomId}")
@RequiredArgsConstructor
@Slf4j
public class LockAppleRoomController {

    private final RoomAppleService roomAppleService;
    private final LockAppleRoomLogService lockAppleRoomLogService;
    private final StompUserDAO stompUserDAO;

    @MessageMapping(".adding")
    public void adding(@DestinationVariable String roomId, Message<Object> message) {

        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);

        String sid = stompHeaderAccessor.getSessionId();

        Optional<String> uid = stompUserDAO.get(sid);

        if (uid.isEmpty()) {
            log.warn("UID NOT FOUND");
            return;
        }

        lockAppleRoomLogService.logForAdding(roomId, uid.get());
    }

    @MessageMapping(".added")
    public void receiveContent(@DestinationVariable String roomId, Message<Content> message) {

        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);

        String sid = stompHeaderAccessor.getSessionId();

        Optional<String> uid = stompUserDAO.get(sid);

        if (uid.isEmpty()) {
            log.warn("UID NOT FOUND");
            return;
        }

        Content content = message.getPayload();

        log.info("Content : {}", content);

        if (!roomAppleService.validContent(content)) {
            log.warn("INVALID CONTENT");
            return;
        }

        String nickname = roomAppleService.getAnyAuthorFromContent(content);

        roomAppleService.addMemberAndContentToAppleByRoomId(roomId,
                Member.builder().uid(uid.get()).nickname(nickname).build(),
                content);
    }

    @MessageMapping(".cancelled")
    public void cancelled(@DestinationVariable String roomId, Message<Object> message) {

        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);

        String sid = stompHeaderAccessor.getSessionId();

        Optional<String> uid = stompUserDAO.get(sid);

        if (uid.isEmpty()) {
            log.warn("UID NOT FOUND");
            return;
        }

        lockAppleRoomLogService.logForCancelled(roomId, uid.get());
    }

    @MessageMapping(".submit")
    public void submit(@DestinationVariable String roomId, Message<Object> message) {
        log.info("제출됨");
    }
}
