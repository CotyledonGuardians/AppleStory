package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberDTO {
    private String nickname;
    private String uid;
}
