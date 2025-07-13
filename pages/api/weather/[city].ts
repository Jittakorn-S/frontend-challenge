import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const geoRes = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );
    const geoData = await geoRes.json();

    if (!Array.isArray(geoData) || geoData.length === 0) {
      return res.status(404).json({ message: 'City not found.' });
    }

    const { lat, lon, name, country } = geoData[0];

    const [weatherRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      )
    ]);

    if (!weatherRes.ok || !forecastRes.ok) {
      throw new Error('Failed to fetch weather data from OpenWeather.');
    }

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    const combinedData = {
      name,
      country,
      timezone: weatherData.timezone, 
      current: {
        temp: weatherData.main.temp,
        weather: weatherData.weather,
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        wind_speed: weatherData.wind.speed,
        rain: weatherData.rain || { '1h': 0 },
      },
      daily: [{
        temp: {
          min: weatherData.main.temp_min,
          max: weatherData.main.temp_max
        }
      }],
      hourly: forecastData.list,
    };

    res.status(200).json(combinedData);

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error fetching weather data';
    res.status(500).json({ message });
  }
}