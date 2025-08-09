import React, { useState, useEffect } from 'react'
import { useWeather, getWeatherCondition } from './hooks/useWeather'
import { useAstronomy, getMoonPhaseIndex } from './hooks/useAstronomy'
import { MoonPhasesRow } from './components/MoonPhases'
import { WeatherIconsRow } from './components/WeatherIcons'
import { TimeDisplay, ValueDisplay } from './components/SegmentDisplay'

// Location Configuration - Change these values to customize your location
const LOCATION_CONFIG = {
  latitude: 64.58251836652293,
  longitude: 40.51543286464145,
  label: "Arkhangelsk, Russia",
  timezone: "Europe/Moscow"
}

// 64.58251836652293, 40.51543286464145

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { data: weather, isLoading: weatherLoading } = useWeather(LOCATION_CONFIG.latitude, LOCATION_CONFIG.longitude)
  const { data: astronomy, isLoading: astronomyLoading } = useAstronomy(LOCATION_CONFIG.latitude, LOCATION_CONFIG.longitude)

  // Update current time every second (in location timezone)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      // Convert to location timezone
      const locationTime = new Date(now.toLocaleString("en-US", {timeZone: LOCATION_CONFIG.timezone}))
      setCurrentTime(locationTime)
    }
    
    updateTime() // Set initial time
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])
  
  if (weatherLoading || astronomyLoading) {
    return (
      <div className="min-h-screen bg-retro-bg flex items-center justify-center">
        <div className="text-retro-red text-xl font-mono">Loading...</div>
      </div>
    )
  }

  const currentMoonPhase = astronomy ? getMoonPhaseIndex(astronomy.moon.phase) : 0
  const currentWeather = weather?.current ? getWeatherCondition(weather.current.weatherCode) : 'clear'

  return (
    <div className="min-h-screen bg-retro-bg text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with current time */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <TimeDisplay time={currentTime} isActive={true} timezone={LOCATION_CONFIG.timezone} />
          </div>
          <div className="text-retro-red text-sm font-mono">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              timeZone: LOCATION_CONFIG.timezone
            })}
          </div>
        </div>

        {/* Moon Phases Row */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <div className="text-gray-400 text-xs font-mono mb-2">MOON PHASES</div>
            <MoonPhasesRow currentPhase={currentMoonPhase} />
          </div>
        </div>

        {/* Weather Icons Row */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <div className="text-gray-400 text-xs font-mono mb-2">WEATHER</div>
            <WeatherIconsRow currentWeather={currentWeather} />
          </div>
        </div>

        {/* Main Data Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Left Column - Current Weather Data */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">TEMP</span>
              <ValueDisplay 
                value={weather?.current?.temperature || 0} 
                unit="°C" 
                isActive={true}
                digits={2}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">HIGH/LOW</span>
              <div className="flex items-center gap-2">
                <ValueDisplay 
                  value={weather?.daily?.temperatureMax?.[0] || 0} 
                  unit="°C" 
                  isActive={true}
                  digits={2}
                />
                <span className="text-gray-600">/</span>
                <ValueDisplay 
                  value={weather?.daily?.temperatureMin?.[0] || 0} 
                  unit="°C" 
                  isActive={true}
                  digits={2}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">HUM</span>
              <ValueDisplay 
                value={weather?.current?.humidity || 0} 
                unit="%" 
                isActive={true}
                digits={2}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">PRECIP</span>
              <ValueDisplay 
                value={weather?.current?.precipitationProbability || 0} 
                unit="%" 
                isActive={true}
                digits={2}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">PRESS</span>
              <ValueDisplay 
                value={weather?.current?.pressure || 0} 
                unit="hPa" 
                isActive={true}
                digits={4}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">WIND</span>
              <div className="flex items-center gap-2">
                <ValueDisplay 
                  value={weather?.current?.windSpeed || 0} 
                  unit="km/h" 
                  isActive={true}
                  digits={2}
                />
                <ValueDisplay 
                  value={weather?.current?.windDirection || 0} 
                  unit="°" 
                  isActive={true}
                  digits={3}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Astronomy Data */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">SUNRISE</span>
              <TimeDisplay 
                time={weather?.daily?.sunrise?.[0] || astronomy?.sun?.sunrise} 
                isActive={true}
                timezone={LOCATION_CONFIG.timezone}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">SUNSET</span>
              <TimeDisplay 
                time={weather?.daily?.sunset?.[0] || astronomy?.sun?.sunset} 
                isActive={true}
                timezone={LOCATION_CONFIG.timezone}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">MOONRISE</span>
              <TimeDisplay 
                time={astronomy?.moon?.rise} 
                isActive={true}
                timezone={LOCATION_CONFIG.timezone}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs font-mono">MOONSET</span>
              <TimeDisplay 
                time={astronomy?.moon?.set} 
                isActive={true}
                timezone={LOCATION_CONFIG.timezone}
              />
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center text-xs font-mono text-gray-400">
            <div>
              {LOCATION_CONFIG.label}
            </div>
            <div>
              {currentWeather || 'No data'}
            </div>
            <div>
              Moon: {Math.round((astronomy?.moon?.fraction || 0) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
