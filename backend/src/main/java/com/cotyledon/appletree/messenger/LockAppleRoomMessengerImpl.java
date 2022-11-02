package com.cotyledon.appletree.messenger;

import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.Member;
import com.cotyledon.appletree.domain.entity.redis.RoomApple;
import com.cotyledon.appletree.domain.event.LockAppleRoomLogEvent;
import com.cotyledon.appletree.domain.repository.redis.LockAppleRoomLogRepository;
import com.cotyledon.appletree.domain.repository.redis.RoomAppleRepository;
import com.cotyledon.appletree.domain.stomp.ChangeMessageData;
import com.cotyledon.appletree.domain.enums.LockAppleRoomUserStage;
import com.cotyledon.appletree.domain.stomp.LockAppleRoomUserStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class LockAppleRoomMessengerImpl implements LockAppleRoomMessenger {

    private final LockAppleRoomLogRepository lockAppleRoomLogRepository;
    private final RoomAppleRepository roomAppleRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional
    public void logForJoined(String roomId, String uid) {

        ChangeMessageData changeMessageData = lockAppleRoomLogRepository
                .findLogByRoomId(roomId).orElse(ChangeMessageData.newDefault());

        List<LockAppleRoomUserStatus> statuses = changeMessageData.getStatuses();
        Map<String, Integer> uidToIndex = changeMessageData.getUidToIndex();

        uidToIndex.computeIfAbsent(uid, _uid -> {
            statuses.add(LockAppleRoomUserStatus.joined());
            return statuses.size() - 1;
        });

        uidToIndex.computeIfPresent(uid, (_uid, index) -> {
            statuses.set(index, LockAppleRoomUserStatus.joined());
            return index;
        });

        lockAppleRoomLogRepository.putChangeMessageDataLog(roomId, changeMessageData);

        eventPublisher.publishEvent(LockAppleRoomLogEvent.builder()
                .roomId(roomId)
                .changeMessageData(changeMessageData)
                .build());
    }

    @Override
    @Transactional
    public void logForAdding(String roomId, String uid) {

        ChangeMessageData changeMessageData = lockAppleRoomLogRepository
                .findLogByRoomId(roomId).orElse(ChangeMessageData.newDefault());

        List<LockAppleRoomUserStatus> statuses = changeMessageData.getStatuses();
        Map<String, Integer> uidToIndex = changeMessageData.getUidToIndex();

        uidToIndex.computeIfAbsent(uid, _uid -> {
            statuses.add(LockAppleRoomUserStatus.adding());
            return statuses.size() - 1;
        });

        uidToIndex.computeIfPresent(uid, (_uid, index) -> {
            statuses.set(index, LockAppleRoomUserStatus.adding());
            return index;
        });

        lockAppleRoomLogRepository.putChangeMessageDataLog(roomId, changeMessageData);

        eventPublisher.publishEvent(LockAppleRoomLogEvent.builder()
                .roomId(roomId)
                .changeMessageData(changeMessageData)
                .build());
    }

    @Override
    @Transactional
    public void logForAdded(String roomId, Member member, Content content) {

        ChangeMessageData changeMessageData = lockAppleRoomLogRepository
                .findLogByRoomId(roomId).orElse(ChangeMessageData.newDefault());

        List<LockAppleRoomUserStatus> statuses = changeMessageData.getStatuses();
        Map<String, Integer> uidToIndex = changeMessageData.getUidToIndex();

        String uid = member.getUid();

        uidToIndex.computeIfAbsent(uid, _uid -> {
            statuses.add(LockAppleRoomUserStatus.addedWithNickname(member.getNickname()));
            return statuses.size() - 1;
        });

        uidToIndex.computeIfPresent(uid, (_uid, index) -> {
            statuses.set(index, LockAppleRoomUserStatus.addedWithNickname(member.getNickname()));
            return index;
        });

        lockAppleRoomLogRepository.putChangeMessageDataLog(roomId, changeMessageData);

        eventPublisher.publishEvent(LockAppleRoomLogEvent.builder()
                .roomId(roomId)
                .changeMessageData(changeMessageData)
                .build());
    }

    @Override
    @Transactional
    public void logForCancelled(String roomId, String uid) {

        ChangeMessageData changeMessageData = lockAppleRoomLogRepository
                .findLogByRoomId(roomId).orElse(ChangeMessageData.newDefault());

        List<LockAppleRoomUserStatus> statuses = changeMessageData.getStatuses();
        Map<String, Integer> uidToIndex = changeMessageData.getUidToIndex();

        uidToIndex.computeIfAbsent(uid, _uid -> {
            statuses.add(LockAppleRoomUserStatus.cancelled());
            return statuses.size() - 1;
        });

        uidToIndex.computeIfPresent(uid, (_uid, index) -> {
            statuses.set(index, LockAppleRoomUserStatus.cancelled());
            return index;
        });

        lockAppleRoomLogRepository.putChangeMessageDataLog(roomId, changeMessageData);

        eventPublisher.publishEvent(LockAppleRoomLogEvent.builder()
                .roomId(roomId)
                .changeMessageData(changeMessageData)
                .build());
    }

    @Override
    @Transactional
    public void logForLeft(String roomId, String uid) {

        Optional<RoomApple> apple = roomAppleRepository.findRoomAppleByRoomId(roomId);

        if (apple.isEmpty()) {
            return;
        }

        List<Member> members = apple.get().getCreator().getMember();

        for (Member member : members) {
            if (member.getUid().equals(uid)) {
                logForLeftWithMember(roomId, member);

                return;
            }
        }

        logForLeftWithUid(roomId, uid);
    }

    private void logForLeftWithMember(String roomId, Member member) {

        ChangeMessageData changeMessageData = lockAppleRoomLogRepository
                .findLogByRoomId(roomId).orElse(ChangeMessageData.newDefault());

        List<LockAppleRoomUserStatus> statuses = changeMessageData.getStatuses();
        Map<String, Integer> uidToIndex = changeMessageData.getUidToIndex();

        String uid = member.getUid();

        uidToIndex.computeIfAbsent(uid, _uid -> {
            statuses.add(LockAppleRoomUserStatus.builder()
                    .nickname("알 수 없는 사용자")
                    .stage(LockAppleRoomUserStage.LEFT)
                    .hasUpload(false)
                    .build());
            return statuses.size() - 1;
        });

        uidToIndex.computeIfPresent(uid, (_uid, index) -> {
            LockAppleRoomUserStatus status = statuses.get(index);
            status.setStage(LockAppleRoomUserStage.LEFT);
            return index;
        });

        lockAppleRoomLogRepository.putChangeMessageDataLog(roomId, changeMessageData);

        eventPublisher.publishEvent(LockAppleRoomLogEvent.builder()
                .roomId(roomId)
                .changeMessageData(changeMessageData)
                .build());
    }

    private void logForLeftWithUid(String roomId, String uid) {

        ChangeMessageData changeMessageData = lockAppleRoomLogRepository
                .findLogByRoomId(roomId).orElse(ChangeMessageData.newDefault());

        List<LockAppleRoomUserStatus> statuses = changeMessageData.getStatuses();
        Map<String, Integer> uidToIndex = changeMessageData.getUidToIndex();

        uidToIndex.computeIfAbsent(uid, _uid -> {
            statuses.add(LockAppleRoomUserStatus.leftWithoutUploading());
            return statuses.size() - 1;
        });

        uidToIndex.computeIfPresent(uid, (_uid, index) -> {
            statuses.set(index, LockAppleRoomUserStatus.leftWithoutUploading());
            return index;
        });

        lockAppleRoomLogRepository.putChangeMessageDataLog(roomId, changeMessageData);

        eventPublisher.publishEvent(LockAppleRoomLogEvent.builder()
                .roomId(roomId)
                .changeMessageData(changeMessageData)
                .build());
    }
}
