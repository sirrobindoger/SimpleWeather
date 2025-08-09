import { useQuery } from '@tanstack/react-query'
import { fetchWeatherApi } from 'openmeteo'

const API_URL = 'https://api.open-meteo.com/v1/forecast'

export const useWeather = (lat = 40.7128, lon = -74.0060) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: async () => {
      const params = {
        latitude: [lat],
        longitude: [lon],
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'pressure_msl',
          'wind_speed_10m',
          'wind_direction_10m',
          'weather_code',
          'is_day',
          'precipitation_probability'
        ],
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'sunrise',
          'sunset'
        ],
        timezone: 'auto'
      }

      const responses = await fetchWeatherApi(API_URL, params)
      const response = responses[0]

      console.log('Raw API Response:', response)
      
      const current = response.current()
      const daily = response.daily()
      const utcOffsetSeconds = response.utcOffsetSeconds()

            console.log('Starting data construction...')

      try {
        // Helper function to format the data
        const range = (start, stop, step) =>
          Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

        console.log('About to construct current data...')

        // Build current data step by step
        const currentData = {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature: current.variables(0).value(),
          humidity: current.variables(1).value(),
          pressure: current.variables(2).value(),
          windSpeed: current.variables(3).value(),
          windDirection: current.variables(4).value(),
          weatherCode: current.variables(5).value(),
          isDay: current.variables(6).value(),
          precipitationProbability: current.variables(7).value()
        }

        console.log('Current data constructed:', currentData)
        console.log('About to construct daily data...')

        // Check if daily variables exist and get their values safely
        const weatherCodeArray = daily.variables(0)?.valuesArray() || []
        const temperatureMaxArray = daily.variables(1)?.valuesArray() || []
        const temperatureMinArray = daily.variables(2)?.valuesArray() || []
        const sunriseArray = daily.variables(3)?.valuesArray() || []
        const sunsetArray = daily.variables(4)?.valuesArray() || []

        console.log('Daily variable arrays:')
        console.log('Weather codes:', weatherCodeArray)
        console.log('Temp max:', temperatureMaxArray)
        console.log('Temp min:', temperatureMinArray)
        console.log('Sunrise:', sunriseArray)
        console.log('Sunset:', sunsetArray)

        // Build daily data step by step with null checks
        const dailyData = {
          time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ),
          weatherCode: weatherCodeArray,
          temperatureMax: temperatureMaxArray,
          temperatureMin: temperatureMinArray,
          sunrise: sunriseArray.length > 0 ? sunriseArray.map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ) : [],
          sunset: sunsetArray.length > 0 ? sunsetArray.map(
            (t) => new Date((t + utcOffsetSeconds) * 1000)
          ) : []
        }

        console.log('Daily data constructed:', dailyData)

        // Combine into final object
        const weatherData = {
          current: currentData,
          daily: dailyData
        }

        console.log('Final weather data object created')
        console.log('output', weatherData)
        console.log('responding')

        return weatherData

      } catch (error) {
        console.error('Error constructing weather data:', error)
        console.error('Error stack:', error.stack)
        throw error
      }
    },
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 15 * 60 * 1000, // Keep in cache for 15 minutes
  })
}

// Weather code to condition mapping for Open-Meteo
export const getWeatherCondition = (weatherCode) => {
  if (weatherCode === 0) return 'clear'
  if (weatherCode <= 3) return 'clouds'
  if (weatherCode >= 51 && weatherCode <= 67) return 'rain'
  if (weatherCode >= 71 && weatherCode <= 77) return 'snow'
  if (weatherCode >= 80 && weatherCode <= 82) return 'rain'
  if (weatherCode >= 85 && weatherCode <= 86) return 'snow'
  if (weatherCode >= 95 && weatherCode <= 99) return 'thunderstorm'
  return 'clouds'
}

export const useForecast = (lat = 40.7128, lon = -74.0060) => {
  return useQuery({
    queryKey: ['forecast', lat, lon],
    queryFn: async () => {
      const params = {
        latitude: [lat],
        longitude: [lon],
        hourly: [
          'temperature_2m',
          'weather_code',
          'wind_speed_10m'
        ],
        forecast_days: 3,
        timezone: 'auto'
      }

      const responses = await fetchWeatherApi(API_URL, params)
      const response = responses[0]
      const hourly = response.hourly()

      const range = (start, stop, step) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

      return {
        hourly: {
          time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
            (t) => new Date((t + response.utcOffsetSeconds()) * 1000)
          ),
          temperature: hourly.variables(0).valuesArray(),
          weatherCode: hourly.variables(1).valuesArray(),
          windSpeed: hourly.variables(2).valuesArray()
        }
      }
    },
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
    staleTime: 10 * 60 * 1000, // Data is fresh for 10 minutes
    gcTime: 20 * 60 * 1000, // Keep in cache for 20 minutes
  })
}
