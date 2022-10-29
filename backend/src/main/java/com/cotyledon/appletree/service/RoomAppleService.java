package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.Member;

public interface RoomAppleService {

    void addMemberAndContentToAppleByRoomId(String roomId, Member member, Content content);
}
