package com.cotyledon.appletree.domain.entity;

import lombok.*;
import org.locationtech.jts.geom.Point;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Apple extends BaseEntity{
    private Boolean type;
    private String title;
    private String creator;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date unlockAt;

    private String createScene;

    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(columnDefinition = "POINT")
    private Point location;
    private Boolean useSpace;
}
