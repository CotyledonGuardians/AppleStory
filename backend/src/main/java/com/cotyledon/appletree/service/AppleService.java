package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.domain.dto.LocationAppleListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;
import java.util.List;

public interface AppleService {
    Page<AppleListDTO> getOpenAppleList(String uid, int sort, Pageable pageable);
    Page<AppleListDTO> getCloseAppleList(String uid, int sort, Pageable pageable);
    void showApple(Principal principal, Long appleId) throws Exception;
    void openApple(Principal principal, Long appleId) throws Exception;
    Object getAppleDetail(Principal principal, Long id) throws  Exception;
    int getMyAppleCount(Principal principal) throws Exception;
    List<LocationAppleListDTO> getAppleList(Principal principal) throws Exception;
}
