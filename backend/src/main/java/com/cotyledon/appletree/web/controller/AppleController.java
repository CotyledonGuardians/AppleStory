package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.util.BaseResponse;
import com.cotyledon.appletree.domain.dto.AppleListDTO;
import com.cotyledon.appletree.web.service.AppleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/apple")
@RequiredArgsConstructor
public class AppleController {
     private final AppleService appleService;
     public ResponseEntity<?> getAppleList(Principal principal, @RequestBody int sort) {
          List<AppleListDTO> list = new ArrayList<>();
          try{
               list = appleService.getAppleList(principal.getName(), sort);
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }

          return BaseResponse.success(list);
     }
}
