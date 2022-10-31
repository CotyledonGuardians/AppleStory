package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.*;
import com.cotyledon.appletree.domain.entity.redis.RoomApple;
import com.cotyledon.appletree.domain.repository.redis.RoomAppleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

import static org.apache.commons.lang3.StringUtils.defaultString;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomAppleServiceImpl implements RoomAppleService {

    private final RoomAppleRepository roomAppleRepository;
    private final LockAppleRoomLogService lockAppleRoomLogService;

    @Override
    public void addMemberAndContentToAppleByRoomId(String roomId, Member member, Content content) {
        RoomApple apple = roomAppleRepository.findRoomAppleByRoomId(roomId)
                .orElseThrow(IllegalArgumentException::new);

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

        roomAppleRepository.putRoomApple(roomId, apple);

        // change 이벤트 발행
        lockAppleRoomLogService.logForAdded(roomId, member, content);
    }

    @SuppressWarnings("unchecked")
    @Override
    public boolean validateAndCleanContent(Content content) {
        List<ContentDescription>[] lists = new List[]{
                orEmpty(content.getText()),
                orEmpty(content.getPhoto()),
                orEmpty(content.getAudio()),
                orEmpty(content.getVideo())};

        content.setText(lists[0]);
        content.setPhoto(lists[1]);
        content.setAudio(lists[2]);
        content.setVideo(lists[3]);

        return !allEmpty(lists) && !anyBlank(lists);
    }

    @Override
    public String getAnyAuthorFromContent(Content content) {
        return Stream.of(content.getText(), content.getPhoto(), content.getAudio(), content.getVideo())
                .flatMap(Collection::stream).findAny().orElse(ContentDescription.DUMMY).getAuthor();
    }

    private List<ContentDescription> orEmpty(List<ContentDescription> list) {
        return Optional.ofNullable(list).orElse(Collections.emptyList());
    }

    private boolean allEmpty(List<ContentDescription>[] lists) {
        for (List<ContentDescription> list : lists) {
            if (!list.isEmpty()) return false;
        }
        return true;
    }

    private boolean anyBlank(List<ContentDescription>[] lists) {
        for (List<ContentDescription> list : lists) {
            if (notEmptyAndHasBlank(list)) return true;
        }
        return false;
    }

    private boolean notEmptyAndHasBlank(List<ContentDescription> list) {
        return !list.isEmpty() && list.stream().anyMatch(cd ->
                cd == null ||
                        defaultString(cd.getAuthor(), "").isBlank() ||
                        defaultString(cd.getContent(), "").isBlank());
    }
}
