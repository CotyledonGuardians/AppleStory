package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.jpa.Apple;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.locationtech.jts.geom.Point;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;

@Builder
@Getter
@Setter
@ToString
public class AppleDTO {
    private Boolean type;
    private String title;
    private Creator creator;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date unlockAt;

    private String createScene;

    private Content content;
    private Point location;
    private Boolean useSpace;

    public static AppleDTO of(Apple apple) {
        return AppleDTO.builder()
                .type(apple.getType())
                .title(apple.getTitle())
                .creator(apple.getCreator())
                .createAt(apple.getCreateAt())
                .unlockAt(apple.getUnlockAt())
                .createScene(apple.getCreateScene())
                .content(apple.getContent())
                .location(apple.getLocation())
                .useSpace(apple.getUseSpace())
                .build();
    }

    public static AppleDTO withTitleAndTeamNameAndHostUid(String title, String teamName, String hostUid) {
        return AppleDTO.builder()
                .title(title)
                .content(Content.ofEmpty())
                .creator(Creator.builder()
                        .teamName(teamName)
                        .hostUid(hostUid)
                        .member(new ArrayList<>())
                        .build())
                .build();
    }

    public Apple toAppleEntity() {
        return Apple.builder()
                .type(this.type)
                .title(this.title)
                .creator(this.creator)
                .createAt(this.createAt)
                .unlockAt(this.unlockAt)
                .createScene(this.createScene)
                .content(this.content)
                .location(this.location)
                .useSpace(this.useSpace)
                .isCatch(false)
                .build();
    }

    public Apple toSingleAppleEntity() {
        return Apple.builder()
                .type(this.type)
                .title(this.title)
                .creator(this.creator)
                .createAt(this.createAt)
                .unlockAt(this.unlockAt)
                .createScene(this.createScene)
                .content(this.content)
                .location(this.location)
                .useSpace(this.useSpace)
                .isCatch(true)
                .build();
    }
}
