# 📝 Todo List

할 일을 등록하고, 완료 여부를 체크하고, 상세 내용을 수정/삭제할 수 있는 웹 애플리케이션입니다.

🔗 **배포 링크**: https://codeit-two-theta.vercel.app

## 📌 프로젝트 소개
코드잇 프론트엔드 단기 심화과정 과제 <br/>
`할 일 목록을 관리하는 To Do 서비스`를 위해 제작된 프로젝트 입니다.

## ✨ 주요 기능

- **할 일 목록 조회**: 진행중(TO DO) / 완료(DONE) 목록을 나누어 표시
- **할 일 추가**: 입력 후 버튼 클릭 또는 `Enter` 키로 등록
- **할 일 삭제**: 확인창을 거쳐 삭제, 삭제 후 목록으로 이동
## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/ljisu1107/codeit.git
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경 변수 설정

루트 경로에 `.env` 파일을 생성하고 아래 내용을 추가합니다.

```env
NEXT_PUBLIC_TODO_LIST_API_URL=https://assignment-todolist-api.vercel.app/api
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속
 