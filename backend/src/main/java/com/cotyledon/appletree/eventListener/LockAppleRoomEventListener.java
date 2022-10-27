package com.cotyledon.appletree.eventListener;

import com.cotyledon.appletree.domain.event.EnterLockAppleRoomEvent;
import com.cotyledon.appletree.domain.event.ReserveLockAppleRoomEvent;
import com.cotyledon.appletree.domain.stomp.BaseMessage;
import com.cotyledon.appletree.domain.stomp.DestinationBuilder;
import com.cotyledon.appletree.service.LockAppleRoomService;
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

    private final LockAppleRoomService lockAppleRoomService;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Async
    @EventListener
    public void onReserve(ReserveLockAppleRoomEvent event) {
        log.info("5초 기다리다 비어 있으면 지움 roomId: {}", event.getRoomId());

        try {
            Thread.sleep(5_000);
            log.info("5초 지남");
            lockAppleRoomService.deleteRoomIfEmpty(event.getRoomId());
        } catch (InterruptedException e) {
            log.error("에러 남", e);
            lockAppleRoomService.deleteRoomIfEmpty(event.getRoomId());
        }
    }

    @Async
    @EventListener
    public void onEnter(EnterLockAppleRoomEvent event) {
        log.info("입장 이벤트 들었음");

        simpMessagingTemplate.convertAndSend(DestinationBuilder.build("lock-apple-room", event.getRoomId()),
                BaseMessage.builder().command("join").data(event.getUid()).build());
    }
}
