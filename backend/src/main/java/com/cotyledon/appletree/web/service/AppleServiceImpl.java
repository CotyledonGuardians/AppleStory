package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.domain.repository.AppleCustomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppleServiceImpl implements AppleService{

    private final AppleCustomRepository appleCustomRepository;

    @Override
    public Page<AppleListDTO> getAppleList(String uid, int sort, Pageable pageable) {
        return appleCustomRepository.findByUidWithPaging(uid, sort, pageable);
    }
}
