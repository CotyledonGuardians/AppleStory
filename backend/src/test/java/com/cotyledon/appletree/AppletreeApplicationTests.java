package com.cotyledon.appletree;

import com.cotyledon.appletree.domain.dto.*;
import com.cotyledon.appletree.service.MultiAppleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootTest
class AppletreeApplicationTests {
	@Autowired
	MultiAppleService multiAppleService;

	@Test
	void contextLoads() throws ParseException {
		Creator creator = new Creator();

		creator.setTeamName("뾰로롱");
		creator.setHostUid("nxOFWLP3R2e5MuH60EO2teH7hbR2");
		Member member = new Member();
		member.setNickname("선아");
		member.setUid("nxOFWLP3R2e5MuH60EO2teH7hbR2");
//		Member member2 = new Member();
//		member2.setNickname("옌");
//		member2.setUid("uglPqseiY1NkD8MLqgTlwoSvFPi2");
		Member member3 = new Member();
		member3.setNickname("잠송");
		member3.setUid("mU3O1NplvLMuALIBNxk3REAT9zH2");
		List<Member> memberList = new ArrayList<>();
		memberList.add(member);//memberList.add(member2);
//		memberList.add(member3);
		creator.setMember(memberList);

		Content content = new Content();
		ContentDescription text = new ContentDescription();
		text.setAuthor(member.getUid());
		text.setContent("가가가가가나나나나라라라마마바ㅏㅂ바바사사사");
//		ContentDescription text2 = new ContentDescription();
//		text2.setAuthor(member2.getUid());
//		text2.setContent("먹기만 하는 나는 먹보 옌");
		ContentDescription text3 = new ContentDescription();
		text3.setAuthor(member3.getUid());
		text3.setContent("자기만 하는 나는 잠송");

		List<ContentDescription> textList = new ArrayList<>();
		textList.add(text);//textList.add(text2);
//		textList.add(text3);

		ContentDescription photo = new ContentDescription();
		photo.setAuthor(member.getUid());
		photo.setContent("https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6fbae7af-2d2c-480a-be2d-b22555740f72%2F90kp8a97j2v3zw76knj9.jpg?table=block&id=1f106409-460c-4bb8-91f1-af8346723cec&spaceId=e5a545c1-346f-429c-9782-69d6c73c8f56&width=2000&userId=9eb441b3-ccee-4ac7-ba59-a7943b22ef9f&cache=v2");
		ContentDescription photo2 = new ContentDescription();
		photo2.setAuthor(member3.getUid());
		photo2.setContent("https://upload3.inven.co.kr/upload/2021/11/05/bbs/i16089346296.jpg?MW=800");
		List<ContentDescription> photoList = new ArrayList<>();
		photoList.add(photo); //photoList.add(photo2);

		ContentDescription audio = new ContentDescription();
		audio.setAuthor(member.getUid());
		audio.setContent("https://firebasestorage.googleapis.com/v0/b/apple-tree-7f863.appspot.com/o/test%2FSymphony%20No.6%20(1st%20movement).mp3?alt=media&token=f7e2f878-3466-4726-aa96-50470dd96b1d");
		List<ContentDescription> audioList = new ArrayList<>();
		audioList.add(audio);

		ContentDescription video = new ContentDescription();
		video.setAuthor(member3.getUid());
		video.setContent("https://www.youtube.com/embed/A8t94OfiATU");
		List<ContentDescription> videoList = new ArrayList<>();
		videoList.add(video);

		content.setText(textList);
		content.setPhoto(photoList);
		content.setAudio(audioList);
		content.setVideo(videoList);

		String DEFAULT_PATTERN = "yyyy-MM-dd HH:mm:ss";
		String yourDateString = "2022-11-07 10:40:00";
		DateFormat formatter = new SimpleDateFormat(DEFAULT_PATTERN);
		Date myDate = formatter.parse(yourDateString);

		GeoLocation location = new GeoLocation();
		location.setLat(36.355590);
		location.setLng(12.298500);

		AppleDTO apple = new AppleDTO();
		apple.setType(true);
		apple.setTitle("떴따뿅");
		apple.setCreator(creator);
		apple.setUnlockAt(myDate);
		apple.setContent(content);
		apple.setLocation(location);
		apple.setUseSpace(false);
		apple.setIsCatch(false);

		Set<String> uids = new HashSet<String>();
		uids.add("nxOFWLP3R2e5MuH60EO2teH7hbR2");
//		uids.add("uglPqseiY1NkD8MLqgTlwoSvFPi2");
//		uids.add("mU3O1NplvLMuALIBNxk3REAT9zH2");

		multiAppleService.saveAppleAndAppleUsers(apple,uids);

		System.out.println("저장완료옹");
	}

}
