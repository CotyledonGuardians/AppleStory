package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.jpa.Apple;
import com.cotyledon.appletree.domain.entity.jpa.AppleUser;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppleListDTO {
    private Long id;
    private Boolean type;
    private String title;
    private Creator creator;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date unlockAt;
    private String uid;
    private Boolean isShow;
    private Boolean isOpen;
    private Boolean isCatch;

    public AppleListDTO(Apple apple, AppleUser appleUser) {
        this.id = apple.getId();
        this.type = apple.getType();
        this.title = apple.getTitle();
        this.creator = apple.getCreator();
        this.createAt = apple.getCreateAt();
        this.unlockAt = apple.getUnlockAt();
        this.uid = appleUser.getUid();
        this.isShow = appleUser.getIsShow();
        this.isOpen = appleUser.getIsOpen();
        this.isCatch = apple.getIsCatch();
    }
}
