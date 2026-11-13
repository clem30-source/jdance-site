# 제이댄스 아카데미 홈페이지 (순수 HTML/CSS/JS)

빌드 도구 없이 동작하는 정적 사이트입니다. 도메인 www.jdance.kr 연결 예정.

## 실행
IntelliJ에서 `index.html` 우클릭 → **Open in → Browser** (내장 웹서버 미리보기). 또는 파일을 브라우저로 직접 열어도 됩니다.

## 구조
- `*.html` — 9개 메뉴 페이지 (index, about, classes, teachers, price, rental, gallery, news, contact)
- `assets/css/style.css` — 공통 스타일(디자인 토큰은 맨 위 `:root`)
- `assets/js/main.js` — 공통 헤더·푸터와 데이터 렌더링
- `data/*.js` — **자주 바뀌는 내용은 여기만 수정**
  - `timetable.js` 시간표(매월 갱신, month/updated 날짜 변경), `price.js` 수강료, `teachers.js` 강사진,
    `classes.js` 클래스 설명, `rental.js` 대관, `news.js` 소식, `gallery.js` 갤러리, `site.js` 연락처·SNS·사업자 정보
- `assets/img/teachers/이름소문자.jpg` — 강사 사진(예: jeyi.jpg), `assets/img/logo.png` — 로고, `assets/img/gallery/` — 갤러리

## 매월 시간표 수정
`data/timetable.js`의 `month`, `updated`와 `rows`를 고치고 저장 → 배포.

## 알아둘 점
- 헤더·푸터와 시간표·수강료·강사진은 JS가 그립니다. 네이버 검색 노출(SEO)을 더 강화하려면 정적 생성기(Astro, 11ty 등)로 옮겨 HTML에 미리 렌더링하는 것을 권장합니다.
- 개인정보를 받는 폼·회원가입·글쓰기 게시판이 없으므로 개인정보처리방침은 두지 않았습니다. 추가하면 재검토하세요.
- 사업자 정보는 `data/site.js`에서만 관리합니다. **주민등록번호 등 개인 식별 정보는 절대 넣지 않습니다.**
- 확인 필요(TODO): 취미 요금 항목명, 10월말 시간표, 로고, 강사 사진·인스타 주소, 네이버 상담/카카오 채널, 지도, 학원등록번호.

## 배포 (예)
GitHub Pages 사용 예정. 저장소 루트의 `CNAME` 파일에 `www.jdance.kr`가 들어 있습니다. 가비아 DNS에서 `www` CNAME을 `계정명.github.io`로 연결합니다.
