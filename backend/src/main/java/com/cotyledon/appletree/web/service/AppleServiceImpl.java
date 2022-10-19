package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.repository.AppleCustomRepository;
import com.cotyledon.appletree.domain.repository.AppleRepository;
import com.cotyledon.appletree.domain.repository.AppleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppleServiceImpl implements AppleService{

    private final AppleRepository appleRepository;
    private final AppleUserRepository appleUserRepository;
    private final AppleCustomRepository appleCustomRepository;
    @Override
    public Page<AppleListDTO> getOpenAppleList(String uid, int sort, Pageable pageable) {
        return appleCustomRepository.findOpenByUidSort(uid, sort, pageable);
    }

    @Override
    public Page<AppleListDTO> getCloseAppleList(String uid, int sort, Pageable pageable) {
        if (sort == 0 || sort == 1) {
            return appleCustomRepository.findCloseByUidSort01(uid, sort, pageable);
        } else {
            return appleCustomRepository.findCloseByUidSort23(uid, sort, pageable);
        }
    }

    @Transactional
    public void showApple(Principal principal, Long appleId) throws Exception {
        Apple apple = appleRepository.findById(appleId).orElseThrow(IllegalArgumentException::new);
        appleUserRepository.updateIsShowByAppleAndUid(apple, principal.getName());
    }
}
