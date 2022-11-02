package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.*;
import com.cotyledon.appletree.domain.entity.redis.RoomApple;
import com.cotyledon.appletree.domain.repository.redis.RoomAppleRepository;
import com.cotyledon.appletree.notifier.LockAppleRoomNotifier;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static org.apache.commons.lang3.StringUtils.defaultString;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomAppleServiceImpl implements RoomAppleService {

    private final RoomAppleRepository roomAppleRepository;
    private final LockAppleRoomNotifier lockAppleRoomNotifier;

    @Override
    public void addMemberAndContentToAppleByRoomId(String roomId, Member member, Content content) {
        RoomApple apple = roomAppleRepository.findRoomAppleByRoomId(roomId)
                .orElseThrow(IllegalArgumentException::new);

        // 이미 담았다면 기존의 내용을 버림
        removeExistingMemberAndContentByMember(apple, member);

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
        lockAppleRoomNotifier.notifyForAdded(roomId, member, content);
    }

    @SuppressWarnings("unchecked")
    @Override
    public boolean validateAndCleanContent(Content content, String uid) {
        List<ContentDescription>[] lists = new List[]{
                ofAuthorOrEmpty(content.getText(), uid),
                ofAuthorOrEmpty(content.getPhoto(), uid),
                ofAuthorOrEmpty(content.getAudio(), uid),
                ofAuthorOrEmpty(content.getVideo(), uid)};

        content.setText(lists[0]);
        content.setPhoto(lists[1]);
        content.setAudio(lists[2]);
        content.setVideo(lists[3]);

        return !allEmpty(lists) && !anyBlank(lists);
    }

    private void removeExistingMemberAndContentByMember(RoomApple apple, Member member) {
        apple.getCreator().getMember().removeIf(m -> m.getUid().equals(member.getUid()));

        Content content = apple.getContent();

        content.getText().removeIf(cd -> cd.getAuthor().equals(member.getUid()));
        content.getPhoto().removeIf(cd -> cd.getAuthor().equals(member.getUid()));
        content.getAudio().removeIf(cd -> cd.getAuthor().equals(member.getUid()));
        content.getVideo().removeIf(cd -> cd.getAuthor().equals(member.getUid()));
    }

    private List<ContentDescription> ofAuthorOrEmpty(List<ContentDescription> list, String uid) {
        return Optional.ofNullable(list).orElse(Collections.emptyList()).stream()
                .peek(cd -> cd.setAuthor(uid)).collect(Collectors.toList());
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
