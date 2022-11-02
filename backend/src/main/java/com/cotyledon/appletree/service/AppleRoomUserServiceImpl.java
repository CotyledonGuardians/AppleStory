package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.entity.redis.AppleRoomUser;
import com.cotyledon.appletree.domain.entity.redis.LockAppleRoom;
import com.cotyledon.appletree.domain.repository.jpa.AppleRepository;
import com.cotyledon.appletree.domain.repository.redis.*;
import com.cotyledon.appletree.messenger.LockAppleRoomMessenger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppleRoomUserServiceImpl implements AppleRoomUserService {

    private final AppleRepository appleRepository;
    private final LockAppleRoomRepository lockAppleRoomRepository;
    private final RoomAppleRepository roomAppleRepository;
    private final LockAppleRoomGroupRepository lockAppleRoomGroupRepository;
    private final AppleRoomUserRepository appleRoomUserRepository;
    private final LockAppleRoomLogRepository lockAppleRoomLogRepository;
    private final LockAppleRoomMessenger lockAppleRoomMessenger;

    // 이 호출에 의해 룸이 비게 되었는지의 여부를 리턴
    // leave event 발행
    // lockRoom 에 있든 unlockRoom 에 있든 둘 다 지움
    public boolean removeRoomUserAndRoomIfEmptyByUid(String uid) {

        Optional<AppleRoomUser> appleRoomUser = appleRoomUserRepository.findById(uid);

        if (appleRoomUser.isEmpty()) {
            return false;
        }

        String roomId = appleRoomUser.get().getRoomId();

        // 유저를 지움
        appleRoomUserRepository.delete(appleRoomUser.get());

        if (roomId == null) {
            return false;
        }

        Optional<Set<String>> groupOptional = lockAppleRoomGroupRepository.findGroupByRoomId(roomId);

        if (groupOptional.isEmpty()) {
            return false;
        }

        Set<String> group = groupOptional.get();

        if (group.isEmpty()) {
            // 모종의 문제로 빈 그룹이 있다면 그것을 지움
            lockAppleRoomGroupRepository.deleteGroupByRoomId(roomId);
            
            return false;
        }

        // 그롭에서 유저를 지움
        group.remove(uid);

        // change 이벤트 발행
        lockAppleRoomMessenger.logForLeft(roomId, uid);

        if (!group.isEmpty()) {
            // 그룹이 비어 있지 않다면 그룹을 업데이트
            lockAppleRoomGroupRepository.putGroup(roomId, group);

            return false;
        }

        // 그룹이 비었으니 관련된 것 다 지움
        deleteAllRelatedToRoomIdOf(roomId);

        return true;
    }

    // TODO: unlock 에서도 지우기 추가
    private void deleteAllRelatedToRoomIdOf(String roomId) {

        lockAppleRoomGroupRepository.deleteGroupByRoomId(roomId);
        roomAppleRepository.deleteRoomAppleByRoomId(roomId);
        lockAppleRoomLogRepository.deleteLogByRoomId(roomId);

        // 예약만 되고 제출되지 않은 DB 사과가 있다면 지움
        Optional<LockAppleRoom> room = lockAppleRoomRepository.findById(roomId);
        if (room.isPresent() && !room.get().getSaved()) {
            appleRepository.deleteById(room.get().getAppleId());
        }

        lockAppleRoomRepository.deleteById(roomId);
    }
}
