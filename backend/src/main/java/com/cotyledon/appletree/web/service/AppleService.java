package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;

public interface AppleService {
    Page<AppleListDTO> getOpenAppleList(String uid, int sort, Pageable pageable);
    Page<AppleListDTO> getCloseAppleList(String uid, int sort, Pageable pageable);
    void showApple(Principal principal, Long appleId) throws Exception;
}
