package com.cotyledon.appletree.domain.event;

import lombok.*;

@Getter
@Builder
public class AppleSaveEvent {

    private Long appleId;
    private String roomId;
}
