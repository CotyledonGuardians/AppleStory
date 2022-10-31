package com.cotyledon.appletree.service;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.entity.jpa.Apple;
import com.cotyledon.appletree.domain.repository.jpa.AppleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MultiAppleServiceImpl implements MultiAppleService {

    private final AppleRepository appleRepository;

    @Override
    public void addApple(Principal principal, AppleDTO appleDTO) {
        // TODO: 구현
    }

    @Override
    public Long reserveAppleAndGetId() {
        return appleRepository.save(AppleDTO.ofEmpty().toAppleEntity()).getId();
    }

    @Override
    public void deleteAppleIfEmpty(Long appleId) {

        Optional<Apple> apple = appleRepository.findById(appleId);

        if (apple.isEmpty()) {
            log.warn("NO SUCH APPLE ENTITY");

            return;
        }

        appleRepository.delete(apple.get());
        log.info("예약된 사과를 지움");
    }
}
