package com.cotyledon.appletree.domain.event;

import com.cotyledon.appletree.domain.stomp.HealthMessageData;
import lombok.*;

@Builder
@Getter
@ToString
public class HealthChangeEvent {

    private Long appleId;
    private HealthMessageData healthMessageData;
}
