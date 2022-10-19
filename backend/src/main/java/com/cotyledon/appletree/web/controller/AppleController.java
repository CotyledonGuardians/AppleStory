package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.util.BaseResponse;
import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.web.service.AppleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/apple")
@RequiredArgsConstructor
@Slf4j
public class AppleController {
     private final AppleService appleService;

     @GetMapping("/close")
     public ResponseEntity<?> getCloseAppleList(Principal principal, @RequestParam(value="sort") int sort, @RequestParam(value="page") int page, @RequestParam(value="size") int size) {
          Pageable pageable = PageRequest.of(page, size);
          log.debug("page:{},{}", page, size);
          Page<AppleListDTO> list;
          try{
               list = appleService.getCloseAppleList(principal.getName(), sort, pageable);
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }

          return BaseResponse.success(list);
     }

     @GetMapping("/open")
     public ResponseEntity<?> getOpenAppleList(Principal principal, @RequestParam(value="sort") int sort, @RequestParam(value="page") int page, @RequestParam(value="size") int size) {
          Pageable pageable = PageRequest.of(page, size);
          log.debug("page:{},{}", page, size);
          Page<AppleListDTO> list;
          try {
               list = appleService.getOpenAppleList(principal.getName(), sort, pageable);
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }

          return BaseResponse.success(list);
     }

     @PutMapping("/{id}")
     public ResponseEntity<?> showApple(Principal principal, @PathVariable("id") Long appleId) {
          try {
               appleService.showApple(principal, appleId);
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }
          return BaseResponse.success();
     }
}
