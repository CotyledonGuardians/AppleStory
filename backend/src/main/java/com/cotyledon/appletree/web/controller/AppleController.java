package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.util.BaseResponse;
import com.cotyledon.appletree.web.service.AppleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

     @PutMapping("/open/{id}")
     public ResponseEntity<?> openApple(Principal principal, @PathVariable("id") Long appleId) {
          try {
               appleService.openApple(principal, appleId);
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }
          return BaseResponse.success();
     }
}
