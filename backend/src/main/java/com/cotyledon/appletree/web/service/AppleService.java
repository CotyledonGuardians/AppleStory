package com.cotyledon.appletree.web.service;

import java.security.Principal;

public interface AppleService {
    void showApple(Principal principal, Long appleId) throws Exception;
    void openApple(Principal principal, Long appleId) throws Exception;
}
