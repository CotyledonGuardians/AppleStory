package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.RoomDTO;
import com.cotyledon.appletree.domain.entity.redis.AppleRoomUser;
import com.cotyledon.appletree.domain.entity.redis.LockAppleRoom;
import com.cotyledon.appletree.domain.entity.redis.RoomApple;
import com.cotyledon.appletree.domain.enums.LockAppleRoomUserStage;
import com.cotyledon.appletree.domain.event.ReserveLockAppleRoomEvent;
import com.cotyledon.appletree.domain.repository.redis.*;
import com.cotyledon.appletree.domain.stomp.ChangeMessageData;
import com.cotyledon.appletree.domain.stomp.LockAppleRoomUserStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class LockAppleRoomServiceImpl implements LockAppleRoomService {

    private final LockAppleRoomRepository lockAppleRoomRepository;
    private final AppleRoomGroupRepository appleRoomGroupRepository;
    private final RoomAppleRepository roomAppleRepository;
    private final AppleRoomUserRepository appleRoomUserRepository;
    private final LockAppleRoomLogRepository lockAppleRoomLogRepository;
    private final LockAppleRoomLogService lockAppleRoomLogService;
    private final MultiAppleService multiAppleService;
    private final ApplicationEventPublisher eventPublisher;

    // reserve 이벤트 발행
    @Override
    public RoomDTO reserveRoomAndGetRoomDTO(String hostUid, AppleDTO apple, long appleId) {

        // 필수 속성 있는지 검사 & 다른 속성 초기화
        if (!apple.validateAndCleanWithHostUidForReservingRoom(hostUid)) {
            throw new IllegalArgumentException("Invalid MakeLockAppleRoom Request");
        }

        // 룸 생성
        LockAppleRoom room = LockAppleRoom.builder().hostUid(hostUid).build();
        lockAppleRoomRepository.save(room);

        String roomId = room.getId();

        // Put 룸 사과
        roomAppleRepository.putRoomApple(roomId, RoomApple.withAppleDTOAndAppleId(apple, appleId));

        // reserve 이벤트 발행
        eventPublisher.publishEvent(ReserveLockAppleRoomEvent.builder().roomId(roomId).appleId(appleId).build());

        return RoomDTO.builder().roomId(roomId).build();
    }

    @Override
    public boolean deleteRoomIfEmpty(String roomId) {

        if (lockAppleRoomRepository.findById(roomId).isEmpty()) {
            // 이미 룸이 없는 경우 (유저가 방 만들고 빨리 나감)
            return false;
        }

        Optional<Set<String>> group = appleRoomGroupRepository.findGroupByRoomId(roomId);

        if (group.isPresent() && !group.get().isEmpty()) {
            return false;
        }

        appleRoomGroupRepository.deleteGroupByRoomId(roomId);
        roomAppleRepository.deleteRoomAppleByRoomId(roomId);
        lockAppleRoomLogRepository.deleteLogByRoomId(roomId);
        lockAppleRoomRepository.deleteById(roomId);

        log.info("예약된 룸 (+관련 컬렉션 전부) 을 지움");

        return true;
    }

    // join 이벤트 발행
    @Override
    public boolean enterRoomAndSaveRoomUser(String uid, String roomId) {
        Optional<LockAppleRoom> room = lockAppleRoomRepository.findById(roomId);

        if (room.isEmpty()) {
            return false;
        }

        log.info("방 찾음");

        AppleRoomUser user = AppleRoomUser.builder().uid(uid).roomId(roomId).build();
        appleRoomUserRepository.save(user);

        Set<String> group = appleRoomGroupRepository.findGroupByRoomId(roomId).orElse(new HashSet<>());
        group.add(uid);
        appleRoomGroupRepository.putGroup(roomId, group);

        // change 이벤트 발행
        lockAppleRoomLogService.logForJoined(roomId, uid);

        return true;
    }

    @Override
    public boolean hasRoomByRoomId(String roomId) {
        Optional<LockAppleRoom> room = lockAppleRoomRepository.findById(roomId);
        return room.isPresent();
    }

    @Override
    public Optional<LockAppleRoom> findByRoomId(String roomId) {
        return lockAppleRoomRepository.findById(roomId);
    }

    @Override
    public boolean saveAppleIfHostByRoomAndUid(LockAppleRoom room, String uid) {

        String hostUid = room.getHostUid();
        if (!uid.equals(hostUid)) {
            log.info("Unauthorized");
            return false;
        }

        String roomId = room.getId();

        Optional<RoomApple> roomApple = roomAppleRepository.findRoomAppleByRoomId(room.getId());
        if (roomApple.isEmpty()) {
            log.info("Room Apple Not Found");
            return false;
        }

        Optional<ChangeMessageData> changeMessageDataOptional = lockAppleRoomLogRepository.findLogByRoomId(roomId);
        if (changeMessageDataOptional.isEmpty()) {
            log.info("Room Log Not Found");
            return false;
        }

        List<String> userUids = new ArrayList<>();
        boolean containsHost = false;

        ChangeMessageData changeMessageData = changeMessageDataOptional.get();
        Map<String, Integer> uidToIndex = changeMessageData.getUidToIndex();
        Set<String> uids = uidToIndex.keySet();
        for (String _uid : uids) {
            ArrayList<LockAppleRoomUserStatus> statuses = changeMessageData.getStatuses();
            if (statuses.get(uidToIndex.get(_uid)).getStage() == LockAppleRoomUserStage.ADDED) {
                userUids.add(_uid);
                if (_uid.equals(hostUid)) {
                    containsHost = true;
                }
            }
        }

        if (userUids.isEmpty()) {
            log.info("Creator Empty");
            return false;
        }

        if (!containsHost) {
            userUids.add(hostUid);
            log.info("호스트가 업로드하지 않아서 호스트를 추가함");
        }

        multiAppleService.saveAppleAndAppleUsers(roomApple.get().toAppleDTO(), userUids);

        return true;
    }
}
