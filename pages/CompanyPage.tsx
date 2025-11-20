import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarket } from '../context/MarketContext';
import StockChart from '../components/StockChart';
import TradePanel from '../components/TradePanel';
import { ArrowLeft, Info, Shield, Layers } from 'lucide-react';

const CompanyPage: React.FC = () => {
  const { id } = useParams();
  const { companies, showEuro, kdToEuro } = useMarket();
  const company = companies.find(c => c.id === id);

  if (!company) return <div className="p-8 text-center text-gray-400">Company not found. <Link to="/" className="text-kx-accent underline">Go Home</Link></div>;

  const formatPrice = (val: number) => showEuro ? `€ ${(val * kdToEuro).toFixed(2)}` : `${val.toFixed(2)} KD`;
  const marketCap = company.currentPrice * company.sharesOutstanding;

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-2 text-sm font-medium animate-enter">
        <ArrowLeft size={16} className="mr-1" /> Back to Market
      </Link>

      <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-enter delay-100">
        <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-black/20" style={{backgroundColor: company.logoColor}}>
                {company.ticker.substring(0,1)}
            </div>
            <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">{company.name}</h1>
                <div className="flex gap-2 mt-2">
                    <span className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-gray-300 font-medium border border-white/5">{company.sector}</span>
                    <span className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-gray-300 font-medium border border-white/5 flex items-center gap-1">
                        <Shield size={10} /> {company.ownership}
                    </span>
                    <span className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-gray-300 font-medium border border-white/5">Vol: {company.volatility}</span>
                </div>
            </div>
        </div>
        <div className="text-right">
            <div className="text-5xl font-mono font-bold text-white tracking-tight">{formatPrice(company.currentPrice)}</div>
            <div className={`text-lg font-mono font-bold ${company.change24h >= 0 ? 'text-kx-green' : 'text-kx-red'}`}>
                {company.change24h > 0 ? '+' : ''}{company.change24h.toFixed(2)}% <span className="text-gray-500 text-sm font-normal ml-1">(24h)</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <div className="animate-enter delay-200">
                <StockChart company={company} />
            </div>
            
            <div className="glass-panel rounded-2xl p-6 animate-enter delay-300">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                    <Info size={18} /> Company Profile
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8 text-base">
                    {company.description}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Market Cap</div>
                        <div className="font-mono font-bold text-white text-lg">{(marketCap / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">P/E Ratio</div>
                        <div className="font-mono font-bold text-white text-lg">{company.peRatio}</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Dividend</div>
                        <div className="font-mono font-bold text-white text-lg">{company.dividendYield}%</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Shares</div>
                        <div className="font-mono font-bold text-white text-lg">{(company.sharesOutstanding / 1000000).toFixed(1)}M</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="space-y-6">
            <div className="animate-enter delay-200">
                <TradePanel company={company} />
            </div>
            
            {/* Fake Order Book */}
            <div className="glass-panel rounded-2xl p-5 animate-enter delay-300">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                    <Layers size={14} /> Order Book
                </h3>
                <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-gray-500 px-3 pb-1">
                        <span>Size</span>
                        <span>Price</span>
                    </div>
                    {/* Asks */}
                    {[...Array(5)].map((_, i) => (
                        <div key={`ask-${i}`} className="flex justify-between px-3 py-1 hover:bg-white/5 rounded transition-colors">
                            <span className="text-kx-red">{(Math.random() * 500 + 10).toFixed(0)}</span>
                            <span className="text-kx-red">{(company.currentPrice * (1 + (5-i)*0.001)).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="border-y border-white/10 py-2 text-center font-bold text-white my-2 bg-white/5 rounded">
                        {company.currentPrice.toFixed(2)}
                    </div>
                    {/* Bids */}
                    {[...Array(5)].map((_, i) => (
                        <div key={`bid-${i}`} className="flex justify-between px-3 py-1 hover:bg-white/5 rounded transition-colors">
                            <span className="text-kx-green">{(Math.random() * 500 + 10).toFixed(0)}</span>
                            <span className="text-kx-green">{(company.currentPrice * (1 - (i+1)*0.001)).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;