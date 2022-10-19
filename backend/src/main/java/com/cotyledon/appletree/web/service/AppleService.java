package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AppleService {
    Page<AppleListDTO> getAppleList(String uid, int sort, Pageable pageable);
}
