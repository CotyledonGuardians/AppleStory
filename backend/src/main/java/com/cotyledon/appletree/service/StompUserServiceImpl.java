package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StompUserServiceImpl implements StompUserService {

    private final StompUserDAO stompUserDAO;

    @Override
    public Optional<String> getUidFromMessage(Message<?> message) {
        return stompUserDAO.get(StompHeaderAccessor.wrap(message).getSessionId());
    }
}
