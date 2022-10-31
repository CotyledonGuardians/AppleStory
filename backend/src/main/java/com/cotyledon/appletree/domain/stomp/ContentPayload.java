package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.domain.dto.Content;
import lombok.*;

@Builder
@Getter
@ToString
public class ContentPayload {

    private String nickname;
    private Content content;
}
