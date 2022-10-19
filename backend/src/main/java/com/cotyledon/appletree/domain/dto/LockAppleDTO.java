package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.Apple;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
public class LockAppleDTO {
    private Boolean type;
    private String title;
    // 여러명이라면 만료 시간, 제목, 팀이름, 인원 명, 기록된 데이터 모음, 생성일
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date unlockAt;
    private List<String> content;
    private String teamName;
    private String nickName;
    private int number;

    public static LockAppleDTO of(Apple apple){
        return LockAppleDTO.builder()
                .type(apple.getType())
                .title(apple.getTitle())
                .createAt(apple.getCreateAt())
                .unlockAt(apple.getUnlockAt())
                .teamName(apple.getCreator().getTeamName())
//                .nickName(null) // join후 바꿔야..
                .number(apple.getCreator().getMember().size())
//                .content(null)
                .build();
    }
}
