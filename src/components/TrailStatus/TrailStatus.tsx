import React, { useContext } from 'react';
import { TrailContext } from '../../context/TrailContext';
import TrailList from '../TrailList/TrailList';
import TrailDetails from '../TrailDetails/TrailDetails';
import Loading from '../ui/Loading';

const TrailStatus: React.FC = () => {
  const { loading, error } = useContext(TrailContext);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-red-600">Error</h2>
        <p>Failed to load trail data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Trail Status Dashboard</h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <TrailList />
        <TrailDetails />
      </div>
    </div>
  );
};

export default TrailStatus;
