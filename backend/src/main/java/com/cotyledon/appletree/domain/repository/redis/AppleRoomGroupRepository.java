package com.cotyledon.appletree.domain.repository.redis;

import java.util.Optional;
import java.util.Set;

public interface AppleRoomGroupRepository {

    void putGroup(String roomId, Set<String> member);
    Optional<Set<String>> findGroupByRoomId(String roomId);
    void deleteGroupByRoomId(String roomId);
}
