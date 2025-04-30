export type TrailDifficulty = 'Easy' | 'Moderate' | 'Hard';
export type TrailStatus = 'open' | 'closed' | 'caution';

export interface TrailConditions {
  muddy: boolean;
  rocky: boolean;
  snowCovered: boolean;
  icePatches: boolean;
}

export interface Trail {
  id: number;
  name: string;
  difficulty: TrailDifficulty;
  length: number;
  elevation: number;
  status: TrailStatus;
  lastMaintenance: string;
  conditions: TrailConditions;
  warnings: string[];
  latitude: number;
  longitude: number;
}

export interface TrailMaintenanceIssue {
  needsMaintenance: boolean;
  issues?: string[];
  scheduledDate?: Date;
}

export interface TrailMaintenanceInfo {
  [trailId: number]: TrailMaintenanceIssue;
}

export interface WeatherData {
  temperature: number;
  conditions: string;
  windSpeed: number;
  precipitation: boolean;
}

export interface TrailContextType {
  trails: Trail[] | null;
  loading: boolean;
  error: boolean | string;
  selectedTrailId: number | null;
  setSelectedTrailId: (id: number | null) => void;
  weatherData: WeatherData | null;
  fetchWeatherForTrail: (trailId: number) => void;
  refreshTrailData: () => void;
  trailMaintenanceInfo: TrailMaintenanceInfo;
}
