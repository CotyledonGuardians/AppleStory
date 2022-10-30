package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.jpa.Apple;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LockAppleDTO {
    private Boolean type;
    private String title;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date unlockAt;

    private String teamName;
    private String nickName;
    private int number;
    private List<String> content;

    public static LockAppleDTO of(Apple apple){
        List<String> list = contentType(apple.getContent(), apple.getUseSpace());
        return LockAppleDTO.builder()
                .type(apple.getType())
                .title(apple.getTitle())
                .createAt(apple.getCreateAt())
                .unlockAt(apple.getUnlockAt())
                .teamName(apple.getCreator().getTeamName())
                .number(apple.getCreator().getMember().size())
                .content(list)
                .build();
    }

    private static List<String> contentType(Content content, boolean useSpace){
        List<String> list = new ArrayList<>();
        if(content.getAudio().size()!=0)
            list.add("audio");
        if(content.getPhoto().size()!=0)
            list.add("photo");
        if(content.getText().size()!=0)
            list.add("text");
        if(content.getVideo().size()!=0)
            list.add("video");
        if(useSpace)
            list.add("space");
        return list;
    }
}
