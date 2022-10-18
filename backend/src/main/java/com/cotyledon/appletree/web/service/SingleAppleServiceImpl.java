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
import java.util.LinkedList;
import java.util.List;

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
        creator.setMember(new LinkedList<Member>());

        Member member = Member.builder()
                .uid(principal.getName())
                .nickname(apple.getCreator().getHostNickname())
                .build();
        creator.getMember().add(member);
        appleRepository.save(apple);

        AppleUser appleUser = AppleUser.builder()
                .apple(apple)
                .userName(member.getNickname())
                .uid(member.getUid())
                .isOpen(false)
                .isShow(false)
                .build();
        appleUserRepository.save(appleUser);
    }
}
