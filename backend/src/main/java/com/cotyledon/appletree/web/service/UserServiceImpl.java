package com.cotyledon.appletree.web.service;

import com.cotyledon.appletree.domain.entity.User;
import com.cotyledon.appletree.domain.repository.UserRepository;
import com.cotyledon.appletree.web.request.UserRegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void register(UserRegisterRequest userRegisterRequest) {
        User user = User.create(userRegisterRequest);
        userRepository.save(user);
    }
}
