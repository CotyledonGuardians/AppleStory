package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.AppleUser;
import lombok.Builder;
import lombok.Data;
import org.locationtech.jts.geom.Point;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.util.Date;

@Data
public class AppleListDTO {
    private Boolean type;
    private String title;
    private Creator creator;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date unlockAt;

    private String createScene;

    private String content;
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
