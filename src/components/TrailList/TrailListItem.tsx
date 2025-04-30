import React from 'react';
import { Trail } from '../../types';
import { isTrailDangerous, getStatusClassName } from '../../utils/trailUtils';

interface TrailListItemProps {
  trail: Trail;
  onClick: (id: number) => void;
  isSelected: boolean;
}

const TrailListItem: React.FC<TrailListItemProps> = ({ trail, onClick, isSelected }) => {
  const isDangerous = isTrailDangerous(trail);
  const statusClass = getStatusClassName(trail.status);

  return (
    <li
      className={`flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'} ${isDangerous ? 'border-l-4 border-red-500' : ''} `}
      onClick={() => onClick(trail.id)}
    >
      <span className="font-medium">{trail.name}</span>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{trail.difficulty}</span>
        <span className="text-sm text-gray-600">{trail.length} km</span>
        <span className={`text-sm font-semibold ${statusClass}`}>{trail.status.toUpperCase()}</span>
        {isDangerous && <span className="text-red-500">⚠️</span>}
      </div>
    </li>
  );
};

export default TrailListItem;
