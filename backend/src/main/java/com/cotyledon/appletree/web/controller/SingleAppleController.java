package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.service.FirebaseAuthService;
import com.cotyledon.appletree.common.util.BaseResponse;
import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.web.service.SingleAppleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/single-apple")
@Slf4j
@Api(tags = "나혼자 사과")
public class SingleAppleController {
    private final SingleAppleService singleAppleService;
    private final FirebaseAuthService firebaseAuthService;

    @ApiOperation(value = "사과 만들기")
    @PostMapping
    public ResponseEntity<?> addApple(Principal principal, @RequestBody AppleDTO appleDTO) {
        try {
            singleAppleService.addApple(principal, appleDTO);
        } catch (Exception e) {
            return BaseResponse.fail(e.getMessage());
        }
        return BaseResponse.success();
    }

    @ApiOperation(value = "사과 선물받기")
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
