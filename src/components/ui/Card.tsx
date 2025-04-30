import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`rounded-lg bg-white p-4 shadow-md ${className}`}>
      {title && (
        <h3 className="mb-3 border-b border-gray-200 pb-2 text-lg font-semibold">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;
