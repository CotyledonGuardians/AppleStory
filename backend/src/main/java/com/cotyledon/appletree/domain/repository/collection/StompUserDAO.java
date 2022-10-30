package com.cotyledon.appletree.domain.repository.collection;

import java.util.Optional;

public interface StompUserDAO {

    boolean load(String sid, String uid);
    Optional<String> get(String sid);
    void release(String sid);
}
