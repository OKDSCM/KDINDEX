import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BRANDS } from '../constants';
import { ArrowLeft, Shield, TrendingUp, ShoppingBag, Layers } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BrandDetailPage: React.FC = () => {
  const { id } = useParams();
  const brand = BRANDS.find(b => b.id === id);

  // Generate fake history for the chart since these aren't real traded stocks in our context
  const chartData = useMemo(() => {
    if (!brand) return [];
    const data = [];
    let value = 100; // Base index
    for (let i = 0; i < 30; i++) {
      const change = (Math.random() - 0.45) * 5; // Slight upward trend
      value += change;
      data.push({
        day: `Day ${i + 1}`,
        value: Math.max(50, value),
        sales: Math.floor(Math.random() * 5000) + 1000
      });
    }
    return data;
  }, [brand]);

  if (!brand) {
    return (
      <div className="p-12 text-center animate-enter">
        <h2 className="text-xl text-white mb-4">Brand not found</h2>
        <Link to="/brands" className="text-kx-accent hover:underline">Back to Brands Directory</Link>
      </div>
    );
  }

  const isKnv = brand.parent === 'KNV';
  const isKnt = brand.parent === 'KNT';
  const parentColor = isKnv ? 'from-blue-600 to-blue-800' : isKnt ? 'from-slate-700 to-slate-900' : 'from-kx-accent to-cyan-500';
  
  return (
    <div className="space-y-6">
      <Link to="/brands" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium animate-enter">
        <ArrowLeft size={16} className="mr-1" /> Back to Brands
      </Link>

      {/* Header Card */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden animate-enter delay-100">
        <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${parentColor} rounded-full blur-[50px] opacity-30`}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg bg-gradient-to-br ${parentColor}`}>
            {brand.name.substring(0, 1)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{brand.name}</h1>
              {brand.parent && (
                <span className={`px-2 py-0.5 rounded text-xs font-bold border border-white/10 ${isKnv ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-500/20 text-slate-300'}`}>
                  {brand.parent} Subsidiary
                </span>
              )}
            </div>
            <p className="text-gray-300 text-lg">{brand.description}</p>
            <div className="flex gap-3 mt-3 text-sm font-medium text-gray-400">
              <span className="flex items-center gap-1"><ShoppingBag size={14}/> {brand.category}</span>
              <span className="flex items-center gap-1"><Shield size={14}/> Kirkkonummi Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Simulated Performance */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 animate-enter delay-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-kx-green"/> 
              Performance Index (30D)
            </h3>
            <span className="text-xs text-gray-500">Simulated Brand Value</span>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    backdropFilter: 'blur(8px)',
                    borderColor: 'rgba(255,255,255,0.1)', 
                    color: '#e2e8f0',
                    borderRadius: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorVal)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
             <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 uppercase">Est. Daily Vol</div>
                <div className="text-white font-mono font-bold text-lg">4.2K</div>
             </div>
             <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 uppercase">Market Reach</div>
                <div className="text-white font-mono font-bold text-lg">High</div>
             </div>
             <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 uppercase">Sentiment</div>
                <div className="text-kx-green font-mono font-bold text-lg">Bullish</div>
             </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 animate-enter delay-300">
             <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                <Layers size={14} /> Supply Chain Info
             </h3>
             <ul className="space-y-4 text-sm">
                <li className="flex justify-between">
                   <span className="text-gray-400">Origin</span>
                   <span className="text-white">Kirkkonummi, FI</span>
                </li>
                <li className="flex justify-between">
                   <span className="text-gray-400">Production Status</span>
                   <span className="text-kx-green">Active / Stable</span>
                </li>
                <li className="flex justify-between">
                   <span className="text-gray-400">Distributor</span>
                   <span className="text-white">{brand.parent || 'Independent'}</span>
                </li>
                <li className="flex justify-between">
                   <span className="text-gray-400">Export License</span>
                   <span className="text-white">Class A (Domestic)</span>
                </li>
             </ul>
          </div>
          
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm animate-enter delay-400">
             <strong>Investment Note:</strong> This is a product brand or subsidiary. To invest in its success, buy shares of its parent company or the sector index.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetailPage;