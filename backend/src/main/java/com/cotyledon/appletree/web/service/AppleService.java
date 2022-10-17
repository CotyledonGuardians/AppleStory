package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.entity.Apple;

import java.util.List;
import java.util.Optional;

public interface AppleService {
    List<Apple> getAppleList(int sort);
    Optional<Apple> getAppleDetail(long id);
}
