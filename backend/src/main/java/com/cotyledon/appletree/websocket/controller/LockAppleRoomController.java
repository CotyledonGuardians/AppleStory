package com.cotyledon.appletree.websocket.controller;

import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.Member;
import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import com.cotyledon.appletree.domain.stomp.AddMessageData;
import com.cotyledon.appletree.domain.stomp.BaseMessage;
import com.cotyledon.appletree.domain.stomp.DestinationBuilder;
import com.cotyledon.appletree.service.LockAppleRoomService;
import com.cotyledon.appletree.service.RoomAppleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class LockAppleRoomController {

    private final RoomAppleService roomAppleService;
    private final LockAppleRoomService lockAppleRoomService;
    private final StompUserDAO stompUserDAO;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/lock-apple-room.{roomId}")
    public void receive(@DestinationVariable String roomId, Message<Content> message) {

        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);

        String sid = stompHeaderAccessor.getSessionId();

        Optional<String> uid = stompUserDAO.get(sid);

        if (uid.isEmpty()) {
            log.warn("뭔가 잘못됨");
            return;
        }

        Content content = message.getPayload();

        log.info("Content : {}", content);

        String nickname = lockAppleRoomService.getNicknameFromContent(content);

        roomAppleService.addMemberAndContentToAppleByRoomId(roomId,
                Member.builder().uid(uid.get()).nickname(nickname).build(),
                content);

        simpMessagingTemplate.convertAndSend(DestinationBuilder.build("lock-apple-room", roomId),
                BaseMessage.withCommandAndData("add", AddMessageData.withNickname(nickname)));
    }

    // TODO: 사과 생성 호출
}
