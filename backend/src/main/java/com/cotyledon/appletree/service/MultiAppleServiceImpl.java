package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.entity.jpa.Apple;
import com.cotyledon.appletree.domain.entity.jpa.AppleUser;
import com.cotyledon.appletree.domain.repository.jpa.AppleRepository;
import com.cotyledon.appletree.domain.repository.jpa.AppleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MultiAppleServiceImpl implements MultiAppleService {

    private final AppleRepository appleRepository;
    private final AppleUserRepository appleUserRepository;

    @Override
    public void saveAppleAndAppleUsers(AppleDTO appleDTO, List<String> userUids) {
        Apple apple = appleDTO.toAppleEntity();

        appleRepository.save(apple);

        userUids.stream().map(uid -> AppleUser.builder()
                .uid(uid)
                .apple(apple)
                .isOpen(false)
                .isShow(true)
                .build()).forEach(appleUserRepository::save);
    }

    @Override
    public Long reserveAppleAndGetId() {
        return appleRepository.save(AppleDTO.ofEmpty().toAppleEntity()).getId();
    }

    @Override
    public void deleteAppleIfEmpty(Long appleId) {

        Optional<Apple> apple = appleRepository.findById(appleId);

        if (apple.isEmpty()) {
            log.warn("No Such Apple Entity");

            return;
        }

        appleRepository.delete(apple.get());
        log.info("예약된 사과를 지움");
    }
}
