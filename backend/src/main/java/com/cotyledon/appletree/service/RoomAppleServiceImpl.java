package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.Creator;
import com.cotyledon.appletree.domain.dto.Member;
import com.cotyledon.appletree.domain.repository.redis.RoomAppleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomAppleServiceImpl implements RoomAppleService {

    private RoomAppleRepository roomAppleRepository;

    @Override
    public void addMemberAndContentToAppleByRoomId(String roomId, Member member, Content content) {
        AppleDTO apple = roomAppleRepository.findAppleByRoomId(roomId).orElseThrow(IllegalArgumentException::new);

        Content contents = apple.getContent();
        contents.getText().addAll(content.getText());
        contents.getPhoto().addAll(content.getPhoto());
        contents.getAudio().addAll(content.getAudio());
        contents.getVideo().addAll(content.getVideo());
        apple.setContent(contents);

        Creator creator = apple.getCreator();
        List<Member> members = creator.getMember();
        members.add(member);
        creator.setMember(members);
        apple.setCreator(creator);

        roomAppleRepository.putApple(roomId, apple);
    }
}
