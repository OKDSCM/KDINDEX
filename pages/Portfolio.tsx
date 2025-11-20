import React from 'react';
import { useMarket } from '../context/MarketContext';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Portfolio: React.FC = () => {
  const { user, companies, showEuro, kdToEuro } = useMarket();

  const formatPrice = (val: number) => showEuro ? `€ ${(val * kdToEuro).toFixed(2)}` : `${val.toFixed(2)} KD`;

  // Calculate holdings details
  const holdings = user.portfolio.map(item => {
    const company = companies.find(c => c.id === item.companyId);
    if (!company) return null;
    
    const currentValue = item.amount * company.currentPrice;
    const costBasis = item.amount * item.averageBuyPrice;
    const pnl = currentValue - costBasis;
    const pnlPercent = (pnl / costBasis) * 100;

    return {
      ...item,
      ticker: company.ticker,
      name: company.name,
      currentPrice: company.currentPrice,
      currentValue,
      costBasis,
      pnl,
      pnlPercent,
      color: company.logoColor
    };
  }).filter(Boolean) as any[];

  const totalPortfolioValue = holdings.reduce((acc, h) => acc + h.currentValue, 0);
  const totalEquity = user.balanceKD + totalPortfolioValue;
  const totalCost = holdings.reduce((acc, h) => acc + h.costBasis, 0);
  const totalPnl = totalPortfolioValue - totalCost;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white tracking-tight animate-enter">My Portfolio</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden animate-enter delay-100">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Total Equity</div>
          <div className="text-3xl font-mono font-bold text-white drop-shadow-md">{formatPrice(totalEquity)}</div>
          <div className="text-xs text-gray-500 mt-2">Cash + Holdings</div>
        </div>
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden animate-enter delay-200">
           <div className="absolute -right-6 -top-6 w-24 h-24 bg-kx-accent/10 rounded-full blur-xl"></div>
          <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Available Cash</div>
          <div className="text-3xl font-mono font-bold text-kx-accent drop-shadow-md">{formatPrice(user.balanceKD)}</div>
          <div className="text-xs text-gray-500 mt-2">Buying Power</div>
        </div>
        <div className="glass-panel rounded-2xl p-6 relative overflow-hidden animate-enter delay-300">
           <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-xl ${totalPnl >= 0 ? 'bg-kx-green/10' : 'bg-kx-red/10'}`}></div>
          <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Unrealized P&L</div>
          <div className={`text-3xl font-mono font-bold ${totalPnl >= 0 ? 'text-kx-green' : 'text-kx-red'} drop-shadow-md`}>
            {totalPnl >= 0 ? '+' : ''}{formatPrice(totalPnl)}
          </div>
          <div className={`text-xs font-bold mt-2 inline-block px-2 py-0.5 rounded ${totalPnl >= 0 ? 'bg-kx-green/10 text-kx-green' : 'bg-kx-red/10 text-kx-red'}`}>
            {totalCost > 0 ? ((totalPnl / totalCost) * 100).toFixed(2) : '0.00'}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings Table */}
        <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden animate-enter delay-400">
          <div className="p-5 border-b border-white/5">
            <h3 className="font-bold text-lg text-white">Holdings</h3>
          </div>
          <div className="overflow-x-auto">
            {holdings.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                    <p className="mb-4">Your portfolio is empty.</p>
                    <Link to="/" className="px-6 py-2 bg-kx-accent text-white rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-kx-accent/20">Start Trading</Link>
                </div>
            ) : (
                <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-gray-400 font-medium uppercase text-xs backdrop-blur-sm">
                    <tr>
                    <th className="px-4 py-3">Ticker</th>
                    <th className="px-4 py-3 text-right">Qty</th>
                    <th className="px-4 py-3 text-right">Avg Price</th>
                    <th className="px-4 py-3 text-right">Cur Price</th>
                    <th className="px-4 py-3 text-right">Value</th>
                    <th className="px-4 py-3 text-right">P&L</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {holdings.map((h) => (
                    <tr key={h.companyId} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-bold">
                        <Link to={`/market/${h.companyId}`} className="text-kx-accent hover:text-white transition-colors">{h.ticker}</Link>
                        </td>
                        <td className="px-4 py-3 text-right font-mono">{h.amount}</td>
                        <td className="px-4 py-3 text-right font-mono text-gray-400">{formatPrice(h.averageBuyPrice)}</td>
                        <td className="px-4 py-3 text-right font-mono text-white">{formatPrice(h.currentPrice)}</td>
                        <td className="px-4 py-3 text-right font-mono text-white">{formatPrice(h.currentValue)}</td>
                        <td className={`px-4 py-3 text-right font-mono ${h.pnl >= 0 ? 'text-kx-green' : 'text-kx-red'}`}>
                        {h.pnlPercent.toFixed(2)}%
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col animate-enter delay-500">
           <h3 className="font-bold mb-4 text-white">Allocation</h3>
           <div className="flex-1 min-h-[250px]">
            {holdings.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={holdings}
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="currentValue"
                     stroke="none"
                   >
                     {holdings.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip 
                     formatter={(val: number) => formatPrice(val)}
                     contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                        backdropFilter: 'blur(8px)',
                        borderColor: 'rgba(255,255,255,0.1)', 
                        color: '#e2e8f0',
                        borderRadius: '12px'
                     }}
                     itemStyle={{ color: '#fff' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-gray-600 text-sm">No Data</div>
            )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;