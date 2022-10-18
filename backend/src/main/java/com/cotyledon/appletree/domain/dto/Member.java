package com.cotyledon.appletree.domain.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    private String nickname;
    private String uid;
}
