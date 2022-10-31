package com.cotyledon.appletree.websocket.controller;

import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.Member;
import com.cotyledon.appletree.domain.entity.redis.LockAppleRoom;
import com.cotyledon.appletree.service.LockAppleRoomLogService;
import com.cotyledon.appletree.service.LockAppleRoomService;
import com.cotyledon.appletree.service.RoomAppleService;
import com.cotyledon.appletree.service.StompUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@MessageMapping("lock-apple-room")
@RequiredArgsConstructor
@Slf4j
public class LockAppleRoomController {

    private final RoomAppleService roomAppleService;
    private final LockAppleRoomService lockAppleRoomService;
    private final LockAppleRoomLogService lockAppleRoomLogService;
    private final StompUserService stompUserService;

    @MessageMapping("{roomId}.adding")
    public void adding(@DestinationVariable String roomId, Message<Object> message) {

        Optional<String> uid = stompUserService.getUidFromMessage(message);

        if (uid.isEmpty()) {
            log.warn("UID NOT FOUND");
            return;
        }

        lockAppleRoomLogService.logForAdding(roomId, uid.get());
    }

    // TODO: 같은 멤버가 중복으로 올릴 수 있는 이슈
    @MessageMapping("{roomId}.added")
    public void receiveContent(@DestinationVariable String roomId, Message<Content> message) {

        Optional<String> uid = stompUserService.getUidFromMessage(message);

        if (uid.isEmpty()) {
            log.warn("UID NOT FOUND");
            return;
        }

        Content content = message.getPayload();

        log.info("Content : {}", content);

        if (!roomAppleService.validateAndCleanContent(content)) {
            log.info("INVALID CONTENT");
            return;
        }

        String nickname = roomAppleService.getAnyAuthorFromContent(content);

        roomAppleService.addMemberAndContentToAppleByRoomId(roomId,
                Member.builder().uid(uid.get()).nickname(nickname).build(),
                content);
    }

    @MessageMapping("{roomId}.cancelled")
    public void cancelled(@DestinationVariable String roomId, Message<Object> message) {

        Optional<String> uid = stompUserService.getUidFromMessage(message);

        if (uid.isEmpty()) {
            log.warn("UID NOT FOUND");
            return;
        }

        lockAppleRoomLogService.logForCancelled(roomId, uid.get());
    }

    @MessageMapping("{roomId}.submit")
    public void submit(@DestinationVariable String roomId, Message<Object> message) {

        Optional<LockAppleRoom> room = lockAppleRoomService.findByRoomId(roomId);

        if (room.isEmpty()) {
            log.info("NO SUCH ROOM");
            return;
        }

        Optional<String> uid = stompUserService.getUidFromMessage(message);

        if (uid.isEmpty()) {
            log.warn("UID NOT FOUND");
            return;
        }

        if (!lockAppleRoomService.saveAppleIfHostByRoomAndUid(room.get(), uid.get())) {
            return;
        }

        log.info("제출됨");
    }
}
