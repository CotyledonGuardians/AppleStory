package com.cotyledon.appletree.web.controller;

import com.cotyledon.appletree.domain.dto.AppleDTO;
import com.cotyledon.appletree.domain.dto.RoomDTO;
import com.cotyledon.appletree.service.LockAppleRoomService;
import com.cotyledon.appletree.service.MultiAppleService;
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
    private final MultiAppleService multiAppleService;

    // 토큰 리프레시용
    // connect, subscribe 전에 사용, send 시에는 사용하지 않음
    @GetMapping("/knock")
    public ResponseEntity<?> knock() {
        return ResponseEntity.ok().build();
    }

    // 필요한 AppleDTO 속성
    // title, teamName (creator), unlockAt
    @PostMapping("/lock-apple-room")
    public ResponseEntity<?> reserveLockAppleRoom(Principal principal, @RequestBody AppleDTO apple) {

        long appleId = multiAppleService.reserveAppleAndGetId();

        RoomDTO roomDTO = lockAppleRoomService.reserveRoomAndGetRoomDTO(principal.getName(), apple, appleId);

        return ResponseEntity.ok(roomDTO);
    }
}
