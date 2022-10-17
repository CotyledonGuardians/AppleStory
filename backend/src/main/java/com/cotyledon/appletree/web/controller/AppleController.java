package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.web.service.AppleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/apple")
@RequiredArgsConstructor
public class AppleController {
     private final AppleService appleService;
}
