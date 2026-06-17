import { useState, useEffect } from 'react'

const CACHE_KEY = 'weatherCache'
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_TTL) {
        setWeatherData(data)
        return
      }
    }

    fetch(
      `https://weather.googleapis.com/v1/currentConditions:lookup?key=${import.meta.env.VITE_GOOGLE_WEATHER_API}&location.latitude=${import.meta.env.VITE_LATITUDE}&location.longitude=${import.meta.env.VITE_LONGITUDE}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.temperature) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
        }
        setWeatherData(data)
      })
  }, [])

  return weatherData
}
