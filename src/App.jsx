import { useRef, useEffect } from 'react'
import ProjectCard from './components/ProjectCard'
import { projects } from './data/projects'
import { styles } from './constants/styles'
import { getAllTechStack, getTechLogo } from './data/techLogos'
import TechLogo from './components/TechLogo'
import Footer from './components/Footer'
import Header3D from './components/Header3D'
// 헤더 이미지를 사용하려면 아래 주석을 해제하고 실제 이미지 경로로 변경하세요
// import headerImage from './assets/header-image.jpg'

const App = () => {
  const allTechStack = getAllTechStack(projects)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // 비디오 로드 및 재생 보장
      const handleLoadedData = () => {
        video.play().catch((error) => {
        })
      }

      const handleError = (e) => {
        console.error(e)
      }

      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('error', handleError)

      // 비디오 로드 시도
      video.load()

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('error', handleError)
      }
    }
  }, [])
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div style={{ position: 'relative', width: '100%' }}>
            <video 
              ref={videoRef}
              className={styles.headerVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ 
                width: '100%', 
                height: '1080px', 
                objectFit: 'cover',
                display: 'block',
                opacity: 1,
                position: 'relative',
                zIndex: 0,
                filter: 'none',
                pointerEvents: 'none'
              }}
            >
              {/* 브라우저 호환성을 위한 여러 포맷 제공 */}
              <source src="/header/headerVideoWebm.webm" type="video/webm" />
              <source src="/header/headerVideoMp4.mp4" type="video/mp4" />
              {/* 비디오를 지원하지 않는 브라우저를 위한 폴백 */}
              <p>비디오를 재생할 수 없습니다. 브라우저가 비디오 태그를 지원하지 않습니다.</p>
            </video>
          </div>
          <div className={styles.headerContent}>
            <p className={styles.headerSlogan}>Building Beautiful Experiences</p>
            <h1 className={styles.h1}>강수환</h1>
            <h1 className={styles.h1}>프론트엔드 개발자</h1>
          </div>
        </div>
          <div className={styles.header3D}>
            <Header3D />
          </div>
      </header>
      
      <main className={styles.main}>
        {/* 전체 기술 스택 섹션 */}
        {allTechStack.length > 0 && (
          <section className={styles.techStackSection}>
            <h2 className={styles.techStackTitle}>USED SKILLS</h2>
            <div className={styles.techGrid}>
              {allTechStack.map((tech, index) => {
                const logoPath = getTechLogo(tech)
                return (
                  <div key={index} className={styles.techStackCard}>
                    {logoPath && (
                      <TechLogo techName={tech} className={styles.techLogo} />
                    )}
                    <span className={styles.techName}>{tech}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}
        
        {/* 프로젝트 카드 섹션 */}
        <section className="w-full flex justify-center px-4 md:px-6 lg:px-8">
          <div className={styles.grid}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default App

