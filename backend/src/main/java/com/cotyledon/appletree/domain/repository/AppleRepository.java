package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppleRepository extends JpaRepository<Apple, Long> {
    List<Apple> findAllByUser(User user);
}
