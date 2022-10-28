package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.domain.dto.RoomDTO;
import com.cotyledon.appletree.service.LockAppleRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/ws-front")
@RequiredArgsConstructor
@Slf4j
public class WebSocketFront {

    private final LockAppleRoomService lockAppleRoomService;

    @GetMapping("/knock")
    public ResponseEntity<?> knock() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/lock-apple-room")
    public ResponseEntity<?> reserveLockRoom(Principal principal) {

        RoomDTO roomDTO = lockAppleRoomService.makeRoomAndGet(principal.getName());

        return ResponseEntity.ok(roomDTO);
    }
}
