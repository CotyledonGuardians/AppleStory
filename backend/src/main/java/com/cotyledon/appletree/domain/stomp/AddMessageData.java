package com.cotyledon.appletree.domain.stomp;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AddMessageData {

    private String nickname;

    public static AddMessageData withNickname(String nickname) {
        return AddMessageData.builder().nickname(nickname).build();
    }
}
