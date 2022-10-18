package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.UserDTO;

public interface UserService {
    void register(UserDTO userDTO) throws Exception;
}
