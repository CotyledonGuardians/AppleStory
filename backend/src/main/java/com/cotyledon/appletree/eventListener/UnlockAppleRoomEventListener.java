package com.cotyledon.appletree.eventListener;

import com.cotyledon.appletree.domain.event.PartyChangeEvent;
import com.cotyledon.appletree.domain.stomp.BaseMessage;
import com.cotyledon.appletree.domain.stomp.DestinationBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class UnlockAppleRoomEventListener {

    private static final String PREFIX = "unlock-apple-room";
    private final SimpMessagingTemplate simpMessagingTemplate;

    @Async
    @EventListener
    public void onPartyChange(PartyChangeEvent event) {
        log.info("파티 이벤트 들었음 약간의 딜레이 후 메시지 보냄");

        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            log.trace("", e);
        }

        simpMessagingTemplate.convertAndSend(DestinationBuilder.build(PREFIX, event.getAppleId().toString()),
                BaseMessage.withCommandAndData("onPartyChange", event.getPartyMessageData()));

        log.info("Message sent: {}", event.getPartyMessageData());
    }
}
