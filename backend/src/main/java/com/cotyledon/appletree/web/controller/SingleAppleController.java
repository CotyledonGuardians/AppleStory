package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.service.FirebaseAuthService;
import com.cotyledon.appletree.common.util.BaseResponse;
import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.web.service.SingleAppleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/single-apple")
@Slf4j
public class SingleAppleController {
    private final SingleAppleService singleAppleService;
    private final FirebaseAuthService firebaseAuthService;

    @PostMapping
    public ResponseEntity<?> addApple(Principal principal, @RequestBody AppleDTO appleDTO) {
        try {
            singleAppleService.addApple(principal, appleDTO);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage());
        }
        return BaseResponse.success();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> receiveApple(Principal principal, @PathVariable("id") long appleId) {
        try {
            singleAppleService.receiveApple(principal, appleId);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage());
        }
        return BaseResponse.success();
    }
}
