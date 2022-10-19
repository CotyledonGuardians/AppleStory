package com.cotyledon.appletree.domain.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class Creator {
    private String teamName;
    private String hostUid;
    private List<Member> member;
}

