package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.RoomDTO;
import com.cotyledon.appletree.service.LockAppleRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // 필요한 AppleDTO 속성
    // title, teamName (creator), unlockAt
    @PostMapping("/lock-apple-room")
    public ResponseEntity<?> reserveLockAppleRoom(Principal principal, @RequestBody AppleDTO apple) {

        RoomDTO roomDTO = lockAppleRoomService.reserveRoomAndGetRoomDTO(principal.getName(), apple);

        return ResponseEntity.ok(roomDTO);
    }
}
