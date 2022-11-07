package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;

import java.util.Set;

public interface MultiAppleService {

    Long saveAppleAndAppleUsersAndGetAppleId(AppleDTO appleDTO, Set<String> userUids);
    Long reserveAppleAndGetId();
    void deleteAppleIfEmpty(Long appleId);
    void saveAppleAndAppleUsers(AppleDTO appleDTO, Set<String> userUids);
}
