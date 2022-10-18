package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.AppleUser;
import com.cotyledon.appletree.domain.repository.AppleRepository;
import com.cotyledon.appletree.domain.repository.AppleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class SingleAppleServiceImpl implements SingleAppleService {
    private final AppleRepository appleRepository;
    private final AppleUserRepository appleUserRepository;
    @Transactional
    public void addApple(AppleDTO appleDTO, String uid) throws Exception {
        Apple apple = appleDTO.toAppleEntity();
//        AppleUser appleUser = AppleUser.builder()
//                        .apple(apple)
//                                .userName(apple.getCreator().get)
        appleRepository.save(apple);
//        appleUserRepository.save()
    }
}
