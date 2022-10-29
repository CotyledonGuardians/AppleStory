package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.jpa.Apple;
import com.cotyledon.appletree.domain.entity.jpa.AppleUser;
import lombok.*;
import org.locationtech.jts.geom.Point;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppleListDTO {
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

    private String uid;
    private Boolean isShow;
    private Boolean isOpen;

    public AppleListDTO(Apple apple, AppleUser appleUser) {
        this.type = apple.getType();
        this.title = apple.getTitle();
        this.creator = apple.getCreator();
        this.createAt = apple.getCreateAt();
        this.unlockAt = apple.getUnlockAt();
        this.createScene = apple.getCreateScene();
        this.content = apple.getContent();
        this.location = apple.getLocation();
        this.useSpace = apple.getUseSpace();
        this.uid = appleUser.getUid();
        this.isShow = appleUser.getIsShow();
        this.isOpen = appleUser.getIsOpen();
    }
}
