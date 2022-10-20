package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.Apple;
import lombok.Builder;
import lombok.ToString;
import org.locationtech.jts.geom.Point;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

@Builder
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
