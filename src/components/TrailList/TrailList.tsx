// This is our "problem" component that needs refactoring:
// - It's a class component (rest of the app uses functional components)
// - It duplicates logic that should be in the context
// - It has its own state for filtering that should be lifted
// - It has poor typing
// - It directly accesses context in an inefficient way
// - It contains business logic that should be in utilities
// - It doesn't use the TrailListItem component that the rest of the app uses

import React from 'react';
import { TrailContext } from '../../context/TrailContext';
import { Trail } from '../../types';

// Mixing concerns with UI and business logic
class TrailList extends React.Component<{}, { showDangerousTrails: boolean }> {
  // Using static contextType instead of consuming context properly
  static contextType = TrailContext;
  context!: React.ContextType<typeof TrailContext>;

  constructor(props: {}) {
    super(props);
    this.state = {
      showDangerousTrails: false,
    };

    // Explicit binding needed with class components
    this.toggleDangerousTrails = this.toggleDangerousTrails.bind(this);
    this.handleTrailClick = this.handleTrailClick.bind(this);
    this.isTrailDangerous = this.isTrailDangerous.bind(this);
  }

  // Business logic that should be in a utility
  isTrailDangerous(trail: Trail): boolean {
    if (trail.difficulty === 'Hard') return true;
    if (trail.warnings.some(w => w.includes('Steep') || w.includes('Technical'))) return true;
    if (trail.conditions.icePatches) return true;
    if (trail.conditions.snowCovered && trail.elevation > 500) return true;
    return false;
  }

  // Event handler
  toggleDangerousTrails() {
    this.setState(prevState => ({
      showDangerousTrails: !prevState.showDangerousTrails,
    }));
  }

  // Event handler for trail click
  handleTrailClick(trailId: number) {
    this.context.setSelectedTrailId(trailId);
  }

  // Direct CSS classes instead of Tailwind
  getStatusClass(status: string): string {
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
  }

  render() {
    const { trails, selectedTrailId } = this.context;
    const { showDangerousTrails } = this.state;

    if (!trails || trails.length === 0) {
      return (
        <div className="min-w-[300px] flex-1 rounded-lg bg-white p-4 shadow-md">
          <h3 className="mb-3 border-b border-gray-200 pb-2 text-lg font-semibold">
            Available Trails
          </h3>
          <p className="py-4 text-center text-gray-500">No trails available</p>
        </div>
      );
    }

    return (
      <div className="min-w-[300px] flex-1 rounded-lg bg-white p-4 shadow-md">
        <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
          <h3 className="text-lg font-semibold">Available Trails</h3>
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4"
              checked={showDangerousTrails}
              onChange={this.toggleDangerousTrails}
            />
            Show Dangerous Trails
          </label>
        </div>

        <ul className="divide-y divide-gray-100">
          {trails.map(trail => {
            const isDangerous = this.isTrailDangerous(trail);

            // Skip dangerous trails if filter is not checked
            if (isDangerous && !showDangerousTrails) {
              return null;
            }

            // Inefficient CSS class construction
            let itemClasses = 'py-3 px-4 cursor-pointer flex justify-between items-center';
            if (selectedTrailId === trail.id) {
              itemClasses += ' bg-blue-50';
            } else {
              itemClasses += ' hover:bg-gray-50';
            }

            if (isDangerous) {
              itemClasses += ' border-l-4 border-red-500';
            }

            return (
              <li
                key={trail.id}
                className={itemClasses}
                onClick={() => this.handleTrailClick(trail.id)}
              >
                <span className="font-medium">{trail.name}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{trail.difficulty}</span>
                  <span className="text-sm text-gray-600">{trail.length} km</span>
                  <span className={`text-sm font-semibold ${this.getStatusClass(trail.status)}`}>
                    {trail.status.toUpperCase()}
                  </span>
                  {isDangerous && <span className="text-red-500">⚠️</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TrailList;
