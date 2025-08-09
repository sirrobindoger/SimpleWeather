import React from 'react'

const WeatherIcon = ({ type, isActive = false, size = 32 }) => {
  const fillColor = isActive ? '#ff0000' : '#666666'
  const strokeColor = isActive ? '#ff0000' : '#333333'
  
  const getWeatherPath = (type) => {
    switch (type.toLowerCase()) {
      case 'clear':
      case 'sunny':
        // Enhanced sun with rays
        return (
          <g>
            <circle cx={size/2} cy={size/2} r="12" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <g stroke={strokeColor} strokeWidth="3" strokeLinecap="round">
              <line x1={size/2} y1="6" x2={size/2} y2="14" />
              <line x1={size/2} y1={size-14} x2={size/2} y2={size-6} />
              <line x1="6" y1={size/2} x2="14" y2={size/2} />
              <line x1={size-14} y1={size/2} x2={size-6} y2={size/2} />
              <line x1="12" y1="12" x2="17" y2="17" />
              <line x1={size-17} y1="12" x2={size-12} y2="17" />
              <line x1="12" y1={size-12} x2="17" y2={size-17} />
              <line x1={size-17} y1={size-12} x2={size-12} y2={size-17} />
            </g>
          </g>
        )
      case 'clouds':
      case 'cloudy':
        // Pixelated cloud based on reference image
        return (
          <g fill={fillColor} stroke="none">
            {/* Top row */}
            <rect x={size/2-6} y={size/2-12} width="4" height="4" />
            <rect x={size/2-2} y={size/2-12} width="4" height="4" />
            <rect x={size/2+2} y={size/2-12} width="4" height="4" />
            
            {/* Second row */}
            <rect x={size/2-10} y={size/2-8} width="4" height="4" />
            <rect x={size/2-6} y={size/2-8} width="4" height="4" />
            <rect x={size/2-2} y={size/2-8} width="4" height="4" />
            <rect x={size/2+2} y={size/2-8} width="4" height="4" />
            <rect x={size/2+6} y={size/2-8} width="4" height="4" />
            <rect x={size/2+10} y={size/2-8} width="4" height="4" />
            
            {/* Third row */}
            <rect x={size/2-14} y={size/2-4} width="4" height="4" />
            <rect x={size/2-10} y={size/2-4} width="4" height="4" />
            <rect x={size/2-6} y={size/2-4} width="4" height="4" />
            <rect x={size/2-2} y={size/2-4} width="4" height="4" />
            <rect x={size/2+2} y={size/2-4} width="4" height="4" />
            <rect x={size/2+6} y={size/2-4} width="4" height="4" />
            <rect x={size/2+10} y={size/2-4} width="4" height="4" />
            <rect x={size/2+14} y={size/2-4} width="4" height="4" />
            
            {/* Fourth row */}
            <rect x={size/2-14} y={size/2} width="4" height="4" />
            <rect x={size/2-10} y={size/2} width="4" height="4" />
            <rect x={size/2-6} y={size/2} width="4" height="4" />
            <rect x={size/2-2} y={size/2} width="4" height="4" />
            <rect x={size/2+2} y={size/2} width="4" height="4" />
            <rect x={size/2+6} y={size/2} width="4" height="4" />
            <rect x={size/2+10} y={size/2} width="4" height="4" />
            <rect x={size/2+14} y={size/2} width="4" height="4" />
            
            {/* Fifth row */}
            <rect x={size/2-14} y={size/2+4} width="4" height="4" />
            <rect x={size/2-10} y={size/2+4} width="4" height="4" />
            <rect x={size/2-6} y={size/2+4} width="4" height="4" />
            <rect x={size/2-2} y={size/2+4} width="4" height="4" />
            <rect x={size/2+2} y={size/2+4} width="4" height="4" />
            <rect x={size/2+6} y={size/2+4} width="4" height="4" />
            <rect x={size/2+10} y={size/2+4} width="4" height="4" />
            <rect x={size/2+14} y={size/2+4} width="4" height="4" />
            
            {/* Bottom row */}
            <rect x={size/2-10} y={size/2+8} width="4" height="4" />
            <rect x={size/2-6} y={size/2+8} width="4" height="4" />
            <rect x={size/2-2} y={size/2+8} width="4" height="4" />
            <rect x={size/2+2} y={size/2+8} width="4" height="4" />
            <rect x={size/2+6} y={size/2+8} width="4" height="4" />
            <rect x={size/2+10} y={size/2+8} width="4" height="4" />
          </g>
        )
      case 'rain':
      case 'drizzle':
        // Enhanced cloud with rain
        return (
          <g>
            <path
              d={`M16 ${size/2} Q16 ${size/2-6} 22 ${size/2-6} Q26 ${size/2-10} 34 ${size/2-6} Q42 ${size/2-6} 46 ${size/2} Q46 ${size/2+8} 38 ${size/2+8} L22 ${size/2+8} Q16 ${size/2+8} 16 ${size/2}`}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <circle cx="24" cy={size/2-4} r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <circle cx="38" cy={size/2-2} r="7" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <g stroke={strokeColor} strokeWidth="2" strokeLinecap="round">
              <line x1="20" y1={size/2+12} x2="18" y2={size/2+18} />
              <line x1="26" y1={size/2+14} x2="24" y2={size/2+20} />
              <line x1="32" y1={size/2+12} x2="30" y2={size/2+18} />
              <line x1="38" y1={size/2+14} x2="36" y2={size/2+20} />
              <line x1="44" y1={size/2+12} x2="42" y2={size/2+18} />
            </g>
          </g>
        )
      case 'snow':
        // Enhanced snowflake
        return (
          <g stroke={strokeColor} strokeWidth="2" strokeLinecap="round">
            <line x1={size/2} y1="8" x2={size/2} y2={size-8} />
            <line x1="8" y1={size/2} x2={size-8} y2={size/2} />
            <line x1="14" y1="14" x2={size-14} y2={size-14} />
            <line x1="14" y1={size-14} x2={size-14} y2="14" />
            <g stroke={strokeColor} strokeWidth="2" strokeLinecap="round">
              <line x1={size/2-4} y1="12" x2={size/2-2} y2="10" />
              <line x1={size/2+2} y1="10" x2={size/2+4} y2="12" />
              <line x1={size/2-4} y1={size-12} x2={size/2-2} y2={size-10} />
              <line x1={size/2+2} y1={size-10} x2={size/2+4} y2={size-12} />
              <line x1="12" y1={size/2-4} x2="10" y2={size/2-2} />
              <line x1="10" y1={size/2+2} x2="12" y2={size/2+4} />
              <line x1={size-12} y1={size/2-4} x2={size-10} y2={size/2-2} />
              <line x1={size-10} y1={size/2+2} x2={size-12} y2={size/2+4} />
            </g>
            <circle cx={size/2} cy={size/2} r="3" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
          </g>
        )
      case 'thunderstorm':
        // Enhanced cloud with lightning
        return (
          <g>
            <path
              d={`M16 ${size/2-4} Q16 ${size/2-8} 22 ${size/2-8} Q26 ${size/2-12} 34 ${size/2-8} Q42 ${size/2-8} 46 ${size/2-4} Q46 ${size/2+4} 38 ${size/2+4} L22 ${size/2+4} Q16 ${size/2+4} 16 ${size/2-4}`}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <circle cx="24" cy={size/2-6} r="5" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <circle cx="38" cy={size/2-4} r="7" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <path
              d={`M${size/2-3} ${size/2+8} L${size/2+3} ${size/2+8} L${size/2-1} ${size/2+14} L${size/2+5} ${size/2+14} L${size/2+1} ${size/2+20} L${size/2-6} ${size/2+14} L${size/2-1} ${size/2+14} L${size/2-3} ${size/2+8}`}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
          </g>
        )
      case 'mist':
      case 'fog':
        // Enhanced horizontal lines for mist
        return (
          <g stroke={strokeColor} strokeWidth="3" strokeLinecap="round">
            <line x1="8" y1={size/2-8} x2={size-8} y2={size/2-8} />
            <line x1="12" y1={size/2-4} x2={size-12} y2={size/2-4} />
            <line x1="8" y1={size/2} x2={size-8} y2={size/2} />
            <line x1="12" y1={size/2+4} x2={size-12} y2={size/2+4} />
            <line x1="8" y1={size/2+8} x2={size-8} y2={size/2+8} />
          </g>
        )
      default:
        // Enhanced default cloud
        return (
          <g>
            <path
              d={`M16 ${size/2+4} Q16 ${size/2-4} 22 ${size/2-4} Q26 ${size/2-8} 34 ${size/2-4} Q42 ${size/2-4} 46 ${size/2+4} Q46 ${size/2+12} 38 ${size/2+12} L22 ${size/2+12} Q16 ${size/2+12} 16 ${size/2+4}`}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth="2"
            />
            <circle cx="24" cy={size/2-2} r="6" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
            <circle cx="38" cy={size/2} r="8" fill={fillColor} stroke={strokeColor} strokeWidth="2"/>
          </g>
        )
    }
  }
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="pixelated">
      {getWeatherPath(type)}
    </svg>
  )
}

export const WeatherIconsRow = ({ currentWeather }) => {
  const weatherTypes = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'mist']
  
  return (
    <div className="flex gap-4 justify-center">
      {weatherTypes.map((type) => (
        <WeatherIcon
          key={type}
          type={type}
          isActive={type === currentWeather?.toLowerCase()}
          size={64}
        />
      ))}
    </div>
  )
}

export default WeatherIcon
