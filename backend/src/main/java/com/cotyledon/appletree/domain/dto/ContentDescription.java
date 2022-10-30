package com.cotyledon.appletree.domain.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ContentDescription {

    private String author;
    private String content;

    public static final ContentDescription DUMMY = ContentDescription.builder()
                .author("UNKNOWN")
                .content("NO_CONTENT")
                .build();
}
