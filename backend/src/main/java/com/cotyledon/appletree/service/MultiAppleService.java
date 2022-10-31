package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;

import java.security.Principal;

public interface MultiAppleService {

    void addApple(Principal principal, AppleDTO appleDTO);
    Long reserveAppleAndGetId();
    void deleteAppleIfEmpty(Long appleId);
}
