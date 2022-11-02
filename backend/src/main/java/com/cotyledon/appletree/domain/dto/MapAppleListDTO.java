package com.cotyledon.appletree.domain.dto;

import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MapAppleListDTO {
    private Long id;
    private GeoLocation location;
    private String title;
    private Date createAt;
    private Date unlockAt;
}
