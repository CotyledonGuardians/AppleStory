package com.cotyledon.appletree.domain.repository;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.querydsl.core.Tuple;

import java.util.List;

public interface AppleCustomRepository {

    List<AppleListDTO> findByUidWithPaging(String uid, int sort);
}
