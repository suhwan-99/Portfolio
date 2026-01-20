// Tailwind CSS 클래스 상수 모음

export const styles = {
  // 레이아웃
  container: 'min-h-screen bg-gray-100 w-full mx-auto',
  header: 'mb-12 md:mb-16',
  headerContainer: 'relative w-full opacity-50',
  headerContent: 'absolute inset-0 flex flex-col items-center justify-center text-center z-10',
  main: 'w-full px-4 md:px-6 lg:px-8',
  
  // 타이포그래피
  h1: 'text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg tracking-tight',
  h2: 'text-2xl font-bold mb-3 text-gray-900 border-b-2 border-green-200 pb-2 tracking-wide',
  h3: 'text-sm font-bold text-green-700 mb-2 tracking-wide',
  subtitle: 'text-base md:text-lg text-white drop-shadow-md tracking-normal',
  bodyText: 'text-base leading-relaxed text-gray-600 mb-5 tracking-normal',
  smallText: 'text-sm text-gray-600 tracking-normal',
  
  // 카드
  card: 'bg-white/80 backdrop-blur-md border-l-4 border-l-green-500 border border-gray-200/50 rounded-xl p-4 md:p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-100/50 hover:border-green-400 hover:bg-white/90',
  
  // 그리드
  grid: 'flex flex-col items-center gap-6 md:gap-8',
  techGrid: 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6',
  
  // 구분선
  divider: 'mb-5 pt-4 border-t border-green-200',
  
  // 버튼
  button: {
    primary: 'inline-block px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium shadow-md transition-all duration-300 ease-out hover:bg-green-700 hover:scale-105 hover:shadow-lg active:scale-95',
    secondary: 'inline-block px-5 py-2.5 bg-green-100/80 backdrop-blur-sm text-green-700 rounded-lg text-sm font-medium shadow-sm transition-all duration-300 ease-out hover:bg-green-200/90 hover:scale-105 hover:shadow-md active:scale-95',
  },
  
  // 리스트
  list: 'list-disc list-inside space-y-1 text-sm text-gray-600 ml-2',
  
  // 기술 스택 아이템
  techStackItem: 'flex items-center gap-2 text-sm text-gray-600',
  techStackLabel: 'font-semibold text-green-700 mr-2 min-w-[70px]',
  
  // 기술 스택 섹션
  techStackSection: 'mb-8 md:mb-12 bg-green-50/60 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8 border border-green-100/50 shadow-sm',
  techStackTitle: 'text-2xl md:text-3xl font-bold mb-6 text-green-700 text-center tracking-wide',
  techStackCard: 'flex flex-col items-center justify-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-green-200/50 hover:border-green-400 hover:bg-white/90 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out',
  techLogo: 'w-12 h-12 md:w-16 md:h-16 object-contain mb-2',
  techName: 'text-xs md:text-sm text-center text-gray-700 font-medium',
  
  // 헤더 이미지
  headerImage: 'w-full h-[600px] object-cover shadow-md',
  
  // 유틸리티
  flexGap: 'flex gap-3 flex-wrap',
  
  // Footer
  footer: 'mt-16 border-t-2 border-green-200/50 bg-green-50/60 backdrop-blur-sm',
  footerContainer: 'max-w-7xl mx-auto px-5 py-8 md:px-8 md:py-12',
  footerContent: 'mb-6',
  footerTitle: 'text-xl md:text-2xl font-bold text-green-700 mb-4 text-center tracking-wide',
  footerLinks: 'flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8',
  footerLink: 'flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-700 transition-all duration-300 ease-out rounded-lg hover:bg-green-100/80 backdrop-blur-sm hover:scale-105 active:scale-95',
  footerLinkIcon: 'text-lg',
  footerBottom: 'mt-6 pt-6 border-t border-green-200 text-center',
  footerText: 'text-sm text-gray-600',
}

