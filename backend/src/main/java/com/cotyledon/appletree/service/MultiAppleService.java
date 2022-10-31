package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;

import java.util.List;

public interface MultiAppleService {

    void saveAppleAndAppleUsers(AppleDTO appleDTO, List<String> userUids);
    Long reserveAppleAndGetId();
    void deleteAppleIfEmpty(Long appleId);
}
