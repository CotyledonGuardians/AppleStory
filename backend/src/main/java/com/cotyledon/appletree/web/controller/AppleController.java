package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.util.BaseResponse;
import com.cotyledon.appletree.web.service.SingleAppleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/apple")
@Slf4j
public class AppleController {
    private final SingleAppleService singleAppleService;

    @GetMapping
    public ResponseEntity<?> getAppleDetail(Principal principal, @RequestParam(value = "id") Long id) throws Exception {
        System.out.println(id);
        return BaseResponse.success(singleAppleService.getAppleDetail(principal, id));
    }
}
