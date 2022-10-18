package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.common.util.BaseResponse;
import com.cotyledon.appletree.domain.dto.UserDTO;
import com.cotyledon.appletree.web.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping()
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO){
        try {
            userService.register(userDTO);
        } catch (Exception e){
            return BaseResponse.fail(e.getMessage());
        }
        return BaseResponse.success();
    }
}
