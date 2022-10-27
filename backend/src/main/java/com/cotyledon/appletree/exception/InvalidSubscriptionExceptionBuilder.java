package com.cotyledon.appletree.exception;

import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InvalidSubscriptionExceptionBuilder {

    private final StompUserDAO stompUserDAO;

    public IllegalArgumentException withReleasing(String sid) {
        stompUserDAO.release(sid);

        return new IllegalArgumentException("Invalid Subscription");
    }
}
