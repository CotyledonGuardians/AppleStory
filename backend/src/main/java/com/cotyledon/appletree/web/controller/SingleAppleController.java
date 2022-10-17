package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.util.BaseResponse;
import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.web.service.SingleAppleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/single-apple")
@Slf4j
public class SingleAppleController {
    private final SingleAppleService singleAppleService;

    @PostMapping
    public ResponseEntity<?> addApple(AppleDTO appleDTO) {
        try {
            singleAppleService.addApple(appleDTO);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage());
        }
        return BaseResponse.success();
    }
}
