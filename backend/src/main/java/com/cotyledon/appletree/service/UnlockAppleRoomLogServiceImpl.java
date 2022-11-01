package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.event.LockAppleRoomLogEvent;
import com.cotyledon.appletree.domain.repository.redis.LockAppleRoomLogRepository;
import com.cotyledon.appletree.domain.repository.redis.RoomAppleRepository;
import com.cotyledon.appletree.domain.stomp.ChangeMessageData;
import com.cotyledon.appletree.domain.stomp.LockAppleRoomUserStatus;
import com.cotyledon.appletree.domain.stomp.PartyMessageData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UnlockAppleRoomLogServiceImpl implements UnlockAppleRoomLogService {

    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional
    public void logForJoined(Long appleId, String uid) {

        // TODO: 구현
        PartyMessageData partyMessageData = PartyMessageData.builder().build();

//        List<LockAppleRoomUserStatus> statuses = changeMessageData.getStatuses();
//        Map<String, Integer> uidToIndex = changeMessageData.getUidToIndex();
//
//        uidToIndex.computeIfAbsent(uid, _uid -> {
//            statuses.add(LockAppleRoomUserStatus.joined());
//            return statuses.size() - 1;
//        });
//
//        uidToIndex.computeIfPresent(uid, (_uid, index) -> {
//            statuses.set(index, LockAppleRoomUserStatus.joined());
//            return index;
//        });
//
//        lockAppleRoomLogRepository.putChangeMessageDataLog(roomId, changeMessageData);
//
//        eventPublisher.publishEvent(LockAppleRoomLogEvent.builder()
//                .roomId(roomId)
//                .changeMessageData(changeMessageData)
//                .build());
    }

    @Override
    @Transactional
    public void logForLeft(Long appleId, String uid) {
    }
}
