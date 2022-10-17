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
public class AppleUser implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apple_id")
    private Apple apple;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String userName;
    private boolean isShow;
    private boolean isOpen;
}
