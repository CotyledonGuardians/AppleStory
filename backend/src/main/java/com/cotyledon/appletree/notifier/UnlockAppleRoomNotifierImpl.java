package com.cotyledon.appletree.notifier;

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
public class UnlockAppleRoomNotifierImpl implements UnlockAppleRoomNotifier {

    private final ApplicationEventPublisher eventPublisher;
    private final UnlockAppleRoomRepository unlockAppleRoomRepository;
    private final UnlockAppleRoomGroupRepository unlockAppleRoomGroupRepository;

    @Override
    @Transactional
    public void notifyPartyChange(Long appleId) {

        UnlockAppleRoom room = unlockAppleRoomRepository.findById(appleId).orElseThrow();

        Set<String> group = unlockAppleRoomGroupRepository.findGroupByAppleId(appleId).orElseThrow();

        PartyMessageData partyMessageData = PartyMessageData.withRoomAndPartySize(room, group.size());

        eventPublisher.publishEvent(PartyChangeEvent.builder()
                .appleId(appleId)
                .partyMessageData(partyMessageData)
                .build());
    }
}
