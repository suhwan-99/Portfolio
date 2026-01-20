export const projects = [
  {
    id: 1,
    title: 'AI를 활용한 스마트 플랫폼 (Team Project)',
    description: '프로젝트에 대한 설명을 여기에 작성하세요. 프로젝트의 주요 기능이나 기술 스택에 대해 간략히 설명할 수 있습니다.',
    techStack: ['React', 'Redux', 'WebSocket', 'MQTT', 'Raspberry Pi', 'Python'],
    ide: ['VS Code', 'Cursor'],
    githubUrl: 'https://github.com/suhwan-99/SmartPlatForm-Front/tree/main',
    notionUrl: 'https://www.notion.so/al-2e6ce1555c988071ab82c9b171a8628c',
    contributions: [
      '공정 전원 관리 기능',
      '대시보드 페이지',
      '공전 진행도 현황 페이지',
      '스케줄 관리 페이지',
      '라즈베리 파이 기반 IoT 통합 제어',
    ],
    achievements: [
      '실시간 데이터 스트리밍: WebSocket을 활용하여 설비 데이터 및 AI 판독 결과 실시간 시각화',
      'IoT 통합 제어: 웹 UI를 통해 라즈베리 파이 기반 컨베이어 벨트 및 경고등 원격 제어',
      '상태 관리 최적화: Redux 전역 상태 관리를 통한 컴포넌트 간 데이터 동기화',
      '실시간 저지연 통신 최적화: MQTT 프로토콜을 도입하여 설비 데이터의 오버헤드를 줄이고, 0.1초 단위의 실시간 모니터링 환경을 구축',
    ]
  },
  {
    id: 2,
    title: 'AI를 활용한 도로 위험 요소 및 안전 커뮤니티 (Team Project)',
    description: '프로젝트에 대한 설명을 여기에 작성하세요. 프로젝트의 주요 기능이나 기술 스택에 대해 간략히 설명할 수 있습니다.',
    techStack: ['React', 'Redux', 'SCSS', 'CSS Modules', 'Intersection Observer API'],
    ide: 'VS Code',
    githubUrl: 'https://github.com/suhwan-99/DriveCommunity-Front/tree/main',
    notionUrl: 'https://www.notion.so/ai-2e6ce1555c98804a8a38f8fb18b00227',
    contributions: [
      '커뮤니티 페이지',
      '무한 스크롤 기능',
      '전체적인 css 관리',
      'redux를 통한 상태 관리',
    ],
    achievements: [
      '멀티미디어 피드: 다중 이미지 게시물을 위한 슬라이드형 캐러셀과 SNS형 피드 레이아웃 구현',
      '인피니트 스크롤: useInfiniteScroll 커스텀 훅을 제작하여 사용자 경험(UX) 최적화',
      '디자인 시스템: Dark/White 멀티 테마 적용 및 CSS 표준화 가이드라인 수립',
      '상태 관리 최적화: Redux 전역 상태 관리를 통한 컴포넌트 간 데이터 동기화',

    ]
  },
  {
    id: 3,
    title: '게임 상식 퀴즈 사이트 (Team Project)',
    description: '프로젝트에 대한 설명을 여기에 작성하세요. 프로젝트의 주요 기능이나 기술 스택에 대해 간략히 설명할 수 있습니다.',
    techStack: ['React', 'Spring Boot', 'JPA', 'MySQL'],
    ide: 'VS Code',
    githubUrl: 'https://github.com/WinLakeLee/teamtest-react',
    contributions: [
      '퀴즈 문제와 정답 DB 모델링',
      '랭킹, 명예의 전당 페이지',
      '메인 페이지의 공지사항 영역'
    ],
    achievements: [
      '실시간 랭킹 시스템: 사용자별 퀴즈 점수 합산 및 명예의 전당 랭킹 로직 구현',
      '데이터 모델링: JPA를 활용한 회원 정보 및 게임 결과 관계형 데이터 설계'
    ]
  }
]

