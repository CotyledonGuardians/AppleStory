package com.cotyledon.mail.service;

import com.cotyledon.mail.domain.dto.Member;
import com.cotyledon.mail.domain.entity.Apple;
import com.cotyledon.mail.repository.AppleRepository;
import com.google.firebase.auth.FirebaseAuthException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {
    private final JavaMailSender javaMailSender;
    private final AppleRepository appleRepository;
    private final FirebaseAuthService firebaseAuthService;
    @Transactional
    public void sendMailToLatestAppleCreator() {
        Apple apple = appleRepository.findTop1ByOrderByCreateAtDesc().orElseThrow(IllegalArgumentException::new);
        List<Member> members = apple.getCreator().getMember();
        String appleTitle = apple.getTitle();
        Date createAt = apple.getCreateAt();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy년 MM월 dd일");
        String strCreateAt = simpleDateFormat.format(createAt);

        members.forEach(member ->  {
            try {
                String memberEmail = firebaseAuthService.getEmailByUid(member.getUid());
                System.out.println(memberEmail);

                MimeMessage message = javaMailSender.createMimeMessage();
                message.addRecipients(MimeMessage.RecipientType.TO, memberEmail); // 보내는 대상
                message.setSubject("[사과나무 추억걸렸네] 친구들과의 추억을 담은 사과를 열어보세요!"); // 제목
                
                StringBuffer msg = new StringBuffer();
                msg.append("<div style=\"width: 600px; border: 3px solid #4c4026; padding: 2em; border-radius: 20px; background-color: #f7f3ef;\">");
                msg.append("<img width=\"100\" height=\"100\" src=\"https://firebasestorage.googleapis.com/v0/b/apple-tree-7f863.appspot.com/o/logo.png?alt=media&token=1db5074b-e77b-4b86-b6b2-4e64340ee1ff\" alt=\"\" loading=\"lazy\">");
                msg.append("<br>");
                msg.append("<strong style=\"color: #4c4036; font-size: 30px;\">안녕하세요, '사과나무 추억걸렸네' 입니다.</strong>");
                msg.append("<p style=\"color: #4c4036; font-size: 16px;\"><span style=\"color:#4c4036\">친구들과 추억을 담은 사과를 수확할 때가 왔습니다.");
                msg.append("<br>");
                msg.append("'사과나무 추얼걸렸네'에 로그인하시어 함께 사과를 수확해보세요. </span>");
                msg.append("<br>");
                msg.append("<br>");
                msg.append("<span style=\"color:#4c4036\">수확할 사과 이름: "+appleTitle);
                msg.append("<br>");
                msg.append("심은 날짜: "+strCreateAt+"</span>");
                msg.append("</p>");
                msg.append("<br>");
                msg.append("<hr>");
                msg.append("<p style=\"color: #4c4036; \">도움이 필요하시면 applestory.cotyledon@gmail.com 로 연락주세요.</p>");
                msg.append("<p style=\"color: #4c4036; \">- '사과나무 추억걸렸네' 드림 -</p>");
                msg.append("</div>");

                message.setText(msg.toString(), "utf-8", "html"); //내용
                message.setFrom(new InternetAddress("appletree.cotyledon@gmail.com","사과나무추억걸렸네")); //보내는 사람

                javaMailSender.send(message);
            } catch (FirebaseAuthException e) {
                log.debug("사용자 정보를 가져오는데 실패했습니다.");
            } catch (MailException e) {
                log.debug("메일 전송에 실패했습니다.::{}",e.getMessage());
            } catch (MessagingException e) {
                log.debug("메일 전송에 실패했습니다.::{}",e.getMessage());
            } catch (UnsupportedEncodingException e) {
                log.debug("메일 전송에 실패했습니다.::{}",e.getMessage());
            }
        });
    }
}
