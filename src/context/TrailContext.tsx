import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Trail, TrailContextType, WeatherData, TrailMaintenanceInfo } from '../types';
import { mockTrails, generateMockMaintenanceInfo, generateMockWeather } from '../data/mockData';

// Create context with default values
export const TrailContext = createContext<TrailContextType>({
  trails: null,
  loading: true,
  error: false,
  selectedTrailId: null,
  setSelectedTrailId: () => {},
  weatherData: null,
  fetchWeatherForTrail: () => {},
  refreshTrailData: () => {},
  trailMaintenanceInfo: {},
});

interface TrailProviderProps {
  children: ReactNode;
}

export const TrailProvider: React.FC<TrailProviderProps> = ({ children }) => {
  const [trails, setTrails] = useState<Trail[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | string>(false);
  const [selectedTrailId, setSelectedTrailId] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [trailMaintenanceInfo, setTrailMaintenanceInfo] = useState<TrailMaintenanceInfo>({});

  // Fetch trail data
  const fetchTrailData = useCallback(() => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      try {
        setTrails(mockTrails);
        setTrailMaintenanceInfo(generateMockMaintenanceInfo());
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trail data');
        setLoading(false);
      }
    }, 1000);
  }, []);

  // Fetch weather data for a trail
  const fetchWeatherForTrail = useCallback(
    (trailId: number) => {
      // Find the selected trail
      const trail = trails?.find(t => t.id === trailId);
      if (!trail) return;

      // Simulate API call
      setTimeout(() => {
        setWeatherData(generateMockWeather());
      }, 800);
    },
    [trails]
  );

  // Initial data fetch
  useEffect(() => {
    fetchTrailData();

    // Set up interval to refresh data (every 5 minutes)
    const intervalId = setInterval(fetchTrailData, 300000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchTrailData]);

  // Value to be provided to consumers
  const value: TrailContextType = {
    trails,
    loading,
    error,
    selectedTrailId,
    setSelectedTrailId,
    weatherData,
    fetchWeatherForTrail,
    refreshTrailData: fetchTrailData,
    trailMaintenanceInfo,
  };

  return <TrailContext.Provider value={value}>{children}</TrailContext.Provider>;
};
