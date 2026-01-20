# 포트폴리오 웹 페이지

React + Vite + Tailwind CSS로 만든 포트폴리오 웹 페이지입니다. Green 색상 테마를 적용한 모던한 디자인의 포트폴리오 사이트입니다.

## 주요 기능

- 📱 반응형 디자인 (모바일/태블릿/데스크톱)
- 🎨 Tailwind CSS 기반 스타일링
- 🎯 Green 색상 테마 적용
- 📦 프로젝트 카드 형식의 프로젝트 소개
- 🏷️ 기술 스택 및 IDE 로고 이미지 표시
- 📝 프로젝트별 기여 내용 및 성과 표시
- 🔗 GitHub 및 Notion 링크
- 📞 Footer 연락처 정보

## 기술 스택

- React 18
- Vite
- Tailwind CSS
- PostCSS

## 개발

```bash
npm install
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173`로 접속할 수 있습니다.

## 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Footer.jsx      # Footer 컴포넌트
│   ├── ProjectCard.jsx # 프로젝트 카드 컴포넌트
│   └── TechLogo.jsx    # 기술 스택 로고 컴포넌트
├── constants/          # 상수 파일
│   └── styles.js       # Tailwind CSS 스타일 상수
├── data/               # 데이터 파일
│   ├── contact.js      # 연락처 정보
│   ├── projects.js     # 프로젝트 데이터
│   └── techLogos.js    # 기술 스택 로고 매핑
├── assets/             # 정적 리소스
│   ├── header/         # 헤더 이미지
│   └── logos/          # 기술 스택 로고 이미지 (PNG)
└── App.jsx             # 메인 App 컴포넌트
```

## 프로젝트 추가하기

`src/data/projects.js` 파일을 열어 프로젝트 정보를 추가하거나 수정하세요.

```javascript
{
  id: 1,
  title: '프로젝트 제목',
  description: '프로젝트에 대한 설명',
  techStack: ['React', 'Redux', 'Node.js'], // 사용한 기술 스택 배열
  ide: ['VS Code', 'Cursor'], // 사용한 IDE (문자열 또는 배열)
  githubUrl: 'https://github.com/username/project', // 선택사항
  notionUrl: 'https://www.notion.so/project', // 선택사항
  contributions: [ // 기여 내용 (불릿 포인트)
    '주요 기능 개발',
    'UI/UX 개선',
  ],
  achievements: [ // 성과 (불릿 포인트)
    '성능 최적화: 로딩 시간 50% 단축',
    '사용자 만족도 20% 향상',
  ]
}
```

## 연락처 정보 설정

`src/data/contact.js` 파일을 열어 연락처 정보를 수정하세요.

```javascript
export const contactInfo = {
  email: 'your-email@example.com',
  phone: '010-1234-5678',
  notionUrl: 'https://www.notion.so/your-page',
}
```

## 기술 스택 로고 이미지 추가

1. `src/assets/logos/` 폴더에 PNG 형식의 로고 이미지를 추가하세요.
2. `src/data/techLogos.js` 파일에서 기술 스택 이름과 이미지 경로를 매핑하세요.

```javascript
export const techLogos = {
  'React': '/src/assets/logos/react.png',
  'Node.js': '/src/assets/logos/nodejs.png',
  // ... 추가
}
```

## 스타일 커스터마이징

모든 스타일은 `src/constants/styles.js` 파일에서 중앙 관리됩니다. Tailwind CSS 클래스를 상수로 정의하여 일관된 스타일을 유지합니다.

Green 색상 테마를 변경하려면 `tailwind.config.js`의 green 색상 팔레트를 수정하거나 `src/constants/styles.js`에서 green 관련 클래스를 변경하세요.

## 헤더 이미지 변경

`src/assets/header/header.png` 파일을 원하는 이미지로 교체하세요. 이미지 크기는 반응형으로 조정되며, 높이는 600px로 고정됩니다.

## 라이선스

이 프로젝트는 개인 포트폴리오용으로 제작되었습니다.
