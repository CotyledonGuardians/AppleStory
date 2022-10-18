package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.AppleUser;
import lombok.Builder;

@Builder
public class AppleUserDTO {
    private Apple apple;
    private String userId;

    private String userName;
    private Boolean isShow;
    private Boolean isOpen;

    public static AppleUserDTO of(AppleUser appleUser) {
        return AppleUserDTO.builder()
                .apple(appleUser.getApple())
                .userId(appleUser.getUid())
                .userName(appleUser.getUserName())
                .isShow(appleUser.getIsShow())
                .isOpen(appleUser.getIsOpen())
                .build();
    }

    public AppleUser toAppleUserEntity() {
        return AppleUser.builder()
                .apple(this.apple)
                .uid(this.userId)
                .userName(this.userName)
                .isShow(this.isShow)
                .isOpen(this.isOpen)
                .build();
    }
}
