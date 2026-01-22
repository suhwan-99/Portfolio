import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import ProjectCard from './components/ProjectCard'
import { projects } from './data/projects'
import { styles } from './constants/styles'
import { getAllTechStack, getTechLogo } from './data/techLogos'
import TechLogo from './components/TechLogo'
import Footer from './components/Footer'
import Header3D from './components/Header3D'

// 상수 값들을 컴포넌트 외부로 이동
const HEADER_HEIGHT = 1080
const SCROLL_MULTIPLIER = 4.5
const EXTENDED_SCROLL_RANGE = HEADER_HEIGHT * SCROLL_MULTIPLIER
const PROJECT_DURATION = 0.8
const APPEAR_DURATION = PROJECT_DURATION * 0.5
const DISAPPEAR_DURATION = PROJECT_DURATION * 0.5
const PROJECT_START_SCROLL = 1.1
const TECH_STACK_START = 0.3
const TECH_STACK_END = 0.8
const TECH_STACK_FADE_END = 1.1

const App = () => {
  const allTechStack = useMemo(() => getAllTechStack(projects), [])
  const videoRef = useRef(null)
  const headerRef = useRef(null)
  const mainRef = useRef(null)
  const techStackSectionRef = useRef(null)
  const projectRefs = useRef([])
  const [isTextScanning, setIsTextScanning] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [scrollAnimations, setScrollAnimations] = useState({
    techStack: { scale: 0.3, opacity: 0, translateY: 200 },
    projects: projects.map(() => ({ scale: 0.3, opacity: 0, translateY: 0, translateX: 0 })),
    footer: { scale: 0.3, opacity: 0, translateY: 0, translateX: 0 }
  })
  const [headerTextOpacity, setHeaderTextOpacity] = useState(1)

  // 스타일 객체 메모이제이션
  const containerStyle = useMemo(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: `${HEADER_HEIGHT}px`,
    overflow: 'hidden',
    width: '100%'
  }), [])

  const headerStyle = useMemo(() => ({
    position: 'relative',
    zIndex: 1,
    height: `${HEADER_HEIGHT}px`,
    width: '100%'
  }), [])

  const mainStyle = useMemo(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: `${HEADER_HEIGHT}px`,
    overflow: 'hidden',
    pointerEvents: 'none'
  }), [])

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  // 텍스트 스캔 애니메이션 시작
  useEffect(() => {
    setIsTextScanning(true)
  }, [])

  // 애니메이션 계산 헬퍼 함수들
  const calculateEaseOut = useCallback((progress) => {
    return 1 - Math.pow(1 - progress, 3)
  }, [])

  const calculateTechStackAnimation = useCallback((normalizedScroll) => {
    let progress = 0
    let fadeOutProgress = 0
    
    if (normalizedScroll >= TECH_STACK_START && normalizedScroll <= TECH_STACK_END) {
      progress = (normalizedScroll - TECH_STACK_START) / (TECH_STACK_END - TECH_STACK_START)
    } else if (normalizedScroll > TECH_STACK_END && normalizedScroll <= TECH_STACK_FADE_END) {
      progress = 1.0
      fadeOutProgress = (normalizedScroll - TECH_STACK_END) / (TECH_STACK_FADE_END - TECH_STACK_END)
    } else if (normalizedScroll > TECH_STACK_FADE_END) {
      progress = 1.0
      fadeOutProgress = 1.0
    }
    
    let scale = 0.3
    let opacity = 0
    let translateY = 200
    
    if (progress > 0) {
      const easedProgress = calculateEaseOut(progress)
      scale = 0.3 + easedProgress * 0.7
      translateY = 200 * (1 - easedProgress)
      
      if (fadeOutProgress > 0) {
        opacity = easedProgress * (1 - fadeOutProgress)
        scale = (0.3 + easedProgress * 0.7) * (1 - fadeOutProgress * 0.3)
      } else {
        opacity = easedProgress
      }
    }
    
    return { scale, opacity, translateY }
  }, [calculateEaseOut])

  const calculateProjectAnimation = useCallback((normalizedScroll, index) => {
    const projectStart = PROJECT_START_SCROLL + (index * PROJECT_DURATION)
    const projectAppearEnd = projectStart + APPEAR_DURATION
    const projectDisappearStart = projectAppearEnd
    const projectDisappearEnd = projectStart + PROJECT_DURATION
    
    let appearProgress = 0
    let disappearProgress = 0
    
    if (normalizedScroll >= projectStart && normalizedScroll <= projectAppearEnd) {
      appearProgress = (normalizedScroll - projectStart) / APPEAR_DURATION
    } else if (normalizedScroll > projectAppearEnd && normalizedScroll <= projectDisappearEnd) {
      appearProgress = 1.0
      disappearProgress = (normalizedScroll - projectDisappearStart) / DISAPPEAR_DURATION
    } else if (normalizedScroll > projectDisappearEnd) {
      appearProgress = 1.0
      disappearProgress = 1.0
    }
    
    let scale = 0.3
    let opacity = 0
    let translateY = 0
    let translateX = 30
    
    if (appearProgress > 0) {
      const easedAppear = calculateEaseOut(appearProgress)
      
      if (disappearProgress > 0) {
        const finalProgress = easedAppear * (1 - disappearProgress)
        scale = 0.3 + (finalProgress * 0.7)
        opacity = finalProgress
        translateX = 30 * finalProgress
      } else {
        scale = 0.3 + (easedAppear * 0.7)
        opacity = easedAppear
        translateX = 30 * easedAppear
      }
    }
    
    return { scale, opacity, translateY, translateX }
  }, [calculateEaseOut])

  const calculateFooterAnimation = useCallback((normalizedScroll, projectCount) => {
    const footerStartScroll = PROJECT_START_SCROLL + (projectCount * PROJECT_DURATION)
    const footerAppearEnd = footerStartScroll + APPEAR_DURATION
    const footerDisappearStart = footerAppearEnd
    const footerDisappearEnd = footerStartScroll + PROJECT_DURATION
    
    let footerAppearProgress = 0
    let footerDisappearProgress = 0
    
    if (normalizedScroll >= footerStartScroll && normalizedScroll <= footerAppearEnd) {
      footerAppearProgress = (normalizedScroll - footerStartScroll) / APPEAR_DURATION
    } else if (normalizedScroll > footerAppearEnd && normalizedScroll <= footerDisappearEnd) {
      footerAppearProgress = 1.0
      footerDisappearProgress = (normalizedScroll - footerDisappearStart) / DISAPPEAR_DURATION
    } else if (normalizedScroll > footerDisappearEnd) {
      footerAppearProgress = 1.0
      footerDisappearProgress = 1.0
    }
    
    let footerScale = 0.3
    let footerOpacity = 0
    let footerTranslateY = 0
    let footerTranslateX = 30
    
    if (footerAppearProgress > 0) {
      const easedFooterAppear = calculateEaseOut(footerAppearProgress)
      
      if (footerDisappearProgress > 0) {
        const finalFooterProgress = easedFooterAppear * (1 - footerDisappearProgress)
        footerScale = 0.3 + (finalFooterProgress * 0.7)
        footerOpacity = finalFooterProgress
        footerTranslateX = 30 * finalFooterProgress
      } else {
        footerScale = 0.3 + (easedFooterAppear * 0.7)
        footerOpacity = easedFooterAppear
        footerTranslateX = 30 * easedFooterAppear
      }
    }
    
    return { scale: footerScale, opacity: footerOpacity, translateY: footerTranslateY, translateX: footerTranslateX }
  }, [calculateEaseOut])

  // 스크롤 기반 애니메이션
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const headerHeight = headerRef.current?.offsetHeight || HEADER_HEIGHT

          // 헤더 텍스트 투명도 조절
          let textOpacity = 1
          if (scrollTop > 0) {
            const fadeEnd = headerHeight * 0.5
            if (scrollTop <= fadeEnd) {
              textOpacity = Math.max(0, 1 - (scrollTop / fadeEnd))
            } else {
              textOpacity = 0
            }
          }
          setHeaderTextOpacity(textOpacity)

          // 정규화된 스크롤 값 계산
          const normalizedScroll = Math.min(scrollTop, EXTENDED_SCROLL_RANGE) / headerHeight
      
          // Tech Stack 애니메이션 계산
          if (techStackSectionRef.current) {
            const techStackAnim = calculateTechStackAnimation(normalizedScroll)
            setScrollAnimations(prev => ({
              ...prev,
              techStack: techStackAnim
            }))
          }

          // 프로젝트 카드 애니메이션 계산
          const projectCount = projects.length
          const projectAnimations = projects.map((_, index) => 
            calculateProjectAnimation(normalizedScroll, index)
          )
          
          setScrollAnimations(prev => ({
            ...prev,
            projects: projectAnimations
          }))
      
          // Footer 애니메이션 계산
          const footerAnim = calculateFooterAnimation(normalizedScroll, projectCount)
          setScrollAnimations(prev => ({
            ...prev,
            footer: footerAnim
          }))
      
      ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 실행

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [calculateTechStackAnimation, calculateProjectAnimation, calculateFooterAnimation])

  // 비디오 이벤트 핸들러들
  const handleVideoLoadedData = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {})
    }
  }, [])

  const handleVideoError = useCallback((e) => {
    console.error('Video error:', e)
  }, [])

  const handleVideoEnded = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {})
    }
  }, [])

  const handleVideoTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (video && video.duration && video.duration - video.currentTime < 0.1) {
      video.currentTime = 0
    }
  }, [])

  const handleVideoCanPlayThrough = useCallback(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {})
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('loadeddata', handleVideoLoadedData)
      video.addEventListener('error', handleVideoError)
      video.addEventListener('ended', handleVideoEnded)
      video.addEventListener('timeupdate', handleVideoTimeUpdate)
      video.addEventListener('canplaythrough', handleVideoCanPlayThrough)

      video.load()

      return () => {
        video.removeEventListener('loadeddata', handleVideoLoadedData)
        video.removeEventListener('error', handleVideoError)
        video.removeEventListener('ended', handleVideoEnded)
        video.removeEventListener('timeupdate', handleVideoTimeUpdate)
        video.removeEventListener('canplaythrough', handleVideoCanPlayThrough)
      }
    }
  }, [handleVideoLoadedData, handleVideoError, handleVideoEnded, handleVideoTimeUpdate, handleVideoCanPlayThrough])
  
  // 스크롤 가능하도록 document 높이 설정
  useEffect(() => {
    document.documentElement.style.height = `${EXTENDED_SCROLL_RANGE}px`
    document.body.style.height = `${EXTENDED_SCROLL_RANGE}px`
    document.documentElement.style.minHeight = `${EXTENDED_SCROLL_RANGE}px`
    document.body.style.minHeight = `${EXTENDED_SCROLL_RANGE}px`
    return () => {
      document.documentElement.style.height = ''
      document.body.style.height = ''
      document.documentElement.style.minHeight = ''
      document.body.style.minHeight = ''
    }
  }, [])

  return (
    <div 
      className={styles.container} 
      style={containerStyle}
    >
      <header 
        ref={headerRef} 
        className={styles.header} 
        style={headerStyle}
      >
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
        style={mainStyle}
      >
        {/* 전체 기술 스택 섹션 */}
        {allTechStack.length > 0 && (
          <section 
            ref={techStackSectionRef}
            className={styles.techStackSection}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${scrollAnimations.techStack.scale}) translateY(${(scrollAnimations.techStack.translateY || 0) - (isLargeScreen ? 0 : 5)}px)`,
              zIndex: 10,
              opacity: scrollAnimations.techStack.opacity,
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
              willChange: 'transform, opacity',
              pointerEvents: scrollAnimations.techStack.opacity > 0.5 ? 'auto' : 'none',
              width: isLargeScreen ? '90%' : '95%',
              maxWidth: '1200px',
              maxHeight: isLargeScreen ? 'none' : '85vh'
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
        
        {/* 프로젝트 카드 개별 배치 */}
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => {
              if (el) projectRefs.current[index] = el
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${scrollAnimations.projects[index]?.scale || 0.3}) translateY(${(scrollAnimations.projects[index]?.translateY || 0) - (isLargeScreen ? 5 : 3)}px) translateX(${(scrollAnimations.projects[index]?.translateX || 0) + (isLargeScreen ? -1 : -25)}px)`,
              zIndex: 15,
              opacity: scrollAnimations.projects[index]?.opacity || 0,
              transformOrigin: 'center center',
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
              willChange: 'transform, opacity',
              pointerEvents: scrollAnimations.projects[index]?.opacity > 0.5 ? 'auto' : 'none',
              width: isLargeScreen ? '90%' : '95%',
              maxWidth: '1200px',
              maxHeight: isLargeScreen ? 'none' : '85vh'
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </main>
      
      {/* Footer 영역 (프로젝트 카드처럼 화면 정중앙에 배치) */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scrollAnimations.footer?.scale || 0.3}) translateY(${(scrollAnimations.footer?.translateY || 0) - (isLargeScreen ? 2 : 0)}px) translateX(${(scrollAnimations.footer?.translateX || 0) + (isLargeScreen ? -2 : -8)}px)`,
          zIndex: 20,
          opacity: scrollAnimations.footer?.opacity || 0,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          willChange: 'transform, opacity',
          pointerEvents: scrollAnimations.footer?.opacity > 0.9 ? 'auto' : 'none',
          width: isLargeScreen ? '90%' : '95%',
          maxWidth: '1200px',
          maxHeight: isLargeScreen ? 'none' : '85vh'
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App

