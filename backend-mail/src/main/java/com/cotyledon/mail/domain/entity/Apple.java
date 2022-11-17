package com.cotyledon.mail.domain.entity;

import com.cotyledon.mail.domain.dto.Content;
import com.cotyledon.mail.domain.dto.GeoLocation;
import com.cotyledon.mail.domain.util.ContentConverter;
import com.cotyledon.mail.domain.dto.Creator;
import com.cotyledon.mail.domain.util.CreatorConverter;
import com.cotyledon.mail.domain.util.GeoLocationConverter;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import java.util.Date;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Apple extends BaseEntity{
    private Boolean type;
    private String title;

    @Column(columnDefinition = "TEXT")
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
