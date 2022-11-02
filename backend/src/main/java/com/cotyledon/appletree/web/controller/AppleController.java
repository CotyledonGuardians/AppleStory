package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.util.BaseResponse;

import com.cotyledon.appletree.domain.dto.AppleListDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.cotyledon.appletree.service.AppleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/apple")
@RequiredArgsConstructor
@Slf4j
@Api(tags = "사과")
public class AppleController {
     private final AppleService appleService;
     @ApiOperation(value = "잠긴 사과 리스트")
     @GetMapping("/close")
     public ResponseEntity<?> getCloseAppleList(Principal principal, @RequestParam(value="sort") int sort, @RequestParam(value="page") int page, @RequestParam(value="size") int size) {
          Pageable pageable = PageRequest.of(page, size);
          Page<AppleListDTO> list;
          try{
               list = appleService.getCloseAppleList(principal.getName(), sort, pageable);
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }

          return BaseResponse.success(list);
     }

     @ApiOperation(value = "열린 사과 리스트")
     @GetMapping("/open")
     public ResponseEntity<?> getOpenAppleList(Principal principal, @RequestParam(value="sort") int sort, @RequestParam(value="page") int page, @RequestParam(value="size") int size) {
          Pageable pageable = PageRequest.of(page, size);
          Page<AppleListDTO> list;
          try {
               list = appleService.getOpenAppleList(principal.getName(), sort, pageable);
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }

          return BaseResponse.success(list);
     }

     @ApiOperation(value = "사과 리스트")
     @GetMapping
     public ResponseEntity<?> getAppleList(Principal principal){
          try {
               return BaseResponse.success(appleService.getAppleList(principal));
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }
     }

     @ApiOperation(value = "사과 상세보기")
     @GetMapping("/{id}")
     public ResponseEntity<?> getAppleDetail(Principal principal, @PathVariable(value = "id") Long id){
          try {
               return BaseResponse.success(appleService.getAppleDetail(principal, id));
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }
     }

     @ApiOperation(value = "로그인 유저의 총 사과 개수")
     @GetMapping("/count")
     public ResponseEntity<?> getMyAppleCount(Principal principal){
          try {
               return BaseResponse.success(appleService.getMyAppleCount(principal));
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }
     }

     @ApiOperation(value = "사과 보기 수정 (사용 x)")
     @PutMapping("/{id}")
     public ResponseEntity<?> showApple(Principal principal, @PathVariable("id") Long appleId) {
          try {
               appleService.showApple(principal, appleId);
          } catch (Exception e) {
               return BaseResponse.fail(e.getMessage());
          }
          return BaseResponse.success();
     }

     @ApiOperation(value = "사과 해제 수정 (사용 x)")
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
