import React from 'react'
import cloudyIcon from '../icons/cloudy.png'
import fogIcon from '../icons/fog.png'
import partlyCloudyIcon from '../icons/partly_cloudy.png'
import rainIcon from '../icons/rain.png'
import snowIcon from '../icons/snow.png'
import sunIcon from '../icons/sun.png'
import thunderstormIcon from '../icons/thunderstorm.png'

const WeatherPngIcon = ({ type, isActive = false, size = 32 }) => {
  const getWeatherIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return sunIcon
      case 'clouds':
      case 'cloudy':
        return cloudyIcon
      case 'rain':
      case 'drizzle':
        return rainIcon
      case 'snow':
        return snowIcon
      case 'thunderstorm':
        return thunderstormIcon
      case 'mist':
      case 'fog':
        return fogIcon
      default:
        return cloudyIcon // Default to cloudy icon
    }
  }
  
  // Make sun icon 75% the size of other icons
  const iconSize = (type.toLowerCase() === 'clear' || type.toLowerCase() === 'sunny') ? size * 0.75 : size
  
  return (
    <div className={`transition-all duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}>
      <img 
        src={getWeatherIcon(type)} 
        alt={`${type} weather`}
        width={iconSize} 
        height={iconSize}
        className="pixelated transition-all duration-200"
        style={{
          imageRendering: 'pixelated',
          filter: isActive 
            ? 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%) drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))' 
            : 'brightness(0.75) grayscale(0.5)'
        }}
      />
    </div>
  )
}

export const WeatherPngIconsRow = ({ currentWeather }) => {
  const weatherTypes = ['clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'mist']
  
  // Debug: Log the current weather value
  console.log('Current weather condition:', currentWeather)
  
  return (
    <div className="flex gap-4 justify-center">
      {weatherTypes.map((type) => (
        <WeatherPngIcon
          key={type}
          type={type}
          isActive={type === currentWeather?.toLowerCase()}
          size={80}
        />
      ))}
    </div>
  )
}

export default WeatherPngIcon
