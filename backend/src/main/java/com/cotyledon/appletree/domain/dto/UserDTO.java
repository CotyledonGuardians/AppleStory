package com.cotyledon.appletree.domain.dto;

import com.cotyledon.appletree.domain.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserDTO {
    private String email;
    private String uid;

    public static UserDTO of(User User){
        return UserDTO.builder()
                .email(User.getEmail())
                .uid(User.getUid()).build();
    }

    public User toUserEntity(){
        return User.builder()
                .email(this.email)
                .uid(this.uid)
                .build();
    }
}
