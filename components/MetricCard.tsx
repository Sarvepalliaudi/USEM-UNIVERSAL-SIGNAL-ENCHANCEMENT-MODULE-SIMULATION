import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  children: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, children }) => {
  return (
    <div className="bg-base-light/50 p-4 rounded-lg border border-primary/20 backdrop-blur-sm flex items-center space-x-4 transition-all duration-300 hover:border-primary/50 hover:shadow-glow-primary">
      <div className="text-primary">
        {children}
      </div>
      <div>
        <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
        <div className="text-2xl font-bold">
          {value} <span className="text-lg font-normal text-gray-400">{unit}</span>
        </div>
      </div>
    </div>
  );
};
