import { useQuery } from '@tanstack/react-query'
import SunCalc from 'suncalc'

export const useAstronomy = (lat = 40.7128, lon = -74.0060) => {
  return useQuery({
    queryKey: ['astronomy', lat, lon],
    queryFn: () => {
      const now = new Date()
      const sunTimes = SunCalc.getTimes(now, lat, lon)
      const moonTimes = SunCalc.getMoonTimes(now, lat, lon)
      const moonIllumination = SunCalc.getMoonIllumination(now)
      

      
      const astronomyData = {
        sun: {
          sunrise: sunTimes.sunrise,
          sunset: sunTimes.sunset,
        },
        moon: {
          rise: moonTimes.rise ? new Date(moonTimes.rise) : null,
          set: moonTimes.set ? new Date(moonTimes.set) : null,
          phase: moonIllumination.phase,
          fraction: moonIllumination.fraction,
        }
      }
      

      return astronomyData
    },
    refetchInterval: 60 * 60 * 1000, // Refetch every hour
    staleTime: 30 * 60 * 1000, // Data is fresh for 30 minutes
    gcTime: 2 * 60 * 60 * 1000, // Keep in cache for 2 hours
  })
}

export const getMoonPhaseIndex = (phase) => {
  // Convert moon phase (0-1) to 8-phase index (0-7)
  // 0 = New Moon, 1 = Waxing Crescent, 2 = First Quarter, 3 = Waxing Gibbous
  // 4 = Full Moon, 5 = Waning Gibbous, 6 = Last Quarter, 7 = Waning Crescent
  if (phase < 0.0625) return 0 // New Moon
  if (phase < 0.1875) return 1 // Waxing Crescent
  if (phase < 0.3125) return 2 // First Quarter
  if (phase < 0.4375) return 3 // Waxing Gibbous
  if (phase < 0.5625) return 4 // Full Moon
  if (phase < 0.6875) return 5 // Waning Gibbous
  if (phase < 0.8125) return 6 // Last Quarter
  if (phase < 0.9375) return 7 // Waning Crescent
  return 0 // New Moon
}
