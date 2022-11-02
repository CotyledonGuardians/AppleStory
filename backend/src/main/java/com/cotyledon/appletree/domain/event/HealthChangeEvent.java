package com.cotyledon.appletree.domain.event;

import lombok.*;

@Builder
@Getter
public class HealthChangeEvent {

    private Double currentHealth;
}
