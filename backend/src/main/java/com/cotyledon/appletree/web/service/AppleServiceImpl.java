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
    public Page<AppleListDTO> getOpenAppleList(String uid, int sort, Pageable pageable) {
        return appleCustomRepository.findOpenByUidSort(uid, sort, pageable);
    }

    @Override
    public Page<AppleListDTO> getCloseAppleList(String uid, int sort, Pageable pageable) {
        if(sort == 0 || sort == 1){
            return appleCustomRepository.findCloseByUidSort01(uid, sort, pageable);
        } else {
            return appleCustomRepository.findCloseByUidSort23(uid, sort, pageable);
        }
    }
}
