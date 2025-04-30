import React from 'react';
import { TrailMaintenanceIssue } from '../../types';

interface MaintenanceInfoProps {
  info: TrailMaintenanceIssue;
  lastMaintenance: string;
}

const MaintenanceInfo: React.FC<MaintenanceInfoProps> = ({ info, lastMaintenance }) => {
  return (
    <div className="mb-4">
      <h4 className="mb-2 border-b border-gray-200 pb-1 text-lg font-semibold">
        Maintenance Information
      </h4>
      <p className="mb-2">
        <span className="text-gray-600">Last maintained:</span> {lastMaintenance}
      </p>

      {info.needsMaintenance ? (
        <div className="rounded-md border border-red-100 bg-red-50 p-3">
          <p className="mb-2 font-semibold text-red-600">Trail needs maintenance</p>

          {info.issues && info.issues.length > 0 && (
            <div className="mb-2">
              <p className="text-gray-700">Issues:</p>
              <ul className="ml-5 list-disc">
                {info.issues.map((issue, idx) => (
                  <li key={idx} className="text-gray-700">
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {info.scheduledDate && (
            <p className="text-gray-700">
              <span className="text-gray-600">Scheduled:</span>{' '}
              {info.scheduledDate.toLocaleDateString()}
            </p>
          )}
        </div>
      ) : (
        <p className="text-green-600">No maintenance currently needed.</p>
      )}
    </div>
  );
};

export default MaintenanceInfo;
