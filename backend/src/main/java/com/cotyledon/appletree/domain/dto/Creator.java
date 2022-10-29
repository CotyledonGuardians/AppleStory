package com.cotyledon.appletree.domain.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Creator {
    private String teamName;
    private String hostUid;
    private List<Member> member;
}

