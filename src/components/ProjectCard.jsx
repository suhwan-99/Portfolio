import { styles } from '../constants/styles'
import { getTechLogo } from '../data/techLogos'
import TechLogo from './TechLogo'

export const ProjectCard = ({ project }) => {
  const techStackArray = Array.isArray(project.techStack) ? project.techStack : (project.techStack ? [project.techStack] : [])
  
  return (
    <div className={styles.card} style={{ width: '700px', maxWidth: '100%' }}>
      <h2 className={styles.h2}>{project.title}</h2>
      <p className={styles.bodyText}>{project.description}</p>
      
      <div className={styles.divider}>
        {techStackArray.length > 0 && (
          <div className="mb-3">
            <span className={styles.techStackLabel}>기술 스택:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {techStackArray.map((tech, index) => {
                const logoPath = getTechLogo(tech)
                return (
                  <div key={index} className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-md text-xs border border-green-200 hover:bg-green-100 transition-colors duration-200">
                    {logoPath && (
                      <TechLogo techName={tech} className="w-4 h-4" />
                    )}
                    <span className="text-gray-700">{tech}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {project.ide && (
          <div className="mb-3">
            <span className={styles.techStackLabel}>IDE:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {(Array.isArray(project.ide) ? project.ide : [project.ide]).map((ide, index) => {
                const logoPath = getTechLogo(ide)
                return (
                  <div key={index} className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-md text-xs border border-green-200 hover:bg-green-100 transition-colors duration-200">
                    {logoPath && (
                      <TechLogo techName={ide} className="w-4 h-4" />
                    )}
                    <span className="text-gray-700">{ide}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {project.contributions && project.contributions.length > 0 && (
        <div className="mb-4">
          <h3 className={styles.h3}>기여 내용</h3>
          <ul className={styles.list}>
            {project.contributions.map((contribution, index) => (
              <li key={index}>{contribution}</li>
            ))}
          </ul>
        </div>
      )}

      {project.achievements && project.achievements.length > 0 && (
        <div className="mb-5">
          <h3 className={styles.h3}>성과</h3>
          <ul className={styles.list}>
            {project.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className={styles.flexGap}>
        {project.githubUrl && (
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.button.primary}
          >
            GitHub
          </a>
        )}
        {project.notionUrl && (
          <a 
            href={project.notionUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.button.secondary}
          >
            Notion
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard

