package com.cotyledon.appletree.domain.entity;

import lombok.*;

import javax.annotation.Nullable;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppleUser extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apple_id")
    private Apple apple;

    @Column(name="user_id", nullable = false)
    private String uid;

    @Column(nullable = false)
    private String userName;
    private Boolean isShow;
    private Boolean isOpen;
}
