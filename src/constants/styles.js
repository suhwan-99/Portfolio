// Tailwind CSS 클래스 상수 모음

export const styles = {
  // 레이아웃
  container: 'min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/20 w-full mx-auto',
  header: 'mb-16 md:mb-20',
  headerContainer: 'relative w-full opacity-50',
  headerContent: 'absolute inset-0 flex flex-col items-center justify-center text-center z-10',
  main: 'w-full px-4 md:px-6 lg:px-8',
  
  // 타이포그래피
  h1: 'text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-2xl tracking-tight',
  h2: 'text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 border-b-2 border-green-200/60 pb-3 tracking-wide',
  h3: 'text-sm font-bold text-green-700 mb-2 tracking-wide',
  subtitle: 'text-base md:text-lg text-white drop-shadow-lg tracking-normal',
  bodyText: 'text-base leading-relaxed text-gray-700 mb-5 tracking-normal',
  smallText: 'text-sm text-gray-600 tracking-normal',
  
  // 카드
  card: 'bg-white/90 backdrop-blur-lg border-l-4 border-l-green-500 border border-gray-200/30 rounded-2xl p-5 md:p-7 shadow-lg shadow-gray-200/30 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:shadow-green-200/40 hover:border-green-500 hover:bg-white/95',
  
  // 그리드
  grid: 'flex flex-col items-center gap-8 md:gap-10',
  techGrid: 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5 md:gap-7',
  
  // 구분선
  divider: 'mb-6 pt-5 border-t border-green-200/60',
  
  // 버튼
  button: {
    primary: 'inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-green-500/30 transition-all duration-300 ease-out hover:from-green-700 hover:to-green-600 hover:scale-105 hover:shadow-xl hover:shadow-green-500/40 active:scale-95',
    secondary: 'inline-block px-6 py-3 bg-white/90 backdrop-blur-sm text-green-700 border-2 border-green-200/50 rounded-xl text-sm font-semibold shadow-md transition-all duration-300 ease-out hover:bg-green-50/90 hover:border-green-300 hover:scale-105 hover:shadow-lg active:scale-95',
  },
  
  // 리스트
  list: 'space-y-2.5 text-sm text-gray-700 ml-0',
  
  // 기술 스택 아이템
  techStackItem: 'flex items-center gap-2 text-sm text-gray-600',
  techStackLabel: 'font-semibold text-green-700 mr-2 min-w-[70px]',
  
  // 기술 스택 섹션
  techStackSection: 'mb-10 md:mb-16 bg-gradient-to-br from-green-50/70 via-white/50 to-green-50/50 backdrop-blur-md rounded-2xl p-5 md:p-7 lg:p-10 border border-green-100/40 shadow-xl shadow-green-100/20',
  techStackTitle: 'text-2xl md:text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-600 text-center tracking-wide',
  techStackCard: 'flex flex-col items-center justify-center p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200/40 hover:border-green-400 hover:bg-white/95 hover:shadow-xl hover:shadow-green-200/30 hover:scale-105 transition-all duration-300 ease-out',
  techLogo: 'w-12 h-12 md:w-16 md:h-16 object-contain mb-2',
  techName: 'text-xs md:text-sm text-center text-gray-700 font-medium',
  
  // 헤더 이미지
  headerImage: 'w-full h-[600px] object-cover shadow-md',
  
  // 유틸리티
  flexGap: 'flex gap-3 flex-wrap',
  
  // Footer
  footer: 'mt-20 border-t-2 border-green-200/50 bg-gradient-to-br from-green-50/70 via-white/40 to-green-50/50 backdrop-blur-md',
  footerContainer: 'max-w-7xl mx-auto px-5 py-10 md:px-8 md:py-14',
  footerContent: 'mb-8',
  footerTitle: 'text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-600 mb-6 text-center tracking-wide',
  footerLinks: 'flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10',
  footerLink: 'flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:text-green-700 transition-all duration-300 ease-out rounded-xl hover:bg-green-100/80 backdrop-blur-sm hover:scale-105 hover:shadow-md active:scale-95',
  footerLinkIcon: 'text-lg',
  footerBottom: 'mt-6 pt-6 border-t border-green-200 text-center',
  footerText: 'text-sm text-gray-600',
}

