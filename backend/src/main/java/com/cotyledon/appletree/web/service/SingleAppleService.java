package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.repository.AppleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;

public interface SingleAppleService {
    public void addApple(Principal principal, AppleDTO appleDTO) throws Exception;
}
