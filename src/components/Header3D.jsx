import { useEffect, useRef, useState } from 'react'

const Header3D = () => {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [visibleNodes, setVisibleNodes] = useState(new Set())
  const [visibleConnections, setVisibleConnections] = useState(new Set())
  const [tiltAngle, setTiltAngle] = useState(0) // 기울기 각도 (-10 ~ +10도)
  const [mouseX, setMouseX] = useState(0)
  const [scrollOpacity, setScrollOpacity] = useState(1) // 스크롤에 따른 투명도

  // 애니메이션 시작 함수
  const startAnimation = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setVisibleNodes(new Set())
    setVisibleConnections(new Set())

    // 노드 한번에 등장 (Glitch 효과와 함께)
    setTimeout(() => {
      const allNodeIds = new Set(nodes.map(node => node.id))
      setVisibleNodes(allNodeIds)
    }, 0)

    // 연결선 순차 등장 (노드 등장 후 시작)
    const nodeDelay = 500 // 노드가 나타난 후 500ms 대기
    connections.forEach((conn, index) => {
      setTimeout(() => {
        setVisibleConnections(prev => new Set([...prev, conn.id]))
      }, nodeDelay + index * 600) // 각 연결선마다 600ms 간격 (더 천천히)
    })

    // 애니메이션 완료 후 상태 리셋
    setTimeout(() => {
      setIsAnimating(false)
    }, nodeDelay + connections.length * 600)
  }

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024) // lg breakpoint
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  // 컴포넌트 마운트 후 4초 뒤 자동 애니메이션 시작 (텍스트 스캔과 동기화)
  // 마지막 텍스트가 1s delay + 3s duration = 4s에 끝나므로 4초에 노드 등장
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation()
    }, 4000) // 4초 후 시작 (마지막 텍스트 스캔 애니메이션 완료와 동기화)

    return () => {
      clearTimeout(timer)
    }
  }, []) // 빈 배열로 마운트 시 한 번만 실행

  // 스크롤에 따른 노드/연결선/텍스트 투명도 조절
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      
      // 헤더 영역 높이 (비디오 높이)
      const headerHeight = 1080
      
      // 스크롤이 헤더 영역을 벗어나면 점진적으로 사라짐
      let opacity = 1
      if (scrollTop > 0) {
        // 스크롤이 시작되면 점진적으로 사라짐
        const fadeStart = 0
        const fadeEnd = headerHeight * 0.5 // 헤더 높이의 50% 지점에서 완전히 사라짐
        const fadeRange = fadeEnd - fadeStart
        
        if (scrollTop <= fadeEnd) {
          opacity = Math.max(0, 1 - (scrollTop / fadeRange))
        } else {
          opacity = 0
        }
      }
      
      setScrollOpacity(opacity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 실행

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 마우스 움직임 감지 및 기울기 계산
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const normalizedX = (x / rect.width) * 2 - 1 // -1 ~ 1 범위로 정규화
      
      setMouseX(normalizedX)
      
      // -10도 ~ +10도 범위로 기울기 계산
      const newTilt = normalizedX * 10
      setTiltAngle(newTilt)
    }

    container.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // 노드 정의: 3D 공간 좌표 (x, y, z) - 중앙을 기준으로 배치
  const nodes = [
    { id: 'frontend', label: 'Frontend', position: { x: -100, y: 160, z: 40 }, labelOffset: { x: -3, y: 0 } },
    { id: 'backend', label: 'Backend', position: { x: 340, y: -90, z: 40 }, labelOffset: { x: 3, y: 0 } },
    { id: 'database', label: 'Database', position: { x: 335, y: 100, z: -90 }, labelOffset: { x: 3, y: -1.5 } },
    { id: 'iot', label: 'IoT', position: { x: -160, y: -130, z: -70 }, labelOffset: { x: -3, y: 1.5 } },
    { id: 'api', label: 'API', position: { x: 100, y: 0, z: 100 }, labelOffset: { x: 0, y: -2.5 } },
    { id: 'state', label: 'State', position: { x: -230, y: -30, z: 120 }, labelOffset: { x: -3, y: 0 } },
  ]

  // 연결선 정의: from -> to
  const connections = [
    { id: 'conn1', from: 'frontend', to: 'state' },
    { id: 'conn2', from: 'frontend', to: 'api' },
    { id: 'conn3', from: 'api', to: 'backend' },
    { id: 'conn4', from: 'backend', to: 'database' },
    { id: 'conn5', from: 'api', to: 'iot' },
    { id: 'conn6', from: 'frontend', to: 'iot' },
  ]

  // 고정된 회전 각도 (기본 3D 각도)
  const baseRotation = { x: 20, y: 30 }

  // 3D 투영 함수: 3D 좌표를 2D 화면 좌표로 변환
  const project3D = (x, y, z, rotateX, rotateY) => {
    // 회전 변환 (라디안)
    const radX = (rotateX * Math.PI) / 180
    const radY = (rotateY * Math.PI) / 180

    // Y축 회전
    let x1 = x * Math.cos(radY) - z * Math.sin(radY)
    let y1 = y
    let z1 = x * Math.sin(radY) + z * Math.cos(radY)

    // X축 회전
    let x2 = x1
    let y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX)
    let z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX)

    // 원근 투영
    const perspective = 500
    const scale = perspective / (perspective + z2)

    // 중앙 기준 좌표 (50% = 중앙)
    const centerX = 50
    const centerY = 50
    const scaleFactor = 0.12

    return {
      x: centerX + (x2 * scale * scaleFactor),
      y: centerY + (y2 * scale * scaleFactor),
      z: z2,
    }
  }

  // 현재 회전 각도에 따른 투영된 노드
  const projectedNodes = nodes.map(node => ({
    ...node,
    projected: project3D(node.position.x, node.position.y, node.position.z, baseRotation.x, baseRotation.y)
  }))

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative perspective-1000 overflow-hidden"
      style={{ pointerEvents: 'auto' }}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        style={{ 
          zIndex: 1, 
          pointerEvents: 'none',
          transform: `perspective(1000px) rotateY(${tiltAngle}deg)`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
          opacity: scrollOpacity
        }}
      >
        <defs>
          {/* 연결선용 그라데이션 */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#4ADE80" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.8" />
          </linearGradient>

          {/* 노드 그라데이션 */}
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#E0E0E0" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* 연결선 */}
        {connections.map((conn) => {
          const fromNode = projectedNodes.find(n => n.id === conn.from)
          const toNode = projectedNodes.find(n => n.id === conn.to)
          if (!fromNode || !toNode) return null

          const from2D = fromNode.projected
          const to2D = toNode.projected
          const isVisible = visibleConnections.has(conn.id)

          // 연결선 길이 계산
          const dx = to2D.x - from2D.x
          const dy = to2D.y - from2D.y
          const length = Math.sqrt(dx * dx + dy * dy)

          return (
            <g key={conn.id}>
              {/* 기본 연결선 - 시작점에서 끝점으로 천천히 그려지는 애니메이션 */}
              {isVisible && (
                <line
                  x1={from2D.x}
                  y1={from2D.y}
                  x2={to2D.x}
                  y2={to2D.y}
                  stroke="url(#lineGradient)"
                  strokeWidth="0.5"
                  strokeDasharray={length}
                  strokeDashoffset={length}
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                  style={{ pointerEvents: 'none' }}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from={length}
                    to="0"
                    dur="8s"
                    fill="freeze"
                  />
                </line>
              )}
              {/* 데이터 흐름 애니메이션 (흐르는 효과) - 연결선이 그려지는 동안 함께 흐름 */}
              {isVisible && (
                <>
                  <line
                    x1={from2D.x}
                    y1={from2D.y}
                    x2={to2D.x}
                    y2={to2D.y}
                    stroke="#00E5FF"
                    strokeWidth="1"
                    strokeOpacity="1"
                    strokeDasharray={`${length * 0.1} ${length * 0.2}`}
                    strokeDashoffset={length}
                    strokeLinecap="round"
                    style={{ pointerEvents: 'none' }}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values={`${length};-${length}`}
                      dur="4s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </line>
                  {/* 추가 흐름 효과 */}
                  <line
                    x1={from2D.x}
                    y1={from2D.y}
                    x2={to2D.x}
                    y2={to2D.y}
                    stroke="#4ADE80"
                    strokeWidth="0.6"
                    strokeOpacity="0.7"
                    strokeDasharray={`${length * 0.15} ${length * 0.25}`}
                    strokeDashoffset={length * 1.2}
                    strokeLinecap="round"
                    style={{ pointerEvents: 'none' }}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values={`${length * 1.2};-${length * 0.8}`}
                      dur="2s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </line>
                </>
              )}
            </g>
          )
        })}

        {/* SVG 내부 노드들 */}
        {projectedNodes.map((node) => {
          const isVisible = visibleNodes.has(node.id)
          const nodeSize = 1.2

          return (
            <g
              key={node.id}
              className={isVisible ? 'glitch-effect-subtle' : ''}
              style={{ pointerEvents: 'none' }}
            >
              {/* 외부 Glow 효과 */}
              <circle
                cx={node.projected.x}
                cy={node.projected.y}
                r={nodeSize * 1.5}
                fill="rgba(0, 229, 255, 0.3)"
                opacity={isVisible ? 1 : 0}
                style={{ pointerEvents: 'none' }}
              >
                {isVisible && (
                  <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="0.3s"
                    fill="freeze"
                  />
                )}
              </circle>
              {/* 노드 점 (시각적) */}
              <circle
                cx={node.projected.x}
                cy={node.projected.y}
                r={nodeSize}
                fill="url(#nodeGradient)"
                opacity={isVisible ? 1 : 0}
                style={{ pointerEvents: 'none' }}
              >
                {isVisible && (
                  <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="0.3s"
                    fill="freeze"
                  />
                )}
              </circle>
              {/* 내부 하이라이트 */}
              <circle
                cx={node.projected.x}
                cy={node.projected.y}
                r={nodeSize * 0.5}
                fill="rgba(255, 255, 255, 0.4)"
                opacity={isVisible ? 1 : 0}
                style={{ pointerEvents: 'none' }}
              >
                {isVisible && (
                  <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="0.3s"
                    fill="freeze"
                  />
                )}
              </circle>
              {/* 라벨 텍스트 */}
              <text
                x={node.projected.x + node.labelOffset.x}
                y={node.projected.y + node.labelOffset.y}
                fill="#00E5FF"
                fontSize={isLargeScreen ? "2.0" : "2.5"}
                fontWeight="600"
                textAnchor={node.labelOffset.x < 0 ? "end" : node.labelOffset.x > 0 ? "start" : "middle"}
                dominantBaseline={node.labelOffset.y < 0 ? "text-after-edge" : node.labelOffset.y > 0 ? "text-before-edge" : "middle"}
                opacity={isVisible ? 1 : 0}
                style={{ 
                  pointerEvents: 'none',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                className="node-label"
              >
                {isVisible && (
                  <animate
                    attributeName="opacity"
                    values="0;1"
                    dur="0.3s"
                    fill="freeze"
                  />
                )}
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default Header3D
