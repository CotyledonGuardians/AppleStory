package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.AppleUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AppleUserRepository extends JpaRepository<AppleUser, Long> {
    public Optional<AppleUser> findTopByAppleAndUid(Apple apple,String uid);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE AppleUser au \n" +
            "SET au.isShow=CASE au.isShow \n" +
            "    WHEN TRUE THEN FALSE\n" +
            "    ELSE TRUE END \n" +
            "WHERE au.uid=:uid AND au.apple=:apple")
    int updateIsShowByAppleAndUid(Apple apple, String uid);
}
