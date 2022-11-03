package com.cotyledon.appletree.eventListener;

import com.cotyledon.appletree.domain.event.HealthChangeEvent;
import com.cotyledon.appletree.domain.event.PartyChangeEvent;
import com.cotyledon.appletree.domain.stomp.BaseMessage;
import com.cotyledon.appletree.domain.stomp.DestinationBuilder;
import com.cotyledon.appletree.service.AppleService;
import com.cotyledon.appletree.service.UnlockAppleRoomService;
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
    private final AppleService appleService;

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

    @Async
    @EventListener
    public void onHealthChange(HealthChangeEvent event) {
        log.info("체력 이벤트 들었음");

        Double currentHealth = event.getHealthMessageData().getCurrentHealth();

        if (currentHealth.isNaN()) {
            log.warn("뭔가 잘못됨 event: {}", event);
            return;
        }

        Long appleId = event.getAppleId();
        String roomId = appleId.toString();

        if (currentHealth > 0d) { // 살았다면
            log.info("사과 아직 살아 있음");

            simpMessagingTemplate.convertAndSend(DestinationBuilder.build(PREFIX, roomId),
                    BaseMessage.withCommandAndData("onHealthChange", event.getHealthMessageData()));

            return;
        }

        // 죽었다면
        log.info("사과 죽음");

        // isCatch 를 true 로 저장
        // TODO: 밑에 주석 풀기
//        appleService.catchToTrue(appleId);

        simpMessagingTemplate.convertAndSend(DestinationBuilder.build(PREFIX, roomId),
                BaseMessage.withCommandAndData("onDie", roomId));
    }
}
