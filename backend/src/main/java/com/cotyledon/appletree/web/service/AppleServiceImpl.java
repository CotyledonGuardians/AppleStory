package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.repository.AppleRepository;
import com.cotyledon.appletree.domain.repository.AppleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppleServiceImpl implements AppleService{

    private final AppleRepository appleRepository;
    private final AppleUserRepository appleUserRepository;
    @Override
    @Transactional
    public void showApple(Principal principal, Long appleId) throws Exception {
        Apple apple = appleRepository.findById(appleId).orElseThrow(IllegalArgumentException::new);
        appleUserRepository.updateIsShowByAppleAndUid(apple, principal.getName());
    }
}
