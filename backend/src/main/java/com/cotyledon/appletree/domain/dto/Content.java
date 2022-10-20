package com.cotyledon.appletree.domain.dto;

import lombok.Getter;
import lombok.ToString;
import org.springframework.stereotype.Service;

import java.util.List;

@Getter
@Service
@ToString
public class Content {
    private List<ContentDescription> text;
    private List<ContentDescription> photo;
    private List<ContentDescription> audio;
    private List<ContentDescription> video;
}
