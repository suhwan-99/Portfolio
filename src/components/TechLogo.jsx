import { getTechLogo, getTechColor } from '../data/techLogos'

export const TechLogo = ({ techName, className = 'w-4 h-4' }) => {
  const logoPath = getTechLogo(techName)
  const color = getTechColor(techName)

  if (!logoPath) {
    return null
  }

  // 파일 확장자 확인
  const fileExtension = logoPath.split('.').pop().toLowerCase()
  const isPNG = fileExtension === 'png'

  // PNG 이미지인 경우
  if (isPNG) {
    return (
      <img 
        src={logoPath} 
        alt={`${techName} logo`}
        className={className + ' object-contain'}
        style={{ 
          // PNG의 경우 색상 적용이 어려우므로 border나 background로 표현 가능
          // 필요시 배경색이나 테두리 추가 가능
        }}
        onError={(e) => {
          // 이미지 로드 실패 시 색상 배경 div로 대체
          e.target.style.display = 'none'
          const parent = e.target.parentElement
          if (parent && !parent.querySelector('.fallback')) {
            const fallback = document.createElement('div')
            fallback.className = className + ' inline-flex items-center justify-center bg-gray-200 rounded fallback'
            fallback.style.backgroundColor = color + '20'
            fallback.title = techName
            parent.appendChild(fallback)
          }
        }}
      />
    )
  }


  // 기타 이미지 형식
  return (
    <img 
      src={logoPath} 
      alt={`${techName} logo`}
      className={className + ' object-contain'}
      onError={(e) => {
        e.target.style.display = 'none'
      }}
    />
  )
}

export default TechLogo

