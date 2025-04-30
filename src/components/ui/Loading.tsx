import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-8 text-center shadow-md">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-4 text-gray-600">Loading trail data...</p>
    </div>
  );
};

export default Loading;
