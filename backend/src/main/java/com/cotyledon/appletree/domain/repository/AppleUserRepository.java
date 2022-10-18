package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.entity.AppleUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppleUserRepository extends JpaRepository<AppleUser, Long> {

}