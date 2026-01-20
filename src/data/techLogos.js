
// 기술 스택 로고 이미지 경로 매핑 객체
// 이미지 파일이 추가되면 여기에 경로를 추가하세요
// 모든 이미지는 PNG 형식으로 저장되어 있습니다
export const techLogos = {
  'React': '/logos/react.png',
  'Redux': '/logos/redux.png',
  'WebSocket': '/logos/websocket.png',
  'MQTT': '/logos/mqtt.png',
  'Raspberry Pi': '/logos/ras.png',
  'Python': '/logos/py.png',
  'SCSS': '/logos/scss.png',
  'CSS Modules': '/logos/cssmodules.png',
  'Spring Boot': '/logos/spring.png',
  'JPA': '/logos/JPA.png',
  'MySQL': '/logos/sql.png',
  'VS Code': '/logos/vscode.png',
  'Cursor': '/logos/cursor.png',
}

// 기술 스택 로고 가져오기 함수
export const getTechLogo = (techName) => {
  return techLogos[techName] || null
}

// 기술 스택에 로고가 있는지 확인
export const hasTechLogo = (techName) => {
  return techLogos.hasOwnProperty(techName)
}

// 기술 스택 색상 매핑 객체
export const techColors = {

}

// 기술 스택 색상 가져오기 함수
export const getTechColor = (techName) => {
  return techColors[techName] || '#6B7280' // 기본값: gray-500
}

// 모든 프로젝트에서 사용된 기술 스택 추출
export const getAllTechStack = (projects) => {
  const allTechStack = new Set()
  
  projects.forEach(project => {
    if (project.techStack && Array.isArray(project.techStack)) {
      project.techStack.forEach(tech => allTechStack.add(tech))
    } else if (project.techStack) {
      allTechStack.add(project.techStack)
    }
  })
  
  return Array.from(allTechStack).sort()
}
