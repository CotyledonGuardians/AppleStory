package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.entity.redis.AppleRoomUser;
import com.cotyledon.appletree.domain.repository.redis.AppleRoomGroupRepository;
import com.cotyledon.appletree.domain.repository.redis.AppleRoomUserRepository;
import com.cotyledon.appletree.domain.repository.redis.LockAppleRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppleRoomUserServiceImpl implements AppleRoomUserService {

    final LockAppleRoomRepository lockAppleRoomRepository;
    final AppleRoomGroupRepository appleRoomGroupRepository;
    final AppleRoomUserRepository appleRoomUserRepository;

    // TODO: roomType 에 따라 repo 호출 분기 혹은 둘 다 쓰기?
    // 이 호출에 의해 룸이 비게 되었는지의 여부를 리턴
    public boolean releaseRoomUserByUidAndRemoveRoomIfEmpty(String uid) {

        Optional<AppleRoomUser> appleRoomUser = appleRoomUserRepository.findById(uid);

        if (appleRoomUser.isEmpty()) {
            return false;
        }

        // 유저를 지움
        appleRoomUserRepository.delete(appleRoomUser.get());

        String roomId = appleRoomUser.get().getRoomId();

        if (roomId == null) {
            return false;
        }

        Optional<Set<String>> groupOptional = appleRoomGroupRepository.findGroupByRoomId(roomId);

        if (groupOptional.isEmpty()) {
            return false;
        }

        Set<String> group = groupOptional.get();

        // 그롭에서 유저를 지움
        group.remove(uid);

        if (!group.isEmpty()) {
            // 그룹이 비어 있지 않다면 그룹을 업데이트
            appleRoomGroupRepository.putGroup(roomId, group);

            return false;
        }

        // 그룹이 비었으니 그룹도 지우고 룸도 지움
        appleRoomGroupRepository.deleteGroupByRoomId(roomId);
        lockAppleRoomRepository.deleteById(roomId);

        return true;
    }
}
