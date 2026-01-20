import ProjectCard from './components/ProjectCard'
import { projects } from './data/projects'
import { styles } from './constants/styles'
import { getAllTechStack, getTechLogo } from './data/techLogos'
import TechLogo from './components/TechLogo'
import Footer from './components/Footer'
// 헤더 이미지를 사용하려면 아래 주석을 해제하고 실제 이미지 경로로 변경하세요
// import headerImage from './assets/header-image.jpg'

const App = () => {
  const allTechStack = getAllTechStack(projects)
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <img 
            src={'/src/assets/header/header.png'} 
            alt="프론트엔드 포트폴리오 헤더 이미지"
            className={styles.headerImage}
          /> 
          <div className={styles.headerContent}>
            <h1 className={styles.h1}>강수환</h1>
            <h1 className={styles.h1}>프론트엔드 개발자</h1>
          </div>
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
        <section className="w-full flex justify-center">
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

