package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;

import java.security.Principal;

public interface SingleAppleService {

    void addApple(Principal principal, AppleDTO appleDTO) throws Exception;
    void receiveApple(Principal principal, Long appleId) throws Exception;

}
