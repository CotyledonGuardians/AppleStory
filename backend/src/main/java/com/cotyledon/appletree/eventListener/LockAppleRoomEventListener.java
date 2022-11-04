package com.cotyledon.appletree.eventListener;

import com.cotyledon.appletree.domain.event.AppleSaveEvent;
import com.cotyledon.appletree.domain.event.LockAppleRoomLogEvent;
import com.cotyledon.appletree.domain.event.ReserveLockAppleRoomEvent;
import com.cotyledon.appletree.domain.stomp.BaseMessage;
import com.cotyledon.appletree.domain.stomp.DestinationBuilder;
import com.cotyledon.appletree.service.LockAppleRoomService;
import com.cotyledon.appletree.service.MultiAppleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class LockAppleRoomEventListener {

    private static final String PREFIX = "lock-apple-room";
    private final LockAppleRoomService lockAppleRoomService;
    private final MultiAppleService multiAppleService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Async
    @EventListener
    public void onReserve(ReserveLockAppleRoomEvent event) {
        log.info("5초 기다리다 비어 있으면 지움");

        try {
            Thread.sleep(5_000);
            log.info("5초 지남");
        } catch (InterruptedException e) {
            log.trace("", e);
        }

        if (lockAppleRoomService.deleteRoomIfEmpty(event.getRoomId())) {
            multiAppleService.deleteAppleIfEmpty(event.getAppleId());
            log.info("비어 있어서 지웠음");
        }
    }

    @Async
    @EventListener
    public void onChange(LockAppleRoomLogEvent event) {
        log.info("Change 이벤트 들었음 약간의 딜레이 후 메시지 보냄");

        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            log.trace("", e);
        }

        simpMessagingTemplate.convertAndSend(DestinationBuilder.build(PREFIX, event.getRoomId()),
                BaseMessage.withCommandAndData("onChange", event.getChangeMessageData()));

        log.info("Message sent: {}", event.getChangeMessageData());
    }

    @Async
    @EventListener
    public void onSave(AppleSaveEvent event) {
        log.info("사과 저장 이벤트 들었음 룸에 반영");

        lockAppleRoomService.setSavedToTrueByRoomId(event.getRoomId());

        simpMessagingTemplate.convertAndSend(DestinationBuilder.build(PREFIX, event.getRoomId()),
                BaseMessage.withCommandAndData("onSave", event.getAppleId()));

        log.info("사과 저장 완료 메시지 전송됨 appleId: {}", event.getAppleId());
    }
}
