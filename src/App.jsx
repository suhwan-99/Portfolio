import { useRef, useEffect, useState } from 'react'
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
  const headerRef = useRef(null)
  const mainRef = useRef(null)
  const techStackSectionRef = useRef(null)
  const projectRefs = useRef([])
  const [isTextScanning, setIsTextScanning] = useState(false)
  const [scrollAnimations, setScrollAnimations] = useState({
    techStack: { scale: 0.3, opacity: 0 },
    projects: projects.map(() => ({ scale: 0.3, opacity: 0 }))
  })
  const [headerTextOpacity, setHeaderTextOpacity] = useState(1)

  // 텍스트 스캔 애니메이션 시작
  useEffect(() => {
    setIsTextScanning(true)
  }, [])

  // 스크롤 기반 애니메이션
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const headerHeight = headerRef.current?.offsetHeight || windowHeight

      // 헤더 텍스트 투명도 조절
      let textOpacity = 1
      if (scrollTop > 0) {
        const fadeStart = 0
        const fadeEnd = headerHeight * 0.5
        const fadeRange = fadeEnd - fadeStart
        
        if (scrollTop <= fadeEnd) {
          textOpacity = Math.max(0, 1 - (scrollTop / fadeRange))
        } else {
          textOpacity = 0
        }
      }
      setHeaderTextOpacity(textOpacity)

      // Used Skills 섹션 애니메이션
      if (techStackSectionRef.current) {
        const techSection = techStackSectionRef.current
        const techRect = techSection.getBoundingClientRect()
        const techTop = techRect.top + scrollTop
        const techHeight = techRect.height
        const techCenter = techTop + techHeight / 2
        
        // 뷰포트 중앙 위치
        const viewportCenter = scrollTop + windowHeight / 2
        
        // 섹션 중심이 뷰포트 중앙에 도달하는 지점을 기준으로 계산
        const distanceFromCenter = Math.abs(viewportCenter - techCenter)
        const animationRange = windowHeight * 0.8 // 애니메이션 범위를 줄여서 더 명확하게
        
        // 거리에 따른 진행도 (0 ~ 1)
        const progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / animationRange)))
        
        let scale = 0.3
        let opacity = 0
        
        if (progress > 0) {
          // 파라볼라 곡선: 작아서 커지고 다시 작아지는 효과
          const normalizedProgress = progress * 2 // 0 ~ 2
          if (normalizedProgress <= 1) {
            // 0 ~ 1: 작아서 커지는 구간
            scale = 0.3 + (normalizedProgress * normalizedProgress) * 0.7
            opacity = normalizedProgress * normalizedProgress
          } else {
            // 1 ~ 2: 커서 작아지는 구간
            const reverseProgress = 2 - normalizedProgress
            scale = 0.3 + (reverseProgress * reverseProgress) * 0.7
            opacity = reverseProgress * reverseProgress
          }
        }
        
        setScrollAnimations(prev => ({
          ...prev,
          techStack: { scale, opacity }
        }))
      }

      // 프로젝트 카드 애니메이션
      projectRefs.current.forEach((projectRef, index) => {
        if (!projectRef) return
        
        const projectRect = projectRef.getBoundingClientRect()
        const projectTop = projectRect.top + scrollTop
        const projectHeight = projectRect.height
        const projectCenter = projectTop + projectHeight / 2
        
        // 뷰포트 중앙 위치
        const viewportCenter = scrollTop + windowHeight / 2
        
        // 이전 섹션들이 완료되었는지 확인 (순차적 애니메이션)
        let shouldAnimate = false
        
        // 첫 번째 프로젝트는 Used Skills 섹션이 완전히 지나간 후 나타나도록
        if (index === 0) {
          if (techStackSectionRef.current) {
            const techSection = techStackSectionRef.current
            const techRect = techSection.getBoundingClientRect()
            const techTop = techRect.top + scrollTop
            const techHeight = techRect.height
            const techBottom = techTop + techHeight
            
            // Used Skills 섹션이 뷰포트 중앙을 완전히 지나갔는지 확인
            if (techBottom < viewportCenter - windowHeight * 0.3) {
              shouldAnimate = true
            }
          } else {
            // Used Skills 섹션이 없으면 바로 나타남
            shouldAnimate = true
          }
        } else {
          // 이전 프로젝트가 뷰포트 중앙을 완전히 지나갔는지 확인
          const prevRef = projectRefs.current[index - 1]
          if (prevRef) {
            const prevRect = prevRef.getBoundingClientRect()
            const prevTop = prevRect.top + scrollTop
            const prevBottom = prevTop + prevRect.height
            
            // 이전 프로젝트가 뷰포트 중앙을 완전히 지나갔는지 확인
            if (prevBottom < viewportCenter - windowHeight * 0.3) {
              shouldAnimate = true
            }
          }
        }
        
        if (!shouldAnimate) {
          setScrollAnimations(prev => ({
            ...prev,
            projects: prev.projects.map((p, i) => 
              i === index ? { scale: 0.3, opacity: 0 } : p
            )
          }))
          return
        }
        
        // 섹션 중심이 뷰포트 중앙에 도달하는 지점을 기준으로 계산
        const distanceFromCenter = Math.abs(viewportCenter - projectCenter)
        const animationRange = windowHeight * 0.8 // 애니메이션 범위를 줄여서 더 명확하게
        
        // 거리에 따른 진행도 (0 ~ 1)
        const progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / animationRange)))
        
        let scale = 0.3
        let opacity = 0
        
        if (progress > 0) {
          // 파라볼라 곡선: 작아서 커지고 다시 작아지는 효과
          const normalizedProgress = progress * 2 // 0 ~ 2
          if (normalizedProgress <= 1) {
            // 0 ~ 1: 작아서 커지는 구간
            scale = 0.3 + (normalizedProgress * normalizedProgress) * 0.7
            opacity = normalizedProgress * normalizedProgress
          } else {
            // 1 ~ 2: 커서 작아지는 구간
            const reverseProgress = 2 - normalizedProgress
            scale = 0.3 + (reverseProgress * reverseProgress) * 0.7
            opacity = reverseProgress * reverseProgress
          }
        }
        
        setScrollAnimations(prev => ({
          ...prev,
          projects: prev.projects.map((p, i) => 
            i === index ? { scale, opacity } : p
          )
        }))
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 실행

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [projects.length])

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

      // 비디오가 끝날 때 자연스럽게 다시 재생
      const handleEnded = () => {
        video.currentTime = 0
        video.play().catch((error) => {
        })
      }

      // 비디오가 거의 끝날 때 미리 재생 준비 (끊김 방지)
      const handleTimeUpdate = () => {
        // 비디오가 끝나기 0.1초 전에 미리 재생 준비
        if (video.duration - video.currentTime < 0.1) {
          video.currentTime = 0
        }
      }

      // 버퍼링이 완료되면 재생
      const handleCanPlayThrough = () => {
        video.play().catch((error) => {
        })
      }

      video.addEventListener('loadeddata', handleLoadedData)
      video.addEventListener('error', handleError)
      video.addEventListener('ended', handleEnded)
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('canplaythrough', handleCanPlayThrough)

      // 비디오 로드 시도
      video.load()

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('error', handleError)
        video.removeEventListener('ended', handleEnded)
        video.removeEventListener('timeupdate', handleTimeUpdate)
        video.removeEventListener('canplaythrough', handleCanPlayThrough)
      }
    }
  }, [])
  
  return (
    <div className={styles.container} style={{ position: 'relative' }}>
      <header ref={headerRef} className={styles.header} style={{ position: 'relative', zIndex: 1 }}>
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
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              {/* 브라우저 호환성을 위한 여러 포맷 제공 */}
              <source src="/header/headerVideoWebm.webm" type="video/webm" />
              <source src="/header/headerVideoMp4.mp4" type="video/mp4" />
              {/* 비디오를 지원하지 않는 브라우저를 위한 폴백 */}
              <p>비디오를 재생할 수 없습니다. 브라우저가 비디오 태그를 지원하지 않습니다.</p>
            </video>
          </div>
          <div 
            className={styles.headerContent}
            style={{
              opacity: headerTextOpacity,
              transition: 'opacity 0.3s ease-out'
            }}
          >
            <p className={`${styles.headerSlogan} ${isTextScanning ? 'text-scan-animation' : ''}`} style={{ animationDelay: '0s' }}>Building Beautiful Experiences</p>
            <h1 className={`${styles.h1} ${isTextScanning ? 'text-scan-animation' : ''}`} style={{ animationDelay: '0.5s' }}>강수환</h1>
            <h1 className={`${styles.h1} ${isTextScanning ? 'text-scan-animation' : ''}`} style={{ animationDelay: '1s' }}>프론트엔드 개발자</h1>
          </div>
        </div>
          <div className={styles.header3D}>
            <Header3D />
          </div>
      </header>
      
      <main 
        ref={mainRef} 
        className={styles.main}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          minHeight: '100vh'
        }}
      >
        {/* 전체 기술 스택 섹션 */}
        {allTechStack.length > 0 && (
          <section 
            ref={techStackSectionRef}
            className={styles.techStackSection}
            style={{
              transform: `scale(${scrollAnimations.techStack.scale})`,
              opacity: scrollAnimations.techStack.opacity,
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
              willChange: 'transform, opacity'
            }}
          >
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
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={el => {
                  if (el) projectRefs.current[index] = el
                }}
                style={{
                  transform: `scale(${scrollAnimations.projects[index]?.scale || 0.3})`,
                  opacity: scrollAnimations.projects[index]?.opacity || 0,
                  transformOrigin: 'center center',
                  transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                  willChange: 'transform, opacity'
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default App

