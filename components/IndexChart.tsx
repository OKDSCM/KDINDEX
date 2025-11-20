import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMarket } from '../context/MarketContext';

const IndexChart: React.FC = () => {
  const { indexHistory } = useMarket();

  const latest = indexHistory[indexHistory.length - 1]?.value || 1000;
  const start = indexHistory[0]?.value || 1000;
  const isPositive = latest >= start;
  const color = isPositive ? '#00f090' : '#ff2a50';

  return (
    <div className="w-full h-[350px] glass-panel rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            KX-10 INDEX 
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPositive ? 'bg-kx-green' : 'bg-kx-red'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isPositive ? 'bg-kx-green' : 'bg-kx-red'}`}></span>
            </span>
          </h2>
          <div className="flex items-end gap-2">
            <span className={`text-4xl font-mono font-bold tracking-tighter drop-shadow-lg ${isPositive ? 'text-kx-green' : 'text-kx-red'}`}>
              {latest.toFixed(2)}
            </span>
            <span className={`text-sm mb-1.5 font-bold px-2 py-0.5 rounded bg-white/5 ${isPositive ? 'text-kx-green' : 'text-kx-red'}`}>
              {(((latest - start) / start) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex gap-1 bg-black/20 p-1 rounded-lg backdrop-blur-md">
            {['1H', '1D', '1W', '1M', '1Y'].map(tf => (
                <button key={tf} className={`text-xs px-3 py-1 rounded-md transition-all ${tf === '1H' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
                    {tf}
                </button>
            ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart data={indexHistory}>
          <defs>
            <linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="time" 
            hide={true} 
          />
          <YAxis 
            domain={['auto', 'auto']} 
            orientation="right" 
            tick={{fill: '#94a3b8', fontSize: 11}} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 23, 42, 0.8)', 
              backdropFilter: 'blur(8px)',
              borderColor: 'rgba(255,255,255,0.1)', 
              color: '#e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
            itemStyle={{ color: color }}
            labelStyle={{ display: 'none' }}
            formatter={(value: number) => [value.toFixed(2), 'KX-10']}
            cursor={{stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1}}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            fillOpacity={1} 
            fill="url(#colorIndex)" 
            strokeWidth={3}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IndexChart;