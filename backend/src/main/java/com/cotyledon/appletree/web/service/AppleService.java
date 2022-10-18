package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.domain.entity.Apple;
import com.querydsl.core.Tuple;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

public interface AppleService {
    List<AppleListDTO> getAppleList(String uid, int sort);
}
