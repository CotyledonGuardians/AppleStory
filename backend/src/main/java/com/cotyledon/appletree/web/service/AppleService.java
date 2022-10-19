package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.entity.Apple;

import java.security.Principal;

public interface AppleService {
    void showApple(Principal principal, Long appleId) throws Exception;
    Apple getAppleDetail(Principal principal, Long id) throws  Exception;
}
