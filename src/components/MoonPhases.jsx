import React from 'react'

const MoonPhase = ({ phase, isActive = false, size = 24 }) => {
  const fillColor = isActive ? '#ff0000' : '#000000'
  const darkColor = isActive ? '#ff0000' : '#333333'
  const pixelSize = Math.max(1, Math.floor(size / 16)) // Make pixels scale with size
  
  // Create a pixelated moon pattern using a grid
  const getPixelPattern = (phase) => {
    const gridSize = 16
    const centerX = gridSize / 2
    const centerY = gridSize / 2
    const radius = 6
    
    const pixels = []
    
    // Define moon circle outline
    const moonCircle = []
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const dx = x - centerX + 0.5
        const dy = y - centerY + 0.5
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance <= radius && distance >= radius - 1) {
          moonCircle.push({ x, y })
        }
      }
    }
    
    // Define filled moon area based on phase
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const dx = x - centerX + 0.5
        const dy = y - centerY + 0.5
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance <= radius - 1) {
          let shouldFill = false
          
          switch (phase) {
            case 0: // New Moon - empty
              shouldFill = false
              break
            case 1: // Waxing Crescent - thin sliver on right
              shouldFill = dx > 1.5
              break
            case 2: // First Quarter
              shouldFill = dx > 0
              break
            case 3: // Waxing Gibbous
              shouldFill = dx > -2
              break
            case 4: // Full Moon
              shouldFill = true
              break
            case 5: // Waning Gibbous
              shouldFill = dx < 2
              break
            case 6: // Last Quarter
              shouldFill = dx < 0
              break
            case 7: // Waning Crescent - thin sliver on left
              shouldFill = dx < -1.5
              break
            default:
              shouldFill = false
          }
          
          if (shouldFill) {
            pixels.push({ x, y, fill: fillColor })
          }
        }
      }
    }
    
    // Add outline pixels
    moonCircle.forEach(pixel => {
      pixels.push({ x: pixel.x, y: pixel.y, fill: darkColor })
    })
    
    return pixels
  }
  
  const pixels = getPixelPattern(phase)
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      className="pixelated"
      style={{ 
        imageRendering: 'pixelated',
        imageRendering: '-moz-crisp-edges',
        imageRendering: 'crisp-edges',
        shapeRendering: 'crispEdges',
        filter: isActive ? 'drop-shadow(0 0 8px #ff0000)' : 'none',
        transition: 'filter 0.2s ease-in-out'
      }}
    >
      <defs>
        <style>
          {`
            .pixel {
              stroke: none;
              stroke-width: 0;
              shape-rendering: crispEdges;
            }
          `}
        </style>
      </defs>
      {pixels.map((pixel, index) => (
        <rect
          key={index}
          className="pixel"
          x={pixel.x}
          y={pixel.y}
          width={1}
          height={1}
          fill={pixel.fill}
        />
      ))}
    </svg>
  )
}

export const MoonPhasesRow = ({ currentPhase }) => {
  const phases = [0, 1, 2, 3, 4, 5, 6, 7]
  
  return (
    <div className="flex gap-4 justify-center">
      {phases.map((phase) => (
        <MoonPhase
          key={phase}
          phase={phase}
          isActive={phase === currentPhase}
          size={64}
        />
      ))}
    </div>
  )
}

export default MoonPhase
