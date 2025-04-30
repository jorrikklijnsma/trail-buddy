import { Trail } from '../types';

/**
 * Determines if a trail should be classified as dangerous
 */
export const isTrailDangerous = (trail: Trail): boolean => {
  if (trail.difficulty === 'Hard') return true;
  if (trail.warnings.some(w => w.includes('Steep') || w.includes('Technical'))) return true;
  if (trail.conditions.icePatches) return true;
  if (trail.conditions.snowCovered && trail.elevation > 500) return true;
  return false;
};

/**
 * Get CSS class name for trail status
 */
export const getStatusClassName = (status: string): string => {
  switch (status) {
    case 'open':
      return 'text-green-600';
    case 'closed':
      return 'text-red-600';
    case 'caution':
      return 'text-yellow-600';
    default:
      return '';
  }
};

/**
 * Format distance in kilometers with unit
 */
export const formatDistance = (km: number): string => {
  return `${km.toFixed(1)} km`;
};

/**
 * Format elevation in meters with unit
 */
export const formatElevation = (meters: number): string => {
  return `${meters} m`;
};
