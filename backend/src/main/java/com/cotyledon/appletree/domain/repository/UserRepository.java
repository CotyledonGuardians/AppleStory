package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
