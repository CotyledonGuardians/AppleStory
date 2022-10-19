package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.Creator;
import com.cotyledon.appletree.domain.dto.Member;
import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.AppleUser;
import com.cotyledon.appletree.domain.repository.AppleRepository;
import com.cotyledon.appletree.domain.repository.AppleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.sql.SQLOutput;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.LinkedList;

@Service
@RequiredArgsConstructor
@Slf4j
public class SingleAppleServiceImpl implements SingleAppleService {
    private final AppleRepository appleRepository;
    private final AppleUserRepository appleUserRepository;
    @Transactional
    public void addApple(Principal principal, AppleDTO appleDTO) throws Exception {
        Apple apple = appleDTO.toAppleEntity();
        Creator creator = apple.getCreator();
        creator.setHostUid(principal.getName());
        String hostNickname = creator.getMember().get(0).getNickname();

        Member member = Member.builder()
                .uid(principal.getName())
                .nickname(hostNickname)
                .build();

        creator.setMember(new LinkedList<Member>());
        creator.getMember().add(member);
        appleRepository.save(apple);

        AppleUser appleUser = AppleUser.builder()
                .apple(apple)
                .uid(member.getUid())
                .isOpen(false)
                .isShow(false)
                .build();
        appleUserRepository.save(appleUser);
    }

    @Transactional
    public void receiveApple(Principal principal, Long appleId) throws Exception {
        Apple apple = appleRepository.findById(appleId).orElseThrow(IllegalArgumentException::new);
        boolean isPresent = appleUserRepository.findTopByAppleAndUid(apple, principal.getName()).isPresent();
        if(isPresent) {
            throw new Exception("완료된 요청입니다.");
        }
        AppleUser appleUser = AppleUser.builder()
                .apple(apple)
                .uid(principal.getName())
                .isOpen(false)
                .isShow(false)
                .build();
        appleUserRepository.save(appleUser);
    }
}
