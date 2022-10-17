package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.web.request.UserRegisterRequest;
import com.cotyledon.appletree.web.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping()
    public void register(@RequestBody UserRegisterRequest userRegisterRequest){
        userService.register(userRegisterRequest);
    }
}
