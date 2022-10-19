package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.AppleUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppleUserRepository extends JpaRepository<AppleUser, Long> {
    public Optional<AppleUser> findTopByAppleAndUid(Apple apple,String uid);
}
