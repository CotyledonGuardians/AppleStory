package com.cotyledon.appletree.service;

public interface AppleRoomUserService {

    boolean releaseRoomUserByUidAndRemoveRoomIfEmpty(String uid);
}
