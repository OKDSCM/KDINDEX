export enum Sector {
  MEDIA = 'Media & Brands',
  INFRA = 'Infrastructure & Control',
  SECURITY = 'Security & Defense',
  LOGISTICS = 'Logistics & Transport',
  INDUSTRY = 'Industry & Materials',
  TECH = 'Technology & IT',
  REAL_ESTATE = 'Real Estate',
  AGRICULTURE = 'Agriculture & Food',
  ENERGY = 'Energy',
  MINING = 'Mining',
  FINANCE = 'Finance'
}

export enum Volatility {
  LOW = 0.002,
  MEDIUM = 0.008,
  HIGH = 0.025
}

export interface PricePoint {
  time: string;
  value: number;
  // Basic candle simulation
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Company {
  id: string;
  name: string;
  ticker: string;
  sector: Sector;
  description: string;
  volatility: Volatility;
  basePrice: number;
  currentPrice: number;
  sharesOutstanding: number; // For Market Cap calculation
  ownership: 'State' | 'Private' | 'Mixed';
  history: PricePoint[];
  logoColor: string;
  change24h: number; // Percentage
  dividendYield: number;
  peRatio: number;
}

export interface Brand {
  id: string;
  name: string;
  category: string;
  description: string;
  parent?: string; // 'KNV' | 'KNT' or undefined
}

export interface PortfolioItem {
  companyId: string;
  amount: number;
  averageBuyPrice: number;
}

export interface Transaction {
  id: string;
  companyId: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  total: number;
  timestamp: number;
}

export interface UserProfile {
  balanceKD: number;
  portfolio: PortfolioItem[];
  transactions: Transaction[];
}

export interface MarketContextType {
  companies: Company[];
  indexValue: number;
  indexHistory: { time: string; value: number }[];
  user: UserProfile;
  buyStock: (companyId: string, amount: number) => void;
  sellStock: (companyId: string, amount: number) => void;
  kdToEuro: number;
  toggleCurrency: () => void;
  showEuro: boolean;
}