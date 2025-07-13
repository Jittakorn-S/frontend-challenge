'use client';

import { useState } from 'react';
import Search from '@/components/Search/Search';
import WeatherDetails from '@/components/Weather/WeatherDetails';
import Forecast from '@/components/Weather/Forecast';
import { WeatherData } from '@/types/weather';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const res = await fetch(`/api/weather/${city}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'City not found');
      }
      const data: WeatherData = await res.json();
      setWeatherData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <main className="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden">
        <Search onSearch={handleSearch} />
        <div className="p-6">
          {loading && <p className="text-center py-10 text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500 py-10">{error}</p>}
          {weatherData && (
            <>
              <WeatherDetails data={weatherData} />
              <Forecast data={weatherData.hourly} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}