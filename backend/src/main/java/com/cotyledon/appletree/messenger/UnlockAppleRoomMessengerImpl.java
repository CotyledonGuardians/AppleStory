package com.cotyledon.appletree.messenger;

import com.cotyledon.appletree.domain.entity.redis.UnlockAppleRoom;
import com.cotyledon.appletree.domain.event.PartyChangeEvent;
import com.cotyledon.appletree.domain.repository.redis.UnlockAppleRoomGroupRepository;
import com.cotyledon.appletree.domain.repository.redis.UnlockAppleRoomRepository;
import com.cotyledon.appletree.domain.stomp.PartyMessageData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class UnlockAppleRoomMessengerImpl implements UnlockAppleRoomMessenger {

    private final ApplicationEventPublisher eventPublisher;
    private final UnlockAppleRoomRepository unlockAppleRoomRepository;
    private final UnlockAppleRoomGroupRepository unlockAppleRoomGroupRepository;

    @Override
    @Transactional
    public void logForJoined(Long appleId, String uid) {

        UnlockAppleRoom room = unlockAppleRoomRepository.findById(appleId).orElseThrow();

        Set<String> group = unlockAppleRoomGroupRepository.findGroupByAppleId(appleId).orElseThrow();
        group.add(uid);
        unlockAppleRoomGroupRepository.putGroup(appleId, group);

        PartyMessageData partyMessageData = PartyMessageData.withRoomAndPartySize(room, group.size());

        eventPublisher.publishEvent(PartyChangeEvent.builder()
                .appleId(appleId)
                .partyMessageData(partyMessageData)
                .build());
    }

    @Override
    @Transactional
    public void logForLeft(Long appleId, String uid) {
    }
}
