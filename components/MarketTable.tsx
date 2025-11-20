import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarket } from '../context/MarketContext';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';

const MarketTable: React.FC = () => {
  const { companies, showEuro, kdToEuro } = useMarket();
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    return companies.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) || c.ticker.toLowerCase().includes(filter.toLowerCase()));
  }, [companies, filter]);

  const formatPrice = (price: number) => showEuro ? `€ ${(price * kdToEuro).toFixed(2)}` : `${price.toFixed(2)}`;

  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h3 className="font-bold text-lg text-white self-start sm:self-center">Market Overview</h3>
        <div className="relative w-full sm:w-auto">
          <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search Ticker..." 
            className="w-full sm:w-64 bg-black/20 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-kx-accent focus:bg-black/40 transition-all"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/5 text-gray-400 font-medium uppercase text-xs backdrop-blur-sm">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Ticker</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">24h %</th>
              <th className="px-4 py-3 text-right hidden md:table-cell">Vol</th>
              <th className="px-4 py-3 text-right hidden lg:table-cell">Market Cap</th>
              <th className="px-4 py-3 text-center rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((company) => {
                const isPos = company.change24h >= 0;
                const mcap = company.currentPrice * company.sharesOutstanding;
                
                return (
                  <tr key={company.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4 font-mono font-bold text-kx-accent whitespace-nowrap">
                      <Link to={`/market/${company.id}`}>{company.ticker}</Link>
                    </td>
                    <td className="px-4 py-4 min-w-[150px]">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_8px]" style={{backgroundColor: company.logoColor, boxShadow: `0 0 8px ${company.logoColor}`}}></div>
                            <span className="truncate font-medium text-gray-200">{company.name}</span>
                        </div>
                    </td>
                    <td className="px-4 py-4 text-right font-mono text-white whitespace-nowrap">
                      {formatPrice(company.currentPrice)}
                    </td>
                    <td className={`px-4 py-4 text-right font-mono ${isPos ? 'text-kx-green' : 'text-kx-red'} whitespace-nowrap`}>
                      <div className="flex items-center justify-end gap-1">
                        {isPos ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {company.change24h.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-gray-400 hidden md:table-cell">
                      {(Math.random() * 10000).toFixed(0)}
                    </td>
                    <td className="px-4 py-4 text-right text-gray-400 hidden lg:table-cell">
                      {(mcap / 1000000).toFixed(1)}M
                    </td>
                    <td className="px-4 py-4 text-center">
                        <Link to={`/market/${company.id}`} className="px-4 py-1.5 bg-white/5 hover:bg-kx-accent border border-white/10 hover:border-kx-accent text-white rounded-lg text-xs transition-all whitespace-nowrap font-medium">
                            Trade
                        </Link>
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTable;