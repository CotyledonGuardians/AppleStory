package com.cotyledon.appletree.domain.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LocationAppleListDTO {
    private Long id;
    private GeoLocation location;
}
