package com.cotyledon.appletree.exception;

import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InvalidStompMessageExceptionBuilder {

    private final StompUserDAO stompUserDAO;

    public IllegalArgumentException buildWithReleasing(String sid) {
        stompUserDAO.release(sid);

        return buildDefault();
    }

    public IllegalArgumentException buildDefault() {
        return new IllegalArgumentException("Not Allowed");
    }
}
