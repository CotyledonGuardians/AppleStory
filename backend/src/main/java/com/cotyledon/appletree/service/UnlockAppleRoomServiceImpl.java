package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.entity.redis.AppleRoomUser;
import com.cotyledon.appletree.domain.entity.redis.UnlockAppleRoom;
import com.cotyledon.appletree.domain.repository.redis.AppleRoomUserRepository;
import com.cotyledon.appletree.domain.repository.redis.UnlockAppleRoomGroupRepository;
import com.cotyledon.appletree.domain.repository.redis.UnlockAppleRoomRepository;
import com.cotyledon.appletree.notifier.UnlockAppleRoomNotifier;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UnlockAppleRoomServiceImpl implements UnlockAppleRoomService {

    private final UnlockAppleRoomRepository unlockAppleRoomRepository;
    private final UnlockAppleRoomGroupRepository unlockAppleRoomGroupRepository;
    private final UnlockAppleRoomNotifier unlockAppleRoomNotifier;
    private final AppleRoomUserRepository appleRoomUserRepository;

    @Override
    public Optional<UnlockAppleRoom> findById(Long appleId) {
        return unlockAppleRoomRepository.findById(appleId);
    }

    @Override
    public void save(UnlockAppleRoom room) {
        unlockAppleRoomRepository.save(room);
    }

    @Override
    public boolean enterRoomAndSaveRoomUser(String uid, Long appleId) {
        Optional<UnlockAppleRoom> room = unlockAppleRoomRepository.findById(appleId);

        if (room.isEmpty()) {
            log.info("방 없음 appleId: {}", appleId);

            return false;
        }

        log.info("방 찾음");

        AppleRoomUser user = AppleRoomUser.builder().uid(uid).appleId(appleId).build();
        appleRoomUserRepository.save(user);

        Set<String> group = unlockAppleRoomGroupRepository.findGroupByAppleId(appleId).orElse(new HashSet<>());
        group.add(uid);
        unlockAppleRoomGroupRepository.putGroup(appleId, group);

        // party 이벤트 발행
        unlockAppleRoomNotifier.notifyPartyChange(appleId);

        return true;
    }

    @Override
    public boolean hasRoomByAppleId(Long appleId) {
        return unlockAppleRoomRepository.findById(appleId).isPresent();
    }

    @Override
    public boolean isUserInRoom(String uid, Long appleId) {
        Optional<Set<String>> group = unlockAppleRoomGroupRepository.findGroupByAppleId(appleId);

        return group.isPresent() && group.get().contains(uid);
    }

    @Override
    public void attack(Long appleId) {

        UnlockAppleRoom room = unlockAppleRoomRepository.findById(appleId).orElseThrow();

        Set<String> group = unlockAppleRoomGroupRepository.findGroupByAppleId(appleId).orElseThrow();

        room.hitByPartySize(group.size());

        unlockAppleRoomRepository.save(room);

        unlockAppleRoomNotifier.notifyHealthChange(appleId);
    }
}
