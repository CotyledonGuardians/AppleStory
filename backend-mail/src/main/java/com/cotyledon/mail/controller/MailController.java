package com.cotyledon.mail.controller;

import com.cotyledon.mail.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/mail")
@RequiredArgsConstructor
@Slf4j
public class MailController {
    private final MailService mailService;

    @GetMapping("/send")
    public ResponseEntity<?> sendEmailToRecentAppleCreator() {
        mailService.sendMailToLatestAppleCreator();
        return null;
    }
}
