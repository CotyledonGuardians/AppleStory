package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AppleRepository extends JpaRepository<Apple, Long> {
    @Query("SELECT a\n" +
            "FROM Apple a\n" +
            "WHERE a.unlockAt < current_time AND a.id=:appleId")
    Optional<Apple> findOpenableAppleById(@Param("appleId") Long appleId);
}
