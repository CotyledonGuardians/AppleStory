package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.Creator;
import com.cotyledon.appletree.domain.dto.Member;
import com.cotyledon.appletree.domain.entity.jpa.Apple;
import com.cotyledon.appletree.domain.entity.jpa.AppleUser;
import com.cotyledon.appletree.domain.repository.jpa.AppleRepository;
import com.cotyledon.appletree.domain.repository.jpa.AppleUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.LinkedList;

@Service
@RequiredArgsConstructor
@Slf4j
public class SingleAppleServiceImpl implements SingleAppleService {
    private final AppleRepository appleRepository;
    private final AppleUserRepository appleUserRepository;
    @Transactional
    public void addApple(Principal principal, AppleDTO appleDTO) throws Exception {
        Apple apple = appleDTO.toSingleAppleEntity();
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
            throw new Exception("????????? ???????????????.");
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
