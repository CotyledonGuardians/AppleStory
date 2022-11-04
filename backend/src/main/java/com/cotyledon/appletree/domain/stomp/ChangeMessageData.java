package com.cotyledon.appletree.domain.stomp;

import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChangeMessageData {

    private Map<String, Integer> uidToIndex;
    private ArrayList<LockAppleRoomUserStatus> Statuses;
    private String hostUid;

    public static ChangeMessageData withHostUid(String hostUid) {
        return ChangeMessageData.builder()
                .uidToIndex(new HashMap<>())
                .Statuses(new ArrayList<>())
                .hostUid(hostUid)
                .build();
    }
}
