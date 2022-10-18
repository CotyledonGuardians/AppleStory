package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.dto.UserDTO;
import com.cotyledon.appletree.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Override
    public void register(UserDTO userDTO) throws Exception{
        userRepository.save(userDTO.toUserEntity());
    }
}
