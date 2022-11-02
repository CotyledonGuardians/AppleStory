package com.cotyledon.appletree.domain.entity.redis;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.Creator;
import com.cotyledon.appletree.domain.dto.GeoLocation;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RoomApple {

    private Boolean type;
    private String title;
    private Creator creator;
    private Date createAt;
    private Date unlockAt;
    private String createScene;
    private Content content;
    private GeoLocation location;
    private Boolean useSpace;
    private Boolean isCatch;

    public AppleDTO toAppleDTO() {
        return AppleDTO.builder()
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

    public static RoomApple of(AppleDTO appleDTO) {
        return RoomApple.builder()
                .type(appleDTO.getType())
                .title(appleDTO.getTitle())
                .creator(appleDTO.getCreator())
                .createAt(appleDTO.getCreateAt())
                .unlockAt(appleDTO.getUnlockAt())
                .createScene(appleDTO.getCreateScene())
                .content(appleDTO.getContent())
                .location(appleDTO.getLocation())
                .useSpace(appleDTO.getUseSpace())
                .isCatch(appleDTO.getIsCatch())
                .build();
    }
}
