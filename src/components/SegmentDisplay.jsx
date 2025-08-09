import React from 'react'

const SegmentDigit = ({ digit, isActive = false, size = 40, color = '#ff0000' }) => {
  const activeColor = isActive ? color : '#1a1a1a'
  const inactiveColor = '#000000'
  const segmentWidth = size * 0.15
  const segmentHeight = size * 0.38
  const gap = size * 0.04
  
  // Define which segments are active for each digit (a,b,c,d,e,f,g)
  const segmentPatterns = {
    '0': [true, true, true, true, true, true, false],
    '1': [false, true, true, false, false, false, false],
    '2': [true, true, false, true, true, false, true],
    '3': [true, true, true, true, false, false, true],
    '4': [false, true, true, false, false, true, true],
    '5': [true, false, true, true, false, true, true],
    '6': [true, false, true, true, true, true, true],
    '7': [true, true, true, false, false, false, false],
    '8': [true, true, true, true, true, true, true],
    '9': [true, true, true, true, false, true, true],
    ' ': [false, false, false, false, false, false, false],
    '-': [false, false, false, false, false, false, true],
    'C': [true, false, false, true, true, true, false],
    'F': [true, false, false, false, true, true, true],
    'H': [false, true, true, false, true, true, true],
    'L': [false, false, false, true, true, true, false],
    'P': [true, true, false, false, true, true, true],
    'A': [true, true, true, false, true, true, true],
    'r': [false, false, false, false, true, false, true],
  }
  
  const pattern = segmentPatterns[digit] || segmentPatterns[' ']
  
  // Geometry helpers to ensure full-height verticals regardless of top/bottom segments
  const digitHeight = size * 1.6
  const topY = gap
  const bottomY = digitHeight - gap
  const centerY = (topY + bottomY) / 2
  
  const Segment = ({ index, x, y, width, height, isHorizontal = true }) => {
    const isSegmentActive = pattern[index]
    const segmentColor = isSegmentActive ? activeColor : inactiveColor
    const glowId = `glow-${index}-${Math.random().toString(36).substr(2, 9)}`
    
    // Create consistent segments with proper dimensions
    if (isHorizontal) {
      // Horizontal segments (top, middle, bottom)
      const bevel = Math.min(height * 0.4, width * 0.08)
      const points = [
        `${x + bevel},${y}`,
        `${x + width - bevel},${y}`,
        `${x + width},${y + height/2}`,
        `${x + width - bevel},${y + height}`,
        `${x + bevel},${y + height}`,
        `${x},${y + height/2}`
      ].join(' ')
      
      return (
        <g>
          {isSegmentActive && (
            <defs>
              <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feColorMatrix in="coloredBlur" type="matrix" values="1 0 0 0 0  0 0.2 0 0 0  0 0 0.2 0 0  0 0 0 1 0"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>
          )}
          <polygon
            points={points}
            fill={segmentColor}
            stroke="none"
            filter={isSegmentActive ? `url(#${glowId})` : 'none'}
            style={{
              transition: 'all 0.2s ease-in-out',
              opacity: 1
            }}
          />
        </g>
      )
    } else {
      // Vertical segments (left and right sides)
      const bevel = Math.min(width * 0.4, height * 0.08)
      const points = [
        `${x},${y + bevel}`,
        `${x + width/2},${y}`,
        `${x + width},${y + bevel}`,
        `${x + width},${y + height - bevel}`,
        `${x + width/2},${y + height}`,
        `${x},${y + height - bevel}`
      ].join(' ')
      
      return (
        <g>
          {isSegmentActive && (
            <defs>
              <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feColorMatrix in="coloredBlur" type="matrix" values="1 0 0 0 0  0 0.2 0 0 0  0 0 0.2 0 0  0 0 0 1 0"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>
          )}
          <polygon
            points={points}
            fill={segmentColor}
            stroke="none"
            filter={isSegmentActive ? `url(#${glowId})` : 'none'}
            style={{
              transition: 'all 0.2s ease-in-out',
              opacity: 1
            }}
          />
        </g>
      )
    }
  }
  
  return (
    <div className="relative">
      {/* Main SVG display */}
      <svg 
        width={size + 20} 
        height={size * 1.6 + 20} 
        viewBox={`-10 -10 ${size + 20} ${size * 1.6 + 20}`} 
        className="segment-digit"
        style={{
          filter: isActive ? `drop-shadow(0 0 6px ${color})` : 'none',
          transition: 'filter 0.2s ease-in-out'
        }}
      >
        
        {/* Segment A (top) */}
        <Segment index={0} x={segmentWidth + 10} y={topY + 10} width={size - segmentWidth * 2} height={segmentWidth} />
        
        {/* Segment B (top right) - runs from top to center */}
        <Segment 
          index={1} 
          x={size - segmentWidth + 10} 
          y={topY + 10} 
          width={segmentWidth} 
          height={Math.max(centerY - topY - segmentWidth / 2, 0)} 
          isHorizontal={false} 
        />
        
        {/* Segment C (bottom right) - runs from center to bottom */}
        <Segment 
          index={2} 
          x={size - segmentWidth + 10} 
          y={centerY + segmentWidth / 2 + 10} 
          width={segmentWidth} 
          height={Math.max(bottomY - (centerY + segmentWidth / 2), 0)} 
          isHorizontal={false} 
        />
        
        {/* Segment D (bottom) */}
        <Segment index={3} x={segmentWidth + 10} y={bottomY - segmentWidth + 10} width={size - segmentWidth * 2} height={segmentWidth} />
        
        {/* Segment E (bottom left) - runs from center to bottom */}
        <Segment 
          index={4} 
          x={10} 
          y={centerY + segmentWidth / 2 + 10} 
          width={segmentWidth} 
          height={Math.max(bottomY - (centerY + segmentWidth / 2), 0)} 
          isHorizontal={false} 
        />
        
        {/* Segment F (top left) - runs from top to center */}
        <Segment 
          index={5} 
          x={10} 
          y={topY + 10} 
          width={segmentWidth} 
          height={Math.max(centerY - topY - segmentWidth / 2, 0)} 
          isHorizontal={false} 
        />
        
        {/* Segment G (middle) - centered around middle line */}
        <Segment index={6} x={segmentWidth + 10} y={centerY - segmentWidth / 2 + 10} width={size - segmentWidth * 2} height={segmentWidth} />
      </svg>
    </div>
  )
}

const SegmentDisplay = ({ value, isActive = false, size = 40, digits = 2, color = '#ff0000' }) => {
  const displayValue = String(value).padStart(digits, '0').slice(-digits)
  
  return (
    <div className="flex gap-1">
      {displayValue.split('').map((digit, index) => (
        <SegmentDigit
          key={index}
          digit={digit}
          isActive={isActive}
          size={size}
          color={color}
        />
      ))}
    </div>
  )
}

export const TimeDisplay = ({ time, isActive = false, color = '#ff0000', timezone = undefined }) => {
  const formatTime = (date) => {
    if (!date) return '--:--'
    
    // Handle both Date objects and ISO strings
    let dateObj = date
    if (typeof date === 'string') {
      dateObj = new Date(date)
    }
    
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      return '--:--'
    }
    
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }
    
    // Add timezone if provided
    if (timezone) {
      options.timeZone = timezone
    }
    
    return dateObj.toLocaleTimeString('en-US', options)
  }
  
  const timeStr = formatTime(time)
  const [hours, minutes] = timeStr.split(':')
  
  return (
    <div className="flex items-center gap-3">
      <SegmentDisplay value={hours} isActive={isActive} size={32} digits={2} color={color} />
      <div 
        className="text-2xl font-bold transition-all duration-200"
        style={{
          color: isActive ? color : '#333',
          textShadow: isActive ? `0 0 8px ${color}` : 'none',
          animation: isActive ? 'pulse 2s infinite' : 'none'
        }}
      >:</div>
      <SegmentDisplay value={minutes} isActive={isActive} size={32} digits={2} color={color} />
    </div>
  )
}

export const ValueDisplay = ({ value, unit = '', isActive = false, digits = 3, color = '#ff0000' }) => {
  return (
    <div className="flex items-center gap-2">
      <SegmentDisplay value={Math.round(value)} isActive={isActive} size={26} digits={digits} color={color} />
      {unit && (
        <span 
          className="text-sm font-mono transition-all duration-200"
          style={{
            color: isActive ? color : '#666',
            textShadow: isActive ? `0 0 4px ${color}` : 'none'
          }}
        >
          {unit}
        </span>
      )}
    </div>
  )
}

export default SegmentDisplay
