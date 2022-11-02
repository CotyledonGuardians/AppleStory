package com.cotyledon.appletree.domain.stomp;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HealthMessageData {

    private Double currentHealth;
}
