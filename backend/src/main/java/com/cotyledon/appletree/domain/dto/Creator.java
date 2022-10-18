package com.cotyledon.appletree.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Creator {
    private String teamName;
    private String hostNickName;
    private List<Member> member;
}

