package com.cotyledon.appletree.domain.dto;

import lombok.Getter;
import lombok.ToString;
import org.springframework.stereotype.Service;

@Getter
@Service
@ToString
public class ContentDescription {
    private String author;
    private String content;
}
