import React from 'react';
import { WeatherData } from '../../types';

interface WeatherInfoProps {
  weather: WeatherData;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ weather }) => {
  return (
    <div className="mb-6">
      <h4 className="mb-2 border-b border-gray-200 pb-1 text-lg font-semibold">Current Weather</h4>
      <div className="flex flex-col space-y-2">
        <p>
          <span className="font-medium">{weather.temperature}°C</span>
          <span className="ml-2 text-gray-600">{weather.conditions}</span>
        </p>
        <p>
          <span className="text-gray-600">Wind:</span> {weather.windSpeed} km/h
        </p>
        <p>
          {weather.precipitation ? (
            <span className="text-blue-600">Precipitation expected</span>
          ) : (
            <span className="text-gray-600">No precipitation expected</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
