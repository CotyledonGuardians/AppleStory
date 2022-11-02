package com.cotyledon.appletree.websocket.stompCommandHandler;

import com.cotyledon.appletree.domain.entity.redis.UnlockAppleRoom;
import com.cotyledon.appletree.domain.repository.collection.StompUserDAO;
import com.cotyledon.appletree.domain.stomp.Subscription;
import com.cotyledon.appletree.exception.InvalidStompMessageExceptionBuilder;
import com.cotyledon.appletree.service.AppleService;
import com.cotyledon.appletree.service.FirebaseAuthService;
import com.cotyledon.appletree.service.LockAppleRoomService;
import com.cotyledon.appletree.service.UnlockAppleRoomService;
import com.google.firebase.auth.FirebaseAuthException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class SubscribeHandler implements StompCommandHandler {

    private final AppleService appleService;
    private final LockAppleRoomService lockAppleRoomService;
    private final UnlockAppleRoomService unlockAppleRoomService;
    private final StompUserDAO stompUserDAO;
    private final FirebaseAuthService firebaseAuthService;
    private final InvalidStompMessageExceptionBuilder exception;

    @Override
    public void handle(StompHeaderAccessor stompHeaderAccessor) {

        log.info("SUBSCRIBE header: {}", stompHeaderAccessor);

        String sid = stompHeaderAccessor.getSessionId();

        // Auth
        String uid = uidOf(stompHeaderAccessor);

        // uid 중복시 false
        if (!stompUserDAO.load(sid, uid)) {
            throw exception.buildWithReleasing(sid);
        }

        // 이 라인을 통과하면 올바른 형식의 구독 정보임이 보장됨 (유효성이 보장되지는 않음)
        Subscription subscription = Subscription.of(stompHeaderAccessor, exception);

        log.info("subscription: {}", subscription);

        if (!enter(subscription, sid, uid)) {
            log.info("입장 실패");

            throw exception.buildWithReleasing(sid);
        }
    }

    // join 이벤트 발행
    private boolean enter(Subscription subscription, String sid, String uid) {
        switch (subscription.getRoomType()) {
            case LOCK:
                return lockAppleRoomService.enterRoomAndSaveRoomUser(uid, subscription.getRoomId());
            case UNLOCK:
                // 해제는 appleId 가 곧 roomId 임
                Long appleId = subscription.getAppleId();

                if (!catchable(uid, appleId)) {
                    throw exception.buildWithReleasing(sid);
                }

                saveAndSetRoomIfAbsent(appleId);
                return unlockAppleRoomService.enterRoomAndSaveRoomUser(uid, appleId);
            default:
                throw exception.buildWithReleasing(sid);
        }
    }

    private void saveAndSetRoomIfAbsent(Long appleId) {

        Optional<UnlockAppleRoom> roomOptional = unlockAppleRoomService.findById(appleId);

        if (roomOptional.isPresent()) {
            return;
        }

        int appleSize = appleService.getAppleSize(appleId);
        double initHealth = appleService.getInitHealth(appleId);

        UnlockAppleRoom room = UnlockAppleRoom.builder()
                .appleId(appleId)
                .totalHealth(initHealth)
                .currentHealth(initHealth)
                .appleSize(appleSize)
                .build();

        unlockAppleRoomService.save(room);
    }

    private boolean catchable(String uid, Long appleId) {

        if (appleService.findById(appleId).isEmpty()) {
            log.info("No Such Apple");
            return false;
        }

        if (appleService.caught(appleId)) {
            log.info("Apple Already Caught");
            return false;
        }

        if (!appleService.containsMember(appleId, uid)) {
            log.info("Unauthorized");
            return false;
        }

        return true;
    }

    private String uidOf(StompHeaderAccessor stompHeaderAccessor) {
        String idToken = stompHeaderAccessor.getFirstNativeHeader("accessToken");

        if (idToken == null || idToken.isBlank()) {
            throw exception.buildWithReleasing(stompHeaderAccessor.getSessionId());
        }

        try {
            return firebaseAuthService.getUidFromIdToken(idToken);
        } catch (FirebaseAuthException e) {
            throw exception.buildWithReleasing(stompHeaderAccessor.getSessionId());
        }
    }
}
