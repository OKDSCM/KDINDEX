import React from 'react';
import IndexChart from '../components/IndexChart';
import MarketTable from '../components/MarketTable';
import { useMarket } from '../context/MarketContext';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { companies } = useMarket();

  const topGainers = [...companies].sort((a, b) => b.change24h - a.change24h).slice(0, 3);
  const topLosers = [...companies].sort((a, b) => a.change24h - b.change24h).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-enter">
            <IndexChart />
        </div>
        <div className="space-y-4 animate-enter delay-100">
            {/* Top Movers Card */}
            <div className="glass-panel rounded-2xl p-6 h-[350px] overflow-hidden flex flex-col">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Zap className="text-yellow-400 fill-current" size={18} /> Market Movers
                </h3>
                
                <div className="flex-1 flex flex-col gap-3">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Top Gainers</div>
                    {topGainers.map(c => (
                        <div key={c.id} className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                            <span className="font-mono font-bold text-sm text-gray-200">{c.ticker}</span>
                            <span className="text-kx-green font-mono text-sm flex items-center font-bold">
                                +{c.change24h.toFixed(2)}% <TrendingUp size={12} className="ml-1"/>
                            </span>
                        </div>
                    ))}
                    
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-2">Top Losers</div>
                    {topLosers.map(c => (
                        <div key={c.id} className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                            <span className="font-mono font-bold text-sm text-gray-200">{c.ticker}</span>
                            <span className="text-kx-red font-mono text-sm flex items-center font-bold">
                                {c.change24h.toFixed(2)}% <TrendingDown size={12} className="ml-1"/>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="animate-enter delay-200">
        <MarketTable />
      </div>
    </div>
  );
};

export default Dashboard;