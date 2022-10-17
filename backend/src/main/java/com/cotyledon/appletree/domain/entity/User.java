package com.cotyledon.appletree.domain.entity;

import com.cotyledon.appletree.web.request.UserRegisterRequest;
import lombok.*;

import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class User extends BaseEntity{
    private String email;
    private String uid;

    public static User create(UserRegisterRequest userRegisterRequest){
        return User.builder()
                .email(userRegisterRequest.getEmail())
                .uid(userRegisterRequest.getUid()).build();
    }
}
