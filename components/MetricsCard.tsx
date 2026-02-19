
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis } from 'recharts';

interface MetricsCardProps {
  title: string;
  value: number | string;
  unit: string;
  history: { time: string; val: number }[];
  color: string;
  icon: React.ReactNode;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, unit, history, color, icon }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-zinc-800">
          {icon}
        </div>
        <div className="text-right">
          <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-white">
            {value}<span className="text-sm font-normal text-zinc-500 ml-1">{unit}</span>
          </h3>
        </div>
      </div>
      
      <div className="h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="val" 
              stroke={color} 
              fillOpacity={1} 
              fill={`url(#gradient-${title})`} 
              strokeWidth={2}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsCard;
