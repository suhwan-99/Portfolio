// Tailwind CSS 클래스 상수 모음

export const styles = {
  // 레이아웃
  container: 'min-h-screen bg-gray-100 w-full mx-auto',
  header: 'mb-12 md:mb-16',
  headerContainer: 'relative w-full opacity-50',
  headerContent: 'absolute inset-0 flex flex-col items-center justify-center text-center z-10',
  main: 'w-full',
  
  // 타이포그래피
  h1: 'text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg',
  h2: 'text-2xl font-semibold mb-3 text-gray-900 border-b-2 border-green-200 pb-2',
  h3: 'text-sm font-semibold text-green-700 mb-2',
  subtitle: 'text-base md:text-lg text-white drop-shadow-md',
  bodyText: 'text-base leading-relaxed text-gray-600 mb-5',
  smallText: 'text-sm text-gray-600',
  
  // 카드
  card: 'bg-white border-l-4 border-l-green-500 border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-green-400 hover:shadow-green-100',
  
  // 그리드
  grid: 'flex flex-col items-center gap-6 md:gap-8',
  techGrid: 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6',
  
  // 구분선
  divider: 'mb-5 pt-4 border-t border-green-200',
  
  // 버튼
  button: {
    primary: 'inline-block px-5 py-2.5 bg-green-600 text-white rounded-md text-sm font-medium transition-colors duration-200 hover:bg-green-700',
    secondary: 'inline-block px-5 py-2.5 bg-green-100 text-green-700 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-green-200',
  },
  
  // 리스트
  list: 'list-disc list-inside space-y-1 text-sm text-gray-600 ml-2',
  
  // 기술 스택 아이템
  techStackItem: 'flex items-center gap-2 text-sm text-gray-600',
  techStackLabel: 'font-semibold text-green-700 mr-2 min-w-[70px]',
  
  // 기술 스택 섹션
  techStackSection: 'mb-8 md:mb-12 bg-green-50 rounded-xl p-6 md:p-8 border border-green-100',
  techStackTitle: 'text-2xl md:text-3xl font-bold mb-6 text-green-700 text-center',
  techStackCard: 'flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-green-200 hover:border-green-400 hover:bg-green-50 hover:shadow-md transition-all duration-200',
  techLogo: 'w-12 h-12 md:w-16 md:h-16 object-contain mb-2',
  techName: 'text-xs md:text-sm text-center text-gray-700 font-medium',
  
  // 헤더 이미지
  headerImage: 'w-full h-[600px] object-cover shadow-md',
  
  // 유틸리티
  flexGap: 'flex gap-3 flex-wrap',
  
  // Footer
  footer: 'mt-16 border-t-2 border-green-200 bg-green-50',
  footerContainer: 'max-w-7xl mx-auto px-5 py-8 md:px-8 md:py-12',
  footerContent: 'mb-6',
  footerTitle: 'text-xl md:text-2xl font-bold text-green-700 mb-4 text-center',
  footerLinks: 'flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8',
  footerLink: 'flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-700 transition-colors duration-200 rounded-md hover:bg-green-100',
  footerLinkIcon: 'text-lg',
  footerBottom: 'mt-6 pt-6 border-t border-green-200 text-center',
  footerText: 'text-sm text-gray-600',
}

