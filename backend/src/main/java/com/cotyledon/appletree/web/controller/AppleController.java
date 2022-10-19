package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.util.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.cotyledon.appletree.web.service.AppleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/apple")
@RequiredArgsConstructor
@Slf4j
public class AppleController {
     private final AppleService appleService;
     @PutMapping("/{id}")
     public ResponseEntity<?> showApple(Principal principal, @PathVariable("id") Long appleId) {
          try {
               appleService.showApple(principal, appleId);
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }
          return BaseResponse.success();
     }

    @GetMapping
    public ResponseEntity<?> getAppleDetail(Principal principal, @RequestParam(value = "id") Long id) throws Exception {
        System.out.println(id);
        return BaseResponse.success(appleService.getAppleDetail(principal, id));
    }
}
