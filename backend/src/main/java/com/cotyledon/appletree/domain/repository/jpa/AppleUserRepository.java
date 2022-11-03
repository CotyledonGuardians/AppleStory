package com.cotyledon.appletree.domain.repository.jpa;

import com.cotyledon.appletree.domain.entity.jpa.Apple;
import com.cotyledon.appletree.domain.entity.jpa.AppleUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AppleUserRepository extends JpaRepository<AppleUser, Long> {
    public Optional<AppleUser> findTopByAppleAndUid(Apple apple,String uid);
    Optional<AppleUser> findByApple_IdaAndUid(Long id, String uid);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE AppleUser au \n" +
            "SET au.isShow=CASE au.isShow \n" +
            "    WHEN TRUE THEN FALSE\n" +
            "    ELSE TRUE END \n" +
            "WHERE au.uid=:uid AND au.apple=:apple")
    int updateIsShowByAppleAndUid(Apple apple, String uid);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE AppleUser au \n" +
            "SET au.isOpen=true \n" +
            "WHERE au.uid=:uid AND au.apple=:targetApple")
    int updateIsOpenByAppleAndUid(@Param("targetApple") Apple apple, @Param("uid") String name);

    int countByUid(String uid);
}
