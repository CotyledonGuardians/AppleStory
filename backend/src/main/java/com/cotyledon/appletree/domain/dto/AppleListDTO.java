package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.AppleUser;
import lombok.Builder;
import org.locationtech.jts.geom.Point;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.util.Date;

@Builder
public class AppleListDTO {
    private Apple apple;
    private AppleUser appleUser;

    public AppleListDTO(Apple apple, AppleUser appleUser) {
        this.apple = apple;
        this.appleUser = appleUser;
    }
}
