import { styles } from '../constants/styles'
import { contactInfo } from '../data/contact'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <h3 className={styles.footerTitle}>Contact</h3>
          <div className={styles.footerLinks}>
            <a 
              href={`mailto:${contactInfo.email}`}
              className={styles.footerLink}
            >
              <span className={styles.footerLinkIcon}>✉</span>
              <span>{contactInfo.email}</span>
            </a>
            <a 
              href={`tel:${contactInfo.phone.replace(/-/g, '')}`}
              className={styles.footerLink}
            >
              <span className={styles.footerLinkIcon}>📱</span>
              <span>{contactInfo.phone}</span>
            </a>
            <a 
              href={contactInfo.notionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              <span className={styles.footerLinkIcon}>📝</span>
              <span>Notion</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

