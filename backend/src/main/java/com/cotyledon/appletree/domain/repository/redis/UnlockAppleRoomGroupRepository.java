package com.cotyledon.appletree.domain.repository.redis;

import java.util.Optional;
import java.util.Set;

public interface UnlockAppleRoomGroupRepository {

    void putGroup(Long appleId, Set<String> member);
    Optional<Set<String>> findGroupByAppleId(Long appleId);
    void deleteGroupByRoomId(Long appleId);
}
