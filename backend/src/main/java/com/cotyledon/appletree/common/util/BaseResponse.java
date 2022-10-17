package com.cotyledon.appletree.common.util;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Slf4j
public class BaseResponse {

    private Boolean success;
    private String message;
    private Object body;

    public static ResponseEntity<?> success() {
        log.debug("결과 바디가 없는 OK 응답이 나갑니다.");
        return ResponseEntity.ok().body(BaseResponse.builder().success(true).build());
    }

    public static ResponseEntity<?> success(Object body) {
        log.debug("결과 바디가 있는 OK 응답이 나갑니다. body: {}", body);
        return ResponseEntity.ok().body(BaseResponse.builder().success(true).body(body).build());
    }

    public static ResponseEntity<?> fail(String message) {
        log.debug("실패 응답이 나갑니다. message: {}", message);
        return ResponseEntity.ok().body(BaseResponse.builder().success(false).message(message).build());
    }
}
