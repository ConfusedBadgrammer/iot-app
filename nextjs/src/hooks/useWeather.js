import { useState, useEffect } from "react";

const CACHE_KEY = "weatherCache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setWeatherData(data);
        return;
      }
    }

    fetch(
      `https://weather.googleapis.com/v1/currentConditions:lookup?key=${process.env.NEXT_PUBLIC_GOOGLE_WEATHER_API}&location.latitude=${process.env.NEXT_PUBLIC_LATITUDE}&location.longitude=${process.env.NEXT_PUBLIC_LONGITUDE}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.temperature) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        }
        setWeatherData(data);
      });
  }, []);

  return weatherData;
}
