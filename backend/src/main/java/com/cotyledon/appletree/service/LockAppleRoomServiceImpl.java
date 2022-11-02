package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.RoomDTO;
import com.cotyledon.appletree.domain.entity.redis.AppleRoomUser;
import com.cotyledon.appletree.domain.entity.redis.LockAppleRoom;
import com.cotyledon.appletree.domain.entity.redis.RoomApple;
import com.cotyledon.appletree.domain.event.AppleSaveEvent;
import com.cotyledon.appletree.domain.event.ReserveLockAppleRoomEvent;
import com.cotyledon.appletree.domain.repository.redis.*;
import com.cotyledon.appletree.messenger.LockAppleRoomMessenger;
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
    private final LockAppleRoomGroupRepository lockAppleRoomGroupRepository;
    private final RoomAppleRepository roomAppleRepository;
    private final AppleRoomUserRepository appleRoomUserRepository;
    private final LockAppleRoomLogRepository lockAppleRoomLogRepository;
    private final LockAppleRoomMessenger lockAppleRoomMessenger;
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
        LockAppleRoom room = LockAppleRoom.builder().hostUid(hostUid).appleId(appleId).build();
        lockAppleRoomRepository.save(room);

        String roomId = room.getId();

        // Put 룸 사과
        roomAppleRepository.putRoomApple(roomId, RoomApple.of(apple));

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

        Optional<Set<String>> group = lockAppleRoomGroupRepository.findGroupByRoomId(roomId);

        if (group.isPresent() && !group.get().isEmpty()) {
            return false;
        }

        lockAppleRoomGroupRepository.deleteGroupByRoomId(roomId);
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

        Set<String> group = lockAppleRoomGroupRepository.findGroupByRoomId(roomId).orElse(new HashSet<>());
        group.add(uid);
        lockAppleRoomGroupRepository.putGroup(roomId, group);

        // change 이벤트 발행
        lockAppleRoomMessenger.logForJoined(roomId, uid);

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

        Optional<RoomApple> roomAppleOptional = roomAppleRepository.findRoomAppleByRoomId(room.getId());
        if (roomAppleOptional.isEmpty()) {
            log.info("Room Apple Not Found");
            return false;
        }

        RoomApple roomApple = roomAppleOptional.get();

        // 추억 데이터를 담은 멤버만 모음
        Set<String> userUids = new HashSet<>();

        roomApple.getCreator().getMember().forEach(member -> userUids.add(member.getUid()));

        if (userUids.isEmpty()) {
            log.info("Creator Empty");
            return false;
        }

        // 비어 있지 않다면 호스트는 무조건 포함
        userUids.add(hostUid);

        Long appleId = multiAppleService.saveAppleAndAppleUsersAndGetAppleId(roomApple.toAppleDTO(), userUids);

        eventPublisher.publishEvent(AppleSaveEvent.builder().appleId(appleId).roomId(roomId).build());

        return true;
    }

    @Override
    public void setSavedToTrueByRoomId(String roomId) {

        Optional<LockAppleRoom> roomOptional = lockAppleRoomRepository.findById(roomId);

        if (roomOptional.isEmpty()) {
            log.info("Room Not Found");
            return;
        }

        LockAppleRoom room = roomOptional.get();

        room.setSaved(true);
        lockAppleRoomRepository.save(room);
    }
}
