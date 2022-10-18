package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.entity.AppleUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppleUserRepository extends JpaRepository<AppleUser, Long> {
}
