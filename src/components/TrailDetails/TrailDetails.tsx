import React, { useContext, useEffect } from 'react';
import { TrailContext } from '../../context/TrailContext';
import Card from '../ui/Card';
import WeatherInfo from './WeatherInfo';
import MaintenanceInfo from './MaintenanceInfo';
import { getStatusClassName } from '../../utils/trailUtils';

const TrailDetails: React.FC = () => {
  const { trails, selectedTrailId, weatherData, fetchWeatherForTrail, trailMaintenanceInfo } =
    useContext(TrailContext);

  // Find the selected trail
  const selectedTrail =
    selectedTrailId !== null && trails ? trails.find(trail => trail.id === selectedTrailId) : null;

  // Fetch weather data when selected trail changes
  useEffect(() => {
    if (selectedTrailId !== null) {
      fetchWeatherForTrail(selectedTrailId);
    }
  }, [selectedTrailId, fetchWeatherForTrail]);

  // If no trail is selected, show a message
  if (!selectedTrail) {
    return (
      <Card className="min-w-[300px] flex-1">
        <p className="py-8 text-center text-gray-500">Select a trail to view details</p>
      </Card>
    );
  }

  // Get maintenance info for this trail
  const maintenanceInfo = trailMaintenanceInfo[selectedTrail.id];

  return (
    <Card className="min-w-[300px] flex-1">
      <h3 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold">
        {selectedTrail.name}
      </h3>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <span className="text-sm text-gray-500">Difficulty</span>
          <p className="font-semibold">{selectedTrail.difficulty}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Length</span>
          <p className="font-semibold">{selectedTrail.length} km</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Elevation Gain</span>
          <p className="font-semibold">{selectedTrail.elevation} m</p>
        </div>
        <div>
          <span className="text-sm text-gray-500">Status</span>
          <p className={`font-semibold ${getStatusClassName(selectedTrail.status)}`}>
            {selectedTrail.status.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="mb-2 text-lg font-semibold">Trail Conditions</h4>
        <ul className="ml-5 list-disc">
          {selectedTrail.conditions.muddy && <li>Muddy</li>}
          {selectedTrail.conditions.rocky && <li>Rocky terrain</li>}
          {selectedTrail.conditions.snowCovered && <li>Snow covered</li>}
          {selectedTrail.conditions.icePatches && <li>Ice patches present</li>}
        </ul>
      </div>

      {selectedTrail.warnings.length > 0 && (
        <div className="mb-6">
          <h4 className="mb-2 text-lg font-semibold">Warnings</h4>
          <ul className="ml-5 list-disc">
            {selectedTrail.warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {weatherData && <WeatherInfo weather={weatherData} />}

      {maintenanceInfo && (
        <MaintenanceInfo info={maintenanceInfo} lastMaintenance={selectedTrail.lastMaintenance} />
      )}
    </Card>
  );
};

export default TrailDetails;
