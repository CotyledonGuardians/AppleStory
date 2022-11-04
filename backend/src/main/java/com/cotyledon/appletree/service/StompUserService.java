package com.cotyledon.appletree.service;

import org.springframework.messaging.Message;

import java.util.Optional;

public interface StompUserService {

    Optional<String> getUidFromMessage(Message<?> message);
}
