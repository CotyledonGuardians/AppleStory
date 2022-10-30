package com.cotyledon.appletree.domain.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GeoLocation {

    private Double lat;
    private Double lng;
}
