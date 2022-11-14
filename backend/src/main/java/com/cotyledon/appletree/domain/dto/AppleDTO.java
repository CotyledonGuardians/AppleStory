package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.jpa.Apple;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Slf4j
public class AppleDTO {

    private Long id;
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
    private Boolean isCatch;

    public static AppleDTO ofEmpty() {
        return AppleDTO.builder()
                .type(false)
                .useSpace(false)
                .isCatch(false)
                .build();
    }

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
                .isCatch(apple.getIsCatch())
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
                .isCatch(this.isCatch)
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

    public void translateInto(Apple apple) {
        apple.setType(this.type);
        apple.setTitle(this.title);
        apple.setCreator(this.creator);
        apple.setCreateAt(this.createAt);
        apple.setUnlockAt(this.unlockAt);
        apple.setCreateScene(this.createScene);
        apple.setContent(this.content);
        apple.setLocation(this.location);
        apple.setUseSpace(this.useSpace);
        apple.setIsCatch(this.isCatch);
    }

    public boolean validateAndCleanWithHostUidForReservingRoom(String hostUid) {

        if (this.title == null ||
                this.title.isBlank() ||
                this.creator == null ||
                this.creator.getTeamName() == null ||
                this.creator.getTeamName().isBlank() ||
                this.unlockAt == null // ||
                // 해제일 제한 풂
                // this.unlockAt.before(Timestamp.valueOf(LocalDateTime.now().minusDays(1))) // ||
                // this.location == null ||
                // this.location.getLat() == null ||
                // this.location.getLng() == null
        ) {
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
        this.isCatch = false;
    }
}
