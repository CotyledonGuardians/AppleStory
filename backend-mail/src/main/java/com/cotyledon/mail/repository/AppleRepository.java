package com.cotyledon.mail.repository;

import com.cotyledon.mail.domain.entity.Apple;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppleRepository extends JpaRepository<Apple, Long> {
    Optional<Apple> findTop1ByOrderByCreateAtDesc();
}
