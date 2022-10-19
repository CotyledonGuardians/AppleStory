package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.entity.Apple;
import com.cotyledon.appletree.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppleRepository extends JpaRepository<Apple, Long> {
}
