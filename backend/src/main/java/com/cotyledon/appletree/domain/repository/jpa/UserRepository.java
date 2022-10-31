package com.cotyledon.appletree.domain.repository.jpa;

import com.cotyledon.appletree.domain.entity.jpa.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
