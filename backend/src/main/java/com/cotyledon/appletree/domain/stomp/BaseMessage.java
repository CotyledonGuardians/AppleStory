package com.cotyledon.appletree.domain.stomp;

import lombok.*;

@Getter
@Builder
@ToString
public class BaseMessage {

    private String command;
    private Object data;
}
