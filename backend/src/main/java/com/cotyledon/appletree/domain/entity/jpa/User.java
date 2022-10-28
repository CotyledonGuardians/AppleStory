package com.cotyledon.appletree.domain.entity.jpa;

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
}
