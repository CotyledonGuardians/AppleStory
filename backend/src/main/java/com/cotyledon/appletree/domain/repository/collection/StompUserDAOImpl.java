package com.cotyledon.appletree.domain.repository.collection;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

@Repository
@Slf4j
public class StompUserDAOImpl implements StompUserDAO {

    private final Map<String, String> sidUidMap = new ConcurrentHashMap<>();
    private final Set<String> uidSet = new ConcurrentSkipListSet<>();

    @Override
    public boolean load(String sid, String uid) {

        if (uidSet.contains(uid)) {
            log.info("uid 중복");

            return false;
        }

        sidUidMap.put(sid, uid);
        uidSet.add(uid);

        log.info("AFTER load: {}", sidUidMap);

        return true;
    }

    @Override
    public Optional<String> get(String sid) {
        Optional<String> uid = Optional.ofNullable(sidUidMap.get(sid));

        log.info("AFTER get: {}", sidUidMap);

        return uid;
    }

    @Override
    public void release(String sid) {
        String uid = sidUidMap.get(sid);

        if (uid == null) {
            return;
        }

        uidSet.remove(uid);
        sidUidMap.remove(sid);

        log.info("AFTER release: {}", sidUidMap);
    }
}
