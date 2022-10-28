package com.cotyledon.appletree.websocket.stompCommandHandler;

import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import com.cotyledon.appletree.domain.stomp.Subscription;
import com.cotyledon.appletree.exception.InvalidStompHeaderExceptionBuilder;
import com.cotyledon.appletree.service.FirebaseAuthService;
import com.cotyledon.appletree.service.LockAppleRoomService;
import com.google.firebase.auth.FirebaseAuthException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SubscribeHandler implements StompCommandHandler {

    private final LockAppleRoomService lockAppleRoomService;
    private final StompUserDAO stompUserDAO;
    private final FirebaseAuthService firebaseAuthService;
    private final InvalidStompHeaderExceptionBuilder exception;

    @Override
    public void handle(StompHeaderAccessor stompHeaderAccessor) {

        String sid = stompHeaderAccessor.getSessionId();

        // Auth
        String uid = uidOf(stompHeaderAccessor);

        // uid 중복시 false
        if (!stompUserDAO.load(sid, uid)) {
            throw exception.withReleasing(sid);
        }

        // 이 라인을 통과하면 올바른 형식의 구독 정보임이 보장됨 (유효성이 보장되지는 않음)
        Subscription subscription = Subscription.of(stompHeaderAccessor, exception);

        log.info("subscription: {}", subscription);

        if (!enter(subscription, sid, uid)) {
            log.info("입장 실패");

            throw exception.withReleasing(sid);
        }
    }

    // join 이벤트 발행
    private boolean enter(Subscription subscription, String sid, String uid) {
        switch (subscription.getRoomType()) {
            case LOCK:
                return lockAppleRoomService.enterRoomAndSaveRoomUser(uid, subscription.getRoomId());
            case UNLOCK:
                // TODO: unlock 서비스로 교체
                log.warn("여기 unlock 서비스로 교체해야 함~~~~~~~");
                return lockAppleRoomService.enterRoomAndSaveRoomUser(uid, subscription.getRoomId());
            default:
                throw exception.withReleasing(sid);
        }
    }

    private String uidOf(StompHeaderAccessor stompHeaderAccessor) {
        String idToken = stompHeaderAccessor.getFirstNativeHeader("accessToken");

        if (idToken == null || idToken.isBlank()) {
            throw exception.withReleasing(stompHeaderAccessor.getSessionId());
        }

        try {
            return firebaseAuthService.getUidFromIdToken(idToken);
        } catch (FirebaseAuthException e) {
            throw exception.withReleasing(stompHeaderAccessor.getSessionId());
        }
    }
}
