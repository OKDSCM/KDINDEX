import React, { useState } from 'react';
import { Company } from '../types';
import { useMarket } from '../context/MarketContext';
import { Wallet, ArrowRightLeft } from 'lucide-react';

interface Props {
  company: Company;
}

const TradePanel: React.FC<Props> = ({ company }) => {
  const { user, buyStock, sellStock, showEuro, kdToEuro } = useMarket();
  const [amount, setAmount] = useState<string>('1');
  const [mode, setMode] = useState<'BUY' | 'SELL'>('BUY');

  const price = company.currentPrice;
  const displayPrice = showEuro ? price * kdToEuro : price;
  const numAmount = parseInt(amount) || 0;
  const totalCost = numAmount * price;
  const totalDisplayCost = showEuro ? totalCost * kdToEuro : totalCost;
  const fee = totalCost * 0.001; // 0.1%

  const ownedAmount = user.portfolio.find(p => p.companyId === company.id)?.amount || 0;

  const handleTrade = () => {
    if (numAmount <= 0) return;
    if (mode === 'BUY') {
      buyStock(company.id, numAmount);
    } else {
      sellStock(company.id, numAmount);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
      {/* Ambient background */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${mode === 'BUY' ? 'from-kx-green/50' : 'from-kx-red/50'} to-transparent`}></div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Trade {company.ticker}</h3>
        <div className="flex bg-black/20 rounded-lg p-1 backdrop-blur-sm border border-white/5">
          <button 
            className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${mode === 'BUY' ? 'bg-kx-green text-black shadow-lg shadow-kx-green/20' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setMode('BUY')}
          >
            Buy
          </button>
          <button 
            className={`px-4 py-1.5 text-sm rounded-md font-medium transition-all ${mode === 'SELL' ? 'bg-kx-red text-white shadow-lg shadow-kx-red/20' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setMode('SELL')}
          >
            Sell
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="text-xs text-gray-400">Balance</div>
          <div className="flex items-center gap-2 text-white font-mono font-bold">
            <Wallet size={14} className="text-kx-accent" />
            {showEuro ? `€ ${(user.balanceKD * kdToEuro).toFixed(2)}` : `${user.balanceKD.toFixed(2)} KD`}
          </div>
        </div>

        <div className="flex justify-between items-center px-1">
           <label className="text-xs text-gray-500 uppercase font-bold">Owned Shares</label>
           <div className="font-mono text-white font-medium bg-white/5 px-2 py-0.5 rounded text-sm">{ownedAmount}</div>
        </div>

        <div className="bg-black/20 p-5 rounded-xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Market Price</span>
            <span className="font-mono text-white">{displayPrice.toFixed(2)} {showEuro ? '€' : 'KD'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Quantity</span>
            <input 
              type="number" 
              min="1"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="w-28 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-right font-mono text-white focus:outline-none focus:border-kx-accent focus:bg-black/40 transition-all"
            />
          </div>
          <div className="border-t border-white/10 my-2"></div>
          <div className="flex justify-between mb-1 text-xs text-gray-500">
            <span>Est. Fee (0.1%)</span>
            <span>{fee.toFixed(2)} KD</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-white items-center pt-1">
            <span>Total</span>
            <span className={`${mode === 'BUY' ? 'text-kx-green' : 'text-kx-red'}`}>{totalDisplayCost.toFixed(2)} {showEuro ? '€' : 'KD'}</span>
          </div>
        </div>

        <button 
          onClick={handleTrade}
          disabled={numAmount <= 0 || (mode === 'BUY' && user.balanceKD < totalCost + fee) || (mode === 'SELL' && ownedAmount < numAmount)}
          className={`w-full py-3.5 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg ${
            mode === 'BUY' ? 'bg-gradient-to-r from-kx-green to-emerald-600 hover:to-emerald-500 shadow-kx-green/20' : 'bg-gradient-to-r from-kx-red to-rose-600 hover:to-rose-500 shadow-kx-red/20'
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          <ArrowRightLeft size={18} />
          {mode === 'BUY' ? 'CONFIRM PURCHASE' : 'CONFIRM SALE'}
        </button>
      </div>
    </div>
  );
};

export default TradePanel;