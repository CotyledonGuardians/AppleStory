package com.cotyledon.mail.domain.dto;

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

