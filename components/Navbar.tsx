import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Briefcase, Globe, ShoppingBag } from 'lucide-react';
import { useMarket } from '../context/MarketContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, showEuro, toggleCurrency, kdToEuro, indexValue } = useMarket();

  const isActive = (path: string) => location.pathname === path 
    ? "text-kx-accent bg-white/10 shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
    : "text-gray-400 hover:text-white hover:bg-white/5";

  const NavLink: React.FC<{ to: string; icon: any; label: string; mobile?: boolean }> = ({ to, icon: Icon, label, mobile }) => (
    <Link 
      to={to} 
      className={`
        ${mobile ? 'flex-col text-xs py-1' : 'flex-row px-3 py-2 text-sm gap-2'}
        rounded-xl font-medium transition-all duration-300 flex items-center justify-center
        ${isActive(to)}
      `}
    >
      <Icon size={mobile ? 20 : 16} className={mobile ? 'mb-1' : ''} />
      <span>{label}</span>
    </Link>
  );

  return (
    <>
      {/* Desktop Top Navigation */}
      <nav className="sticky top-0 z-50 glass-panel border-b-0 border-b-white/10 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 mr-10 group">
                <div className="w-8 h-8 bg-gradient-to-tr from-kx-accent to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-kx-accent/20 group-hover:shadow-kx-accent/40 transition-all">
                  <span className="font-bold text-white">KX</span>
                </div>
                <span className="text-xl font-bold text-white tracking-tight hidden sm:block">KIRKKU<span className="text-kx-accent">EXCHANGE</span></span>
              </Link>
              
              {/* Desktop Links - Horizontal Alignment */}
              <div className="hidden md:flex items-center space-x-2">
                <NavLink to="/" icon={BarChart2} label="Markets" />
                <NavLink to="/portfolio" icon={Briefcase} label="Portfolio" />
                <NavLink to="/brands" icon={ShoppingBag} label="Brands" />
                
                <div className="h-4 w-px bg-white/10 mx-2"></div>
                
                <div className="flex flex-col px-2">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">KX-10 Index</span>
                  <span className="font-mono font-bold text-kx-green leading-none">{indexValue.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Right Side Info */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider hidden sm:block">Balance</span>
                <span className="text-sm font-bold text-white font-mono bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                  {showEuro ? `€ ${(user.balanceKD * kdToEuro).toFixed(2)}` : `${user.balanceKD.toFixed(2)} KD`}
                </span>
              </div>
              <button 
                onClick={toggleCurrency}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-all flex items-center gap-1 text-xs backdrop-blur-sm"
              >
                <Globe size={14} />
                {showEuro ? 'EUR' : 'KD'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          <NavLink to="/" icon={BarChart2} label="Markets" mobile />
          <NavLink to="/portfolio" icon={Briefcase} label="Portfolio" mobile />
          <NavLink to="/brands" icon={ShoppingBag} label="Brands" mobile />
        </div>
      </nav>
    </>
  );
};

export default Navbar;