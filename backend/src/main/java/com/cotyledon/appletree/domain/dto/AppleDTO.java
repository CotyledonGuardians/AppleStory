package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.jpa.Apple;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private GeoLocation location;
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

    public boolean validateAndCleanWithHostUidForReservingRoom(String hostUid) {

        if (this.title == null ||
                this.title.isBlank() ||
                this.creator == null ||
                this.creator.getTeamName() == null ||
                this.creator.getTeamName().isBlank() ||
                this.unlockAt == null ||
                this.unlockAt.before(new Date()) ||
                this.location == null ||
                this.location.getLat() == null ||
                this.location.getLng() == null) {
            return false;
        }

        cleanWithHostUidForReservingRoom(hostUid);

        return true;
    }

    private void cleanWithHostUidForReservingRoom(String hostUid) {
        this.type = false;
        this.creator = Creator.ofEmptyMemberWithTeamNameAndHostUid(creator.getTeamName(), hostUid);
        this.createAt = null;
        this.createScene = null;
        this.content = Content.ofEmpty();
        this.useSpace = false;
    }
}
