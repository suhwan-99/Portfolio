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
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [scrollAnimations, setScrollAnimations] = useState({
    techStack: { scale: 0.3, opacity: 0, translateY: 200 },
    projects: projects.map(() => ({ scale: 0.3, opacity: 0, translateY: 0, translateX: 0 })),
    footer: { scale: 0.3, opacity: 0, translateY: 0, translateX: 0 }
  })
  const [headerTextOpacity, setHeaderTextOpacity] = useState(1)

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

  // 스크롤 기반 애니메이션
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
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

      // Used Skills 섹션 애니메이션 (노드/연결선 위로 올라오는 효과)
      // 확장된 스크롤 범위 사용
      const extendedScrollRange = headerHeight * 4.5 // 1080px * 4.5 = 4860px (0.8씩 할당)
      const normalizedScroll = Math.min(scrollTop, extendedScrollRange) / headerHeight
      
      if (techStackSectionRef.current) {
        // 스크롤 진행도에 따른 애니메이션
        // 0 ~ 0.3: 시작 구간 (아래쪽에 숨어있음)
        // 0.3 ~ 0.8: 올라오는 구간 (0.8 할당)
        // 0.8 ~ 1.1: 사라지는 구간 (프로젝트 카드가 나타나기 시작)
        let progress = 0
        let fadeOutProgress = 0
        
        if (normalizedScroll >= 0.3 && normalizedScroll <= 0.8) {
          // 올라오는 구간 (0.5 구간)
          progress = (normalizedScroll - 0.3) / 0.5 // 0 ~ 1로 정규화
        } else if (normalizedScroll > 0.8 && normalizedScroll <= 1.1) {
          // 완전히 나타난 상태에서 사라지는 구간 (0.3 구간)
          progress = 1.0
          fadeOutProgress = (normalizedScroll - 0.8) / 0.3 // 0 ~ 1로 정규화 (사라지는 진행도)
        } else if (normalizedScroll > 1.1) {
          // 완전히 사라진 후
          progress = 1.0
          fadeOutProgress = 1.0
        }
        
        // 진행도에 따른 scale, opacity, translateY 계산
        let scale = 0.3
        let opacity = 0
        let translateY = 200 // 초기 위치 (아래쪽)
        
        if (progress > 0) {
          // ease-out 곡선 사용
          const easedProgress = 1 - Math.pow(1 - progress, 3)
          scale = 0.3 + easedProgress * 0.7
          translateY = 200 * (1 - easedProgress) // 아래에서 위로 올라옴
          
          // 사라지는 효과 적용
          if (fadeOutProgress > 0) {
            const fadeOutEased = fadeOutProgress // 선형으로 사라짐
            opacity = easedProgress * (1 - fadeOutEased)
            scale = (0.3 + easedProgress * 0.7) * (1 - fadeOutEased * 0.3) // 약간 작아지면서 사라짐
          } else {
            opacity = easedProgress
          }
        }
        
        setScrollAnimations(prev => ({
          ...prev,
          techStack: { scale, opacity, translateY }
        }))
      }

      // 프로젝트 카드 캐러셀 애니메이션 (헤더 영역 내에서 하나씩 나타났다 사라지는 효과)
      // 각 프로젝트 카드에 0.8씩 할당
      // 프로젝트 카드가 시작되는 지점 (used skills가 사라지기 시작하는 지점)
      const projectStartScroll = 1.1
      
      // 각 프로젝트마다 0.8씩 할당
      // 각 카드는 나타남(50%) + 사라짐(50%) 구간을 가짐
      const projectCount = projects.length
      const projectDuration = 0.8 // 각 프로젝트에 0.8 할당
      const appearDuration = projectDuration * 0.5 // 나타나는 구간 (50%) = 0.4
      const disappearDuration = projectDuration * 0.5 // 사라지는 구간 (50%) = 0.4
      
      projectRefs.current.forEach((projectRef, index) => {
        if (!projectRef) return
        
        // 각 프로젝트의 시작 지점 계산
        const projectStart = projectStartScroll + (index * projectDuration)
        const projectAppearEnd = projectStart + appearDuration
        const projectDisappearStart = projectAppearEnd
        const projectDisappearEnd = projectStart + projectDuration
        
        let appearProgress = 0
        let disappearProgress = 0
        
        if (normalizedScroll >= projectStart && normalizedScroll <= projectAppearEnd) {
          // 나타나는 구간
          appearProgress = (normalizedScroll - projectStart) / appearDuration
        } else if (normalizedScroll > projectAppearEnd && normalizedScroll <= projectDisappearEnd) {
          // 나타난 후 사라지는 구간
          appearProgress = 1.0
          disappearProgress = (normalizedScroll - projectDisappearStart) / disappearDuration
        } else if (normalizedScroll > projectDisappearEnd) {
          // 완전히 사라진 후
          appearProgress = 1.0
          disappearProgress = 1.0
        }
        
        // 진행도에 따른 scale, opacity, translateY, translateX 계산
        let scale = 0.3
        let opacity = 0
        let translateY = 0 // 화면 정중앙에 나오도록 0으로 설정
        let translateX = 30 // 오른쪽으로 조금 이동
        
        if (appearProgress > 0) {
          // 나타나는 효과: ease-out 곡선
          const easedAppear = 1 - Math.pow(1 - appearProgress, 3)
          
          // 사라지는 효과 적용
          if (disappearProgress > 0) {
            const easedDisappear = disappearProgress // 선형으로 사라짐
            const finalProgress = easedAppear * (1 - easedDisappear)
            
            scale = 0.3 + (finalProgress * 0.7)
            opacity = finalProgress
            translateY = 0 // 정중앙 유지
            translateX = 30 * finalProgress // 나타날 때 오른쪽으로 이동
          } else {
            // 나타나는 중
            scale = 0.3 + (easedAppear * 0.7)
            opacity = easedAppear
            translateY = 0 // 정중앙 유지
            translateX = 30 * easedAppear // 나타날 때 오른쪽으로 이동
          }
        }
        
        setScrollAnimations(prev => ({
          ...prev,
          projects: prev.projects.map((p, i) => 
            i === index ? { scale, opacity, translateY, translateX } : p
          )
        }))
      })
      
      // Footer 애니메이션 (프로젝트 카드처럼 나타났다 사라지는 효과)
      // 마지막 프로젝트 카드 이후에 Footer 나타남 (0.8 할당)
      const footerStartScroll = projectStartScroll + (projectCount * projectDuration) // 1.1 + (3 * 0.8) = 3.5
      const footerAppearEnd = footerStartScroll + appearDuration // 3.5~3.9 나타남
      const footerDisappearStart = footerAppearEnd
      const footerDisappearEnd = footerStartScroll + projectDuration // 3.5~4.3
      
      let footerAppearProgress = 0
      let footerDisappearProgress = 0
      
      if (normalizedScroll >= footerStartScroll && normalizedScroll <= footerAppearEnd) {
        // Footer가 나타나는 구간
        footerAppearProgress = (normalizedScroll - footerStartScroll) / appearDuration
      } else if (normalizedScroll > footerAppearEnd && normalizedScroll <= footerDisappearEnd) {
        // 나타난 후 사라지는 구간
        footerAppearProgress = 1.0
        footerDisappearProgress = (normalizedScroll - footerDisappearStart) / disappearDuration
      } else if (normalizedScroll > footerDisappearEnd) {
        // 완전히 사라진 후
        footerAppearProgress = 1.0
        footerDisappearProgress = 1.0
      }
      
      // Footer 애니메이션 계산 (프로젝트 카드와 동일한 효과)
      let footerScale = 0.3
      let footerOpacity = 0
      let footerTranslateY = 0
      let footerTranslateX = 30
      
      if (footerAppearProgress > 0) {
        // 나타나는 효과: ease-out 곡선
        const easedFooterAppear = 1 - Math.pow(1 - footerAppearProgress, 3)
        
        // 사라지는 효과 적용
        if (footerDisappearProgress > 0) {
          const easedFooterDisappear = footerDisappearProgress
          const finalFooterProgress = easedFooterAppear * (1 - easedFooterDisappear)
          
          footerScale = 0.3 + (finalFooterProgress * 0.7)
          footerOpacity = finalFooterProgress
          footerTranslateY = 0
          footerTranslateX = 30 * finalFooterProgress
        } else {
          // 나타나는 중
          footerScale = 0.3 + (easedFooterAppear * 0.7)
          footerOpacity = easedFooterAppear
          footerTranslateY = 0
          footerTranslateX = 30 * easedFooterAppear
        }
      }
      
      setScrollAnimations(prev => ({
        ...prev,
        footer: { scale: footerScale, opacity: footerOpacity, translateY: footerTranslateY, translateX: footerTranslateX }
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
  
  // 스크롤 가능하도록 document 높이 설정 (각 섹션에 0.8씩 할당: used skills + 프로젝트 3개 + Footer = 4.0배)
  useEffect(() => {
    const extendedHeight = 1080 * 4.5 // 4860px (여유있게 설정)
    document.documentElement.style.height = `${extendedHeight}px`
    document.body.style.height = `${extendedHeight}px`
    document.documentElement.style.minHeight = `${extendedHeight}px`
    document.body.style.minHeight = `${extendedHeight}px`
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
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '1080px',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <header 
        ref={headerRef} 
        className={styles.header} 
        style={{ 
          position: 'relative', 
          zIndex: 1,
          height: '1080px',
          width: '100%'
        }}
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
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          height: '1080px',
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
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

