package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.entity.redis.AppleRoomUser;
import com.cotyledon.appletree.domain.repository.redis.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppleRoomUserServiceImpl implements AppleRoomUserService {

    private final LockAppleRoomRepository lockAppleRoomRepository;
    private final RoomAppleRepository roomAppleRepository;
    private final AppleRoomGroupRepository appleRoomGroupRepository;
    private final AppleRoomUserRepository appleRoomUserRepository;
    private final LockAppleRoomLogRepository lockAppleRoomLogRepository;
    private final LockAppleRoomLogService lockAppleRoomLogService;

    // TODO: roomType 에 따라 repo 호출 분기 혹은 둘 다 쓰기?
    // 이 호출에 의해 룸이 비게 되었는지의 여부를 리턴
    // leave event 발행
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

        Optional<Set<String>> groupOptional = appleRoomGroupRepository.findGroupByRoomId(roomId);

        if (groupOptional.isEmpty()) {
            return false;
        }

        Set<String> group = groupOptional.get();

        if (group.isEmpty()) {
            // 모종의 문제로 빈 그룹이 있다면 그것을 지움
            appleRoomGroupRepository.deleteGroupByRoomId(roomId);
            
            return false;
        }

        // 그롭에서 유저를 지움
        group.remove(uid);

        // change 이벤트 발행
        lockAppleRoomLogService.logForLeft(roomId, uid);

        if (!group.isEmpty()) {
            // 그룹이 비어 있지 않다면 그룹을 업데이트
            appleRoomGroupRepository.putGroup(roomId, group);

            return false;
        }

        // 그룹이 비었으니 관련된 것 다 지움
        deleteAllRelatedToRoomIdOf(roomId);

        return true;
    }

    private void deleteAllRelatedToRoomIdOf(String roomId) {
        appleRoomGroupRepository.deleteGroupByRoomId(roomId);
        roomAppleRepository.deleteAppleByRoomId(roomId);
        lockAppleRoomLogRepository.deleteLogByRoomId(roomId);
        lockAppleRoomRepository.deleteById(roomId);
    }
}
