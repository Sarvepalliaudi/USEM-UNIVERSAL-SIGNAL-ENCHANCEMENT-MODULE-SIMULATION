import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import type { SignalDataPoint } from '../types';

interface SignalChartProps {
  data: SignalDataPoint[];
}

export const SignalChart: React.FC<SignalChartProps> = ({ data }) => {
  return (
    <div className="h-64 md:h-80 w-full bg-base-light/50 p-4 rounded-lg border border-primary/20 backdrop-blur-sm">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ffff" stopOpacity={0.7}/>
              <stop offset="95%" stopColor="#00ffff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis 
            dataKey="time" 
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()}
            stroke="#9ca3af"
            fontSize={12}
            tick={{ fill: '#d1d5db' }}
          />
          <YAxis 
            domain={[-100, -20]} 
            stroke="#9ca3af" 
            fontSize={12}
            tick={{ fill: '#d1d5db' }}
            label={{ value: 'dBm', angle: -90, position: 'insideLeft', fill: '#d1d5db', dx: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(10, 10, 15, 0.8)',
              borderColor: '#00ffff80',
              color: '#d1d5db'
            }}
            labelFormatter={(unixTime) => new Date(unixTime).toLocaleString()}
            formatter={(value: number) => [`${value.toFixed(2)} dBm`, "Strength"]}
          />
          <Area type="monotone" dataKey="strength" stroke="#00ffff" strokeWidth={2} fillOpacity={1} fill="url(#colorSignal)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
