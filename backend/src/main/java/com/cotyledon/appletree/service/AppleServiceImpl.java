package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.domain.dto.LockAppleDTO;
import com.cotyledon.appletree.domain.dto.Member;
import com.cotyledon.appletree.domain.entity.jpa.Apple;
import com.cotyledon.appletree.domain.repository.jpa.AppleCustomRepository;
import com.cotyledon.appletree.domain.repository.jpa.AppleRepository;
import com.cotyledon.appletree.domain.repository.jpa.AppleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Date;

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
        return appleCustomRepository.findCloseByUidSort(uid, sort, pageable);
    }

    @Transactional
    public void showApple(Principal principal, Long appleId) throws Exception {
        Apple apple = appleRepository.findById(appleId).orElseThrow(IllegalArgumentException::new);
        appleUserRepository.updateIsShowByAppleAndUid(apple, principal.getName());
    }

    @Override
    @Transactional
    public void openApple(Principal principal, Long appleId) throws Exception {
        Apple apple = appleRepository.findOpenableAppleById(appleId).orElseThrow(IllegalArgumentException::new);
        appleUserRepository.updateIsOpenByAppleAndUid(apple, principal.getName());
    }

    public Object getAppleDetail(Principal principal, Long id) throws Exception {
        Apple apple = appleRepository.findById(id).orElseThrow();
        if(!apple.getIsCatch()){
            return null;
        }

        Date date = java.sql.Timestamp.valueOf(LocalDateTime.now());
        if (apple.getUnlockAt().after(date)) {
            String name = null;
            for(Member member : apple.getCreator().getMember()){
                if(member.getUid().equals(principal.getName())){
                    name = member.getNickname();
                    break;
                }
            }
            LockAppleDTO a = LockAppleDTO.of(apple);
            a.setNickName(name);
            return a;
        }
        return appleRepository.findById(id).orElseThrow();
    }

    @Override
    public int getMyAppleCount(Principal principal) throws Exception {
        return appleUserRepository.countByUid(principal.getName());
    }
}