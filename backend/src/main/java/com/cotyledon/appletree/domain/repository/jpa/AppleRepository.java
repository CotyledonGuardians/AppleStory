package com.cotyledon.appletree.domain.repository.jpa;

import com.cotyledon.appletree.domain.entity.jpa.Apple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AppleRepository extends JpaRepository<Apple, Long> {
    @Query("SELECT a\n" +
            "FROM Apple a\n" +
            "WHERE a.unlockAt < current_time AND a.id=:appleId AND a.isCatch=true")
    Optional<Apple> findOpenableAppleById(@Param("appleId") Long appleId);
}
