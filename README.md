# 포트폴리오 웹 페이지

React + Vite + Tailwind CSS로 만든 포트폴리오 웹 페이지입니다. Green 색상 테마를 적용한 모던한 디자인의 포트폴리오 사이트입니다.

## 주요 기능

- 📱 반응형 디자인 (모바일/태블릿/데스크톱)
- 🎨 Tailwind CSS 기반 스타일링
- 📦 프로젝트 카드 형식의 프로젝트 소개
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

`src/data/projects.js` 파일을 열어 프로젝트 정보 수정

## 연락처 정보 설정

`src/data/contact.js` 연락처 정보 수정

## 기술 스택 로고 이미지 추가

1. `src/assets/logos/` png 형식의 이미지 추가, 수정
2. `src/data/techLogos.js` 기술 스택이름과 로고 이름 매핑

```javascript
export const techLogos = {
  'React': '/src/assets/logos/react.png',
  'Node.js': '/src/assets/logos/nodejs.png',
  // ... 추가
}
```

## 스타일 커스터마이징

모든 스타일은 `src/constants/styles.js` 파일에서 중앙 관리됩니다. Tailwind CSS 클래스를 상수로 정의하여 일관된 스타일을 유지

Green 색상 테마를 변경하려면 `tailwind.config.js`의 green 색상 팔레트를 수정하거나 `src/constants/styles.js`에서 green 관련 클래스를 변경


## 라이선스

이 프로젝트는 개인 포트폴리오용으로 제작되었습니다.
