package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.RoomDTO;
import com.cotyledon.appletree.domain.entity.redis.AppleRoomUser;
import com.cotyledon.appletree.domain.entity.redis.LockAppleRoom;
import com.cotyledon.appletree.domain.event.AppleRoomJoinEvent;
import com.cotyledon.appletree.domain.event.ReserveLockAppleRoomEvent;
import com.cotyledon.appletree.domain.repository.redis.AppleRoomGroupRepository;
import com.cotyledon.appletree.domain.repository.redis.AppleRoomUserRepository;
import com.cotyledon.appletree.domain.repository.redis.LockAppleRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class LockAppleRoomServiceImpl implements LockAppleRoomService {

    private final LockAppleRoomRepository lockAppleRoomRepository;
    private final AppleRoomGroupRepository appleRoomGroupRepository;
    private final AppleRoomUserRepository appleRoomUserRepository;
    private final ApplicationEventPublisher eventPublisher;

    // reserve 이벤트 발행
    @Override
    public RoomDTO makeRoomAndGet() {

        LockAppleRoom room = LockAppleRoom.builder().build();

        lockAppleRoomRepository.save(room);

        String roomId = room.getId();

        Set<String> group = new HashSet<>();

        appleRoomGroupRepository.putGroup(roomId, group);

        eventPublisher.publishEvent(ReserveLockAppleRoomEvent.builder().roomId(roomId).build());

        return RoomDTO.builder().roomId(roomId).build();
    }

    @Override
    public void deleteRoomIfEmpty(String roomId) {

        Optional<LockAppleRoom> room = lockAppleRoomRepository.findById(roomId);

        if (room.isEmpty()) {
            // 이미 룸이 없는 경우 (유저가 방 만들고 빨리 나감)
            return;
        }

        Optional<Set<String>> group = appleRoomGroupRepository.findGroupByRoomId(roomId);

        if (group.isEmpty() || group.get().isEmpty()) {
            lockAppleRoomRepository.delete(room.get());
        }
    }

    // join 이벤트 발행
    @Override
    public boolean enterRoomAndSaveRoomUser(String uid, String roomId) {
        Optional<LockAppleRoom> room = lockAppleRoomRepository.findById(roomId);

        if (room.isEmpty()) {
            return false;
        }

        log.info("방 찾음");

        Optional<Set<String>> groupOptional = appleRoomGroupRepository.findGroupByRoomId(roomId);

        if (groupOptional.isEmpty()) {
            log.warn("뭔가 잘못됨");

            return false;
        }

        Set<String> group = groupOptional.get();
        group.add(uid);
        appleRoomGroupRepository.putGroup(roomId, group);

        AppleRoomUser user = AppleRoomUser.builder().uid(uid).roomId(roomId).build();
        appleRoomUserRepository.save(user);

        // join 이벤트 발행
        eventPublisher.publishEvent(AppleRoomJoinEvent.builder()
                .roomId(roomId)
                .uid(uid)
                .build());

        return true;
    }
}
