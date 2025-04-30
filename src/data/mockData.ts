import { Trail, WeatherData, TrailMaintenanceInfo } from '../types';

export const mockTrails: Trail[] = [
  {
    id: 1,
    name: 'Monkey Trail',
    difficulty: 'Moderate',
    length: 5.2,
    elevation: 350,
    status: 'open',
    lastMaintenance: '2023-12-15',
    conditions: {
      muddy: true,
      rocky: false,
      snowCovered: false,
      icePatches: false,
    },
    warnings: ['Wildlife active in area', 'Some muddy sections'],
    latitude: 35.6895,
    longitude: 139.6917,
  },
  {
    id: 2,
    name: 'Eagle View Loop',
    difficulty: 'Easy',
    length: 2.8,
    elevation: 120,
    status: 'closed',
    lastMaintenance: '2024-01-10',
    conditions: {
      muddy: false,
      rocky: true,
      snowCovered: false,
      icePatches: false,
    },
    warnings: ['Trail closed for maintenance'],
    latitude: 35.6892,
    longitude: 139.7021,
  },
  {
    id: 3,
    name: 'Cliffside Path',
    difficulty: 'Hard',
    length: 7.5,
    elevation: 870,
    status: 'open',
    lastMaintenance: '2024-02-05',
    conditions: {
      muddy: false,
      rocky: true,
      snowCovered: false,
      icePatches: false,
    },
    warnings: ['Steep dropoffs', 'Technical climbing sections', 'Not recommended for beginners'],
    latitude: 35.704,
    longitude: 139.7007,
  },
  {
    id: 4,
    name: 'Forest Loop',
    difficulty: 'Easy',
    length: 3.1,
    elevation: 50,
    status: 'caution',
    lastMaintenance: '2023-11-20',
    conditions: {
      muddy: true,
      rocky: false,
      snowCovered: false,
      icePatches: false,
    },
    warnings: ['Fallen trees on north section', 'Bridge under repair'],
    latitude: 35.695,
    longitude: 139.686,
  },
];

export const generateMockMaintenanceInfo = (): TrailMaintenanceInfo => {
  const maintenanceInfo: TrailMaintenanceInfo = {};

  mockTrails.forEach(trail => {
    if (Math.random() < 0.3) {
      maintenanceInfo[trail.id] = {
        needsMaintenance: true,
        issues: ['Erosion', 'Overgrowth'].filter(() => Math.random() > 0.5),
        scheduledDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
      };
    } else {
      maintenanceInfo[trail.id] = {
        needsMaintenance: false,
      };
    }
  });

  return maintenanceInfo;
};

export const generateMockWeather = (): WeatherData => {
  return {
    temperature: Math.floor(Math.random() * 15) + 10, // 10-25°C
    conditions: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
    windSpeed: Math.floor(Math.random() * 30), // 0-30 km/h
    precipitation: Math.random() < 0.3, // 30% chance of precipitation
  };
};
