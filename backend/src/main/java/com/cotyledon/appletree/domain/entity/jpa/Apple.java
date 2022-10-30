package com.cotyledon.appletree.domain.entity.jpa;

import com.cotyledon.appletree.domain.dto.Content;
import com.cotyledon.appletree.domain.dto.GeoLocation;
import com.cotyledon.appletree.domain.util.ContentConverter;
import com.cotyledon.appletree.domain.dto.Creator;
import com.cotyledon.appletree.domain.util.CreatorConverter;
import com.cotyledon.appletree.domain.util.GeoLocationConverter;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Apple extends BaseEntity{
    private Boolean type;
    private String title;

    @Convert(converter = CreatorConverter.class)
    private Creator creator;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date unlockAt;

    private String createScene;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = ContentConverter.class)
    private Content content;
    @Convert(converter = GeoLocationConverter.class)
    private GeoLocation location;
    private Boolean useSpace;

    @Builder.Default
    private Boolean isCatch = false;
}
