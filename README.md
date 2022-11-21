# 🍎사과나무 추억걸렸네🍏

![그래픽이미지 (1)](exec/img/그래픽이미지.png)

# 📰 프로젝트 개요

**친구들과 재미있게 타임캡슐을 만들어 보세요!**
<br> <br>
추억에는 그때의 생각과 메시지가 있기 마련입니다. <br> 사과에 소중한 추억을 담아 풍성한 사과나무를 만들어 보세요. <br> 약속된 시간이 되면 친구들과 같이 사과를 따서 추억을 꺼내어 보아요.

<br>

# 🗓️ 개발기간

**2022.10.11 ~ 2022.11.18 (6주)**

<br>

# 📽️ UCC

[UCC 바로가기](https://www.youtube.com/watch?v=KiL8vpJiV0E)   
<img src="/uploads/02c4a95fd0a75cbd05452b206099f3c3/전산학개론.png" width="300"/>

<br>

# 🌟 Team

|     Name     |                      김낙현                      |                     송선아                      |                     송제영                      |                     이예은                      |                   조다연                   |                     차송희                      |
| :----------: | :----------------------------------------------: | :---------------------------------------------: | :---------------------------------------------: | :---------------------------------------------: | :----------------------------------------: | :---------------------------------------------: |
| **Profile**  | <img width="145" src="exec/img/Group 207.png"/>  | <img width="150" src="exec/img/Group 209.png"/> | <img width="145" src="exec/img/Group 206.png"/> | <img width="145" src="exec/img/Group 208.png"/> | <img width="150" src="exec/img/yeon.png"/> | <img width="155" src="exec/img/Group 211.png"/> |
| **Position** |               Infra<br />FullStack               |                    FullStack                    |            Team Leader<br />Backend             |                    FullStack                    |            Frontend<br /> UI/UX            |          Frontend<br />UI/UX<br />UCC           |
|   **Git**    | [@Psalmist-KIM](https://github.com/Psalmist-KIM) |     [@Seona98](https://github.com/seona98)      |   [@hooreique](https://github.com/hooreique)    |       [@lye2i](https://github.com/lye2i)        |   [@dus6982](https://github.com/dus6982)   |  [@chasonghui](https://github.com/chasonghui)   |

<br>

# 🛠️ 기술스택

| Tech         | Stack                                        |
| ------------ | -------------------------------------------- |
| **Backend**  | Java, Spring Boot, JPA, RabbitMQ             |
| **Frontend** | React-Native                                 |
| **DataBase** | MySQL, Redis                                 |
| **Tools**    | AWS EC2, Firebase Auth, Firebase Storage, NginX, Docker, GitLab, JIRA, Notion |

<br>

# 📌 시스템 아키텍처

![아키텍처](exec/img/아키텍처.png)

<br>

## 🗃️ ERD

![ERD](exec/img/ERD.png)

<br>

# 🔎 주요 기능

### 1. 메인 화면

| 사과가 없는 경우                                                                                                               | 사과가 있는 경우                                                                                            | 잠긴사과 모달                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <img src="exec/readme/%EB%A9%94%EC%9D%B8-%EC%82%AC%EA%B3%BC%EC%97%86%EB%8A%94%EA%B2%BD%EC%9A%B0.png" width="200" height="400"> | <img src="exec/readme/%EB%A9%94%EC%9D%B8%EC%82%AC%EA%B3%BC%EB%A7%8E%EC%9D%8C.png" width="200" height="400"> | <img src="exec/readme/%EC%9E%A0%EA%B8%B4%EC%82%AC%EA%B3%BC%EB%AA%A8%EB%8B%AC.png" width="200" height="400"> |

### 2. 사과 만들기

- 세션 생성 및 입장
  | 세션 생성 | 세션 입장 | 세션 코드 복사 |
  | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
  | <img src="exec/readme/%EB%B0%A9%EB%A7%8C%EB%93%A4%EA%B8%B0.png" width="200" height="400"> | <img src="exec/readme/%EC%84%B8%EC%85%98.png" width="200" height="400"> | <img src="exec/readme/%EC%84%B8%EC%85%98-%EC%BD%94%EB%93%9C%EB%B3%B5%EC%82%AC.png" width="200" height="400"> |

- DB에 사과 넣기
  | 사과에 추억 담기 | 녹음폼 | 사진 및 동영상 넣기 |
  | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
  | <img src="exec/readme/%EC%82%AC%EA%B3%BC%EB%A7%8C%EB%93%A4%EA%B8%B0.png" width="200" height="400"> | <img src="exec/readme/%EB%85%B9%EC%9D%8C%ED%8F%BC.png" width="200" height="400"> | <img src="exec/readme/%EC%82%AC%EA%B3%BC%EB%8B%B4%EA%B8%B0-%EC%82%AC%EC%A7%84.png" width="200" height="400"> |

### 3. 사과 리스트 보기

| 사과가 없는 경우                                                                          | 열린 사과 목록                                                                                              | 잠김 사과 목록                                                                                              |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <img src="exec/readme/%EC%82%AC%EA%B3%BC%EB%AA%A9%EB%A1%9D.png" width="200" height="400"> | <img src="exec/readme/%EC%97%B4%EB%A6%B0%EC%82%AC%EA%B3%BC%EB%AA%A9%EB%A1%9D.png" width="200" height="400"> | <img src="exec/readme/%EC%9E%A0%EA%B8%B4%EC%82%AC%EA%B3%BC%EB%AA%A9%EB%A1%9D.png" width="200" height="400"> |

### 4. 사과 따기

- 세션 입장 (사과 때리기)
  <br>
  <img src="exec/readme/%EC%82%AC%EA%B3%BC%EB%95%8C%EB%A6%AC%EA%B8%B0.png" width="200" height="400">

### 5. 사과 상세보기

- 잠긴사과 상세보기
  <br>
  <img src="exec/readme/%EC%9E%A0%EA%B9%80%EC%82%AC%EA%B3%BC%EB%94%94%ED%85%8C%EC%9D%BC.png" width="200" height="400">

- 열린사과 상세보기
  | 열린사과 상세보기 | 씨앗 상세보기 | 씨앗 상세보기-다운로드 |
  | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
  | <img src="exec/readme/%EC%97%B4%EB%A6%B0%EC%82%AC%EA%B3%BC%EB%94%94%ED%85%8C%EC%9D%BC.png" width="200" height="400"> | <img src="exec/readme/%EC%94%A8%EC%95%97%ED%99%95%EC%9D%B8.png" width="200" height="400"> | <img src="exec/readme/%EC%94%A8%EC%95%97%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png" width="200" height="400"> |

### 6. 이메일 전송

- 이메일 전송

  <img src="exec/readme/%EC%9D%B4%EB%A9%94%EC%9D%BC%ED%99%95%EC%9D%B8.png" width="200" height="400">

### 7. 지도 보기

- 만든 사과 위치 표시

    <img src="exec/readme/%EC%A7%80%EB%8F%84.png" width="200" height="400">

### 8. 마이 페이지

- 마이페이지

  <img src="exec/readme/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.png" width="200" height="400">

<br>

## 시연영상

[시연영상 바로가기](https://www.youtube.com/watch?v=9pNwGHzRI6g)

<br>

## 🔗 WIKI

📖 [Team Notion](https://chasonghui.notion.site/1202c1502e9b410ea561ee25ee6ac659)

🙌 [Git Convention](https://chasonghui.notion.site/commit-branch-6119490deff242cc9c4afbf3bbe61aa3)

📜 [API 명세서](https://chasonghui.notion.site/API-f71b36093160458694ac36cb2cf62ed1) | [FIGMA](https://www.figma.com/file/0xazrudv5SUGJREIuPYF4V/%EC%82%AC%EA%B3%BC%EB%82%98%EB%AC%B4%EC%B6%94%EC%96%B5%EA%B1%B8%EB%A0%B8%EB%84%A4?node-id=0%3A1)

<br>
