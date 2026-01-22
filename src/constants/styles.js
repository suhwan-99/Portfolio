// Tailwind CSS 클래스 상수 모음

export const styles = {
  // 레이아웃
  container: 'min-h-screen bg-gradient-to-br via-white to-green-50/20 w-full mx-auto',
  header: 'mb-16 md:mb-20',
  headerContainer: 'relative w-full',
  headerContent: 'absolute inset-0 flex flex-col items-end justify-start text-left z-10 p-6 md:p-10 lg:p-12',
  header3D: 'absolute inset-0 flex items-center justify-end pr-10 md:pr-20 z-10',
  main: 'w-full px-4 md:px-6 lg:px-8',
  
  // 타이포그래피
  h1: 'text-4xl md:text-5xl font-bold mb-3 text-[#f8f9fa] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] tracking-tight',
  headerSlogan: 'text-2xl md:text-4xl lg:text-5xl font-serif italic text-white/90 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] tracking-wide mb-2',
  h2: 'text-xl md:text-2xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 border-b-2 border-green-200/60 pb-2 md:pb-3 tracking-wide',
  h3: 'text-xs md:text-sm font-bold text-green-700 mb-2 tracking-wide',
  subtitle: 'text-base md:text-lg text-white drop-shadow-lg tracking-normal',
  bodyText: 'text-sm md:text-base leading-relaxed text-gray-700 mb-4 md:mb-5 tracking-normal',
  smallText: 'text-sm text-gray-600 tracking-normal',
  
  // 카드
  card: 'bg-white/90 backdrop-blur-lg border-l-4 border-l-green-500 border border-gray-200/30 rounded-xl md:rounded-2xl p-4 md:p-7 shadow-lg shadow-gray-200/30 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:shadow-green-200/40 hover:border-green-500 hover:bg-white/95 max-h-[90vh] overflow-y-auto',
  
  // 그리드
  grid: 'flex flex-col items-center gap-8 md:gap-10',
  techGrid: 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-7',
  
  // 구분선
  divider: 'mb-4 md:mb-6 pt-3 md:pt-5 border-t border-green-200/60',
  
  // 버튼
  button: {
    primary: 'inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg md:rounded-xl text-xs md:text-sm font-semibold shadow-lg shadow-green-500/30 transition-all duration-300 ease-out hover:from-green-700 hover:to-green-600 hover:scale-105 hover:shadow-xl hover:shadow-green-500/40 active:scale-95',
    secondary: 'inline-block px-4 md:px-6 py-2 md:py-3 bg-white/90 backdrop-blur-sm text-green-700 border-2 border-green-200/50 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold shadow-md transition-all duration-300 ease-out hover:bg-green-50/90 hover:border-green-300 hover:scale-105 hover:shadow-lg active:scale-95',
  },
  
  // 리스트
  list: 'space-y-2 md:space-y-2.5 text-xs md:text-sm text-gray-700 ml-0',
  
  // 기술 스택 아이템
  techStackItem: 'flex items-center gap-2 text-xs md:text-sm text-gray-600',
  techStackLabel: 'font-semibold text-green-700 mr-2 min-w-[60px] md:min-w-[70px] text-xs md:text-sm',
  
  // 기술 스택 섹션
  techStackSection: 'mb-10 md:mb-30 bg-gradient-to-br from-green-50/70 via-white/50 to-green-50/50 backdrop-blur-md rounded-2xl p-3 md:p-7 lg:p-10 border-2 border-green-300/60 shadow-xl shadow-green-100/20 max-h-[90vh] overflow-y-auto',
  techStackTitle: 'text-xl md:text-3xl font-bold mb-4 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-600 text-center tracking-wide',
  techStackCard: 'relative flex flex-col items-center justify-center p-3 md:p-5 bg-white/30 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/40 shadow-xl shadow-black/10 hover:border-green-300/50 hover:bg-white/40 hover:shadow-2xl hover:shadow-green-200/30 hover:scale-105 transition-all duration-300 ease-out before:absolute before:inset-0 before:rounded-xl md:before:rounded-2xl before:bg-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent before:pointer-events-none after:absolute after:inset-0 after:rounded-xl md:after:rounded-2xl after:bg-gradient-to-t after:from-white/20 after:to-transparent after:pointer-events-none',
  techLogo: 'w-10 h-10 md:w-16 md:h-16 object-contain mb-1 md:mb-2',
  techName: 'text-[10px] md:text-sm text-center text-gray-700 font-medium',
  
  // 헤더 이미지/비디오
  headerImage: 'w-full h-[600px] object-cover shadow-md',
  headerVideo: 'w-full h-[600px] object-cover shadow-md',
  
  // 유틸리티
  flexGap: 'flex gap-3 flex-wrap',
  
  // Footer
  footer: 'mt-20 border-t-2 border-green-200/50 bg-gradient-to-br from-green-50/95 via-white/30 to-green-50/95 backdrop-blur-md rounded-2xl p-5 md:p-7 lg:p-10 shadow-xl',
  footerContainer: 'max-w-7xl mx-auto px-5 py-10 md:px-8 md:py-14',
  footerContent: 'mb-8',
  footerTitle: 'text-xl md:text-2xl font-bold text-green-200 mb-6 text-center tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]',
  footerLinks: 'text-xl flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10',
  footerLink: 'flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm text-gray-800 hover:text-green-700 font-semibold transition-all duration-300 ease-out rounded-xl border border-gray-200/50 hover:bg-green-100/90 hover:border-green-300/70 hover:scale-105 hover:shadow-md active:scale-95 shadow-md',
  footerLinkIcon: 'text-lg',
  footerBottom: 'mt-6 pt-6 border-t border-green-200 text-center',
  footerText: 'text-sm text-gray-600',
}

