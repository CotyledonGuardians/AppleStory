package com.cotyledon.appletree.domain.stomp;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BaseMessage {

    private String command;
    private Object data;

    public static BaseMessage withCommandAndData(String command, Object data) {
        return BaseMessage.builder()
                .command(command)
                .data(data)
                .build();
    }
}
