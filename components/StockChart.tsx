import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Company } from '../types';
import { useMarket } from '../context/MarketContext';

interface Props {
  company: Company;
}

const StockChart: React.FC<Props> = ({ company }) => {
  const { showEuro, kdToEuro } = useMarket();
  
  const history = company.history;
  const isPositive = company.change24h >= 0;
  const color = isPositive ? '#00f090' : '#ff2a50';

  const formatPrice = (val: number) => showEuro ? `€ ${(val * kdToEuro).toFixed(2)}` : `${val.toFixed(2)} KD`;

  return (
    <div className="w-full h-[400px] glass-panel rounded-2xl p-6 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Price Action (1H)</p>
            <div className="flex gap-1">
                 {/* Fake time toggles */}
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="w-2 h-2 rounded-full bg-kx-accent"></div>
            </div>
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={history}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="time" hide />
          <YAxis 
            yAxisId="right"
            orientation="right" 
            domain={['auto', 'auto']} 
            tick={{fill: '#94a3b8', fontSize: 11}} 
            axisLine={false}
            tickFormatter={(val) => val.toFixed(1)}
          />
          <YAxis 
            yAxisId="left" // Volume axis
            orientation="left"
            hide
          />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                backdropFilter: 'blur(8px)',
                borderColor: 'rgba(255,255,255,0.1)', 
                color: '#e2e8f0',
                borderRadius: '12px'
            }}
            formatter={(value: number, name: string) => {
                if (name === 'volume') return [value.toFixed(0), 'Vol'];
                return [formatPrice(value), 'Price'];
            }}
            labelStyle={{ color: '#9ca3af' }}
            cursor={{stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1}}
          />
          <Bar yAxisId="left" dataKey="volume" fill="rgba(255,255,255,0.05)" barSize={4} />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={3} 
            dot={false}
            activeDot={{r: 6, strokeWidth: 0, fill: 'white'}}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;