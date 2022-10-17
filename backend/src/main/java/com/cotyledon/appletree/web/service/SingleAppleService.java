package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.repository.AppleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SingleAppleService {

    private final AppleRepository appleRepository;
    public void addApple(AppleDTO appleDTO) throws Exception {
        appleRepository.save(appleDTO.toAppleEntity());
    }
}
