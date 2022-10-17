package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.web.request.UserRegisterRequest;

import java.util.Map;

public interface UserService {
    void register(UserRegisterRequest userRegisterRequest);
}
