package com.cotyledon.appletree.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Member {
    private String nickname;
    private String uid;
}
