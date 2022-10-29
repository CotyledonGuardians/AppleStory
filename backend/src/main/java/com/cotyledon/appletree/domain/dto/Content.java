package com.cotyledon.appletree.domain.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Content {
    private List<ContentDescription> text;
    private List<ContentDescription> photo;
    private List<ContentDescription> audio;
    private List<ContentDescription> video;

    public static Content ofEmpty() {
        return Content.builder()
                .text(new ArrayList<>())
                .photo(new ArrayList<>())
                .audio(new ArrayList<>())
                .video(new ArrayList<>())
                .build();
    }
}
