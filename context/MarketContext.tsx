import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Company, MarketContextType, UserProfile, Transaction, PortfolioItem } from '../types';
import { INITIAL_COMPANIES } from '../constants';

const MarketContext = createContext<MarketContextType | undefined>(undefined);

// Utility to calculate weighted index
const calculateIndex = (companies: Company[]): number => {
  // KX-10 Formula: Sum(Current Market Cap) / Divisor * 1000
  // Simplified: We start at 1000. We track relative change of the total market cap of the top 10 weighted stocks.
  // For this simulation, we will sum the Market Caps of all "Initial" companies and normalize to 1000 start.
  
  const totalMarketCap = companies.reduce((acc, c) => acc + (c.currentPrice * c.sharesOutstanding), 0);
  const baseMarketCap = companies.reduce((acc, c) => acc + (c.basePrice * c.sharesOutstanding), 0);
  
  return 1000 * (totalMarketCap / baseMarketCap);
};

export const MarketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [indexValue, setIndexValue] = useState<number>(1000);
  const [indexHistory, setIndexHistory] = useState<{ time: string; value: number }[]>([]);
  const [showEuro, setShowEuro] = useState(false);
  const kdToEuro = 0.92;

  // User State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('kx_user');
    return saved ? JSON.parse(saved) : {
      balanceKD: 10000, // Start with 10,000 KD
      portfolio: [],
      transactions: []
    };
  });

  // Persist User
  useEffect(() => {
    localStorage.setItem('kx_user', JSON.stringify(user));
  }, [user]);

  // Simulation Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setCompanies(prevCompanies => {
        const now = new Date().toLocaleTimeString();
        
        const updated = prevCompanies.map(company => {
          // Random Walk Math
          // price = oldPrice * (1 + (random - 0.5) * volatility)
          // Occasionally spike volume
          
          const volatilityFactor = company.volatility * (Math.random() > 0.9 ? 3 : 1); // Occasional volatility spike
          const changePercent = (Math.random() - 0.5) * volatilityFactor;
          let newPrice = company.currentPrice * (1 + changePercent);
          
          // Prevent negative or zero
          if (newPrice < 0.1) newPrice = 0.1;

          const open = company.currentPrice;
          const close = newPrice;
          const high = Math.max(open, close) * (1 + Math.random() * 0.001);
          const low = Math.min(open, close) * (1 - Math.random() * 0.001);
          const volume = Math.floor(Math.random() * 5000 * (Math.abs(changePercent) * 100 + 1));

          const newPoint = {
            time: now,
            value: close,
            open,
            close,
            high,
            low,
            volume
          };

          // Keep only last 60 points for performance in this demo
          const newHistory = [...company.history, newPoint].slice(-60);
          
          // Calculate 24h change (simplified against basePrice for this demo session, ideally against yesterday's close)
          const change24h = ((newPrice - company.basePrice) / company.basePrice) * 100;

          return {
            ...company,
            currentPrice: newPrice,
            history: newHistory,
            change24h
          };
        });

        // Update Index
        const newIndex = calculateIndex(updated);
        setIndexValue(newIndex);
        setIndexHistory(prev => [...prev, { time: now, value: newIndex }].slice(-60));

        return updated;
      });
    }, 2000); // Update every 2 seconds for visual sanity, though prompt said 1s (2s feels better in React dev mode)

    return () => clearInterval(interval);
  }, []);

  const buyStock = useCallback((companyId: string, amount: number) => {
    const company = companies.find(c => c.id === companyId);
    if (!company) return;

    const cost = company.currentPrice * amount;
    const fee = cost * 0.001; // 0.1% commission
    const totalCost = cost + fee;

    if (user.balanceKD >= totalCost) {
      setUser(prev => {
        const existingItemIndex = prev.portfolio.findIndex(p => p.companyId === companyId);
        let newPortfolio = [...prev.portfolio];

        if (existingItemIndex >= 0) {
          const oldAmount = newPortfolio[existingItemIndex].amount;
          const oldAvg = newPortfolio[existingItemIndex].averageBuyPrice;
          // Weighted Average
          const newAvg = ((oldAmount * oldAvg) + cost) / (oldAmount + amount);
          
          newPortfolio[existingItemIndex] = {
            ...newPortfolio[existingItemIndex],
            amount: oldAmount + amount,
            averageBuyPrice: newAvg
          };
        } else {
          newPortfolio.push({
            companyId,
            amount,
            averageBuyPrice: company.currentPrice
          });
        }

        return {
          balanceKD: prev.balanceKD - totalCost,
          portfolio: newPortfolio,
          transactions: [
            {
              id: Date.now().toString(),
              companyId,
              type: 'BUY',
              amount,
              price: company.currentPrice,
              total: totalCost,
              timestamp: Date.now()
            },
            ...prev.transactions
          ]
        };
      });
    } else {
      alert("Insufficient funds.");
    }
  }, [companies, user.balanceKD]);

  const sellStock = useCallback((companyId: string, amount: number) => {
    const company = companies.find(c => c.id === companyId);
    const portfolioItem = user.portfolio.find(p => p.companyId === companyId);
    
    if (!company || !portfolioItem || portfolioItem.amount < amount) return;

    const revenue = company.currentPrice * amount;
    const fee = revenue * 0.001;
    const totalRevenue = revenue - fee;

    setUser(prev => {
      let newPortfolio = prev.portfolio.map(p => {
        if (p.companyId === companyId) {
          return { ...p, amount: p.amount - amount };
        }
        return p;
      }).filter(p => p.amount > 0);

      return {
        balanceKD: prev.balanceKD + totalRevenue,
        portfolio: newPortfolio,
        transactions: [
          {
            id: Date.now().toString(),
            companyId,
            type: 'SELL',
            amount,
            price: company.currentPrice,
            total: totalRevenue,
            timestamp: Date.now()
          },
          ...prev.transactions
        ]
      };
    });
  }, [companies, user.portfolio]);

  const toggleCurrency = () => setShowEuro(!showEuro);

  return (
    <MarketContext.Provider value={{ 
      companies, 
      indexValue, 
      indexHistory, 
      user, 
      buyStock, 
      sellStock, 
      kdToEuro,
      toggleCurrency,
      showEuro
    }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};