package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.LockAppleDTO;
import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.repository.AppleRepository;
import com.cotyledon.appletree.domain.repository.AppleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    @Override
    @Transactional
    public void showApple(Principal principal, Long appleId) throws Exception {
        Apple apple = appleRepository.findById(appleId).orElseThrow(IllegalArgumentException::new);
        appleUserRepository.updateIsShowByAppleAndUid(apple, principal.getName());
    }

    @Override
    public Apple getAppleDetail(Principal principal, Long id) throws Exception {
        // 그냥 데이터 막 보내면 됨
        // 하지만 시간이 되지 않았다면
        // 만약 한 명이라면 만료 시간, 제목, 닉네임, 기록된 데이터 모음, 생성일
        // 만약 여러명이라면 만료 시간, 제목, 팀이름, 인원 명, 기록된 데이터 모음, 생성일
        // createAt, unlockAt, title, creator에 이름, [텍스트, 보이스, 이미지, 비디오, 로케이션]
        // 사과를 클릭했을 때 열리지 않은 사과라면 사과를 때려야 함 다 때렸다면 is show를 바꾼뒤에 Detail로 보내야
        // 그럼 나는 그냥 상세 정보만 보여주면 되는데,
        //
        System.out.println(appleRepository.findById(id));
        Apple apple = appleRepository.findById(id).orElseThrow();

        Date date = java.sql.Timestamp.valueOf(LocalDateTime.now());
        if (apple.getUnlockAt().after(date)) {
            System.out.println("dmdmdm");
//            LockAppleDTO a = LockAppleDTO.of(apple);
//            System.out.println(a);
        }
        return appleRepository.findById(id).orElseThrow();
    }
}
