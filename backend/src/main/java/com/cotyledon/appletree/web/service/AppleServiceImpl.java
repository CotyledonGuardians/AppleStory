package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.domain.repository.AppleCustomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class AppleServiceImpl implements AppleService{

    private final AppleCustomRepository appleCustomRepository;

    @Override
    public List<AppleListDTO> getAppleList(String uid, int sort) {
        return appleCustomRepository.findByUidWithPaging(uid, sort);
    }
}
