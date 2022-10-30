package com.cotyledon.appletree.domain.stomp;

import com.cotyledon.appletree.domain.enums.LockAppleRoomUserStage;
import lombok.*;

import static com.cotyledon.appletree.domain.enums.LockAppleRoomUserStage.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LockAppleRoomUserStatus {

    private String nickname;
    private Boolean hasUpload;
    private LockAppleRoomUserStage stage;

    public static LockAppleRoomUserStatus joined() {
        return LockAppleRoomUserStatus.builder()
                .nickname("하드코딩된 닉네임")
                .hasUpload(false)
                .stage(JOINED)
                .build();
    }

    public static LockAppleRoomUserStatus adding() {
        return LockAppleRoomUserStatus.builder()
                .nickname("하드코딩된 닉네임")
                .hasUpload(false)
                .stage(ADDING)
                .build();
    }

    public static LockAppleRoomUserStatus addedWithNickname(String nickname) {
        return LockAppleRoomUserStatus.builder()
                .nickname(nickname)
                .hasUpload(true)
                .stage(ADDED)
                .build();
    }

    public static LockAppleRoomUserStatus cancelled() {
        return LockAppleRoomUserStatus.builder()
                .nickname("하드코딩된 닉네임")
                .hasUpload(false)
                .stage(CANCELLED)
                .build();
    }

    public static LockAppleRoomUserStatus leftWithoutUploading() {
        return LockAppleRoomUserStatus.builder()
                .nickname("하드코딩된 닉네임")
                .hasUpload(false)
                .stage(LEFT)
                .build();
    }
}
