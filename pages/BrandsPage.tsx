import React from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../constants';
import { useMarket } from '../context/MarketContext';
import { Shield, Cpu, ShoppingBag, Home, Coffee, Droplet, Hammer, Briefcase, Building2, ArrowUpRight } from 'lucide-react';

// Reusable interactive card component
const BrandCard: React.FC<{ brand: any, icon: any, to: string, delay?: number }> = ({ brand, icon: Icon, to, delay = 0 }) => (
  <Link to={to} className="block h-full animate-enter" style={{ animationDelay: `${delay}ms` }}>
    <div className="glass-panel glass-panel-hover rounded-xl p-5 transition-all duration-300 group relative overflow-hidden h-full border-l-4 border-l-transparent hover:border-l-kx-accent">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-start justify-between mb-3 relative z-10">
        <h4 className="font-bold text-white text-lg tracking-tight group-hover:text-kx-accent transition-colors">{brand.name}</h4>
        <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
          <Icon size={18} />
        </div>
      </div>
      <div className="text-xs text-gray-500 uppercase font-bold mb-2 tracking-wider">{brand.category || brand.ticker}</div>
      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-2">{brand.description}</p>
      
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
         <ArrowUpRight size={14} className="text-kx-accent" />
      </div>
    </div>
  </Link>
);

const BrandsPage: React.FC = () => {
  const { companies } = useMarket();

  // Major stocks to highlight
  const majorCorps = companies.filter(c => ['1', '2', '3', '4', '5', '6', '7'].includes(c.id));

  // Group brands
  const knvBrands = BRANDS.filter(b => b.parent === 'KNV');
  const kntBrands = BRANDS.filter(b => b.parent === 'KNT');
  const consumerBrands = BRANDS.filter(b => !b.parent);

  // Categories for consumer brands
  const foodBrands = consumerBrands.filter(b => b.category === 'Food & Drink');
  const apparelBrands = consumerBrands.filter(b => b.category === 'Apparel');
  const homeBrands = consumerBrands.filter(b => b.category === 'Home');

  // Find parent company IDs for linking headers
  const knvId = companies.find(c => c.ticker === 'KNV')?.id;
  const kntId = companies.find(c => c.ticker === 'KNT')?.id;

  return (
    <div className="space-y-16 pb-8">
      <div className="text-center py-10 relative animate-enter">
         {/* Hero Decor */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-kx-accent/10 blur-[100px] rounded-full pointer-events-none"></div>
         
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight relative z-10">Kirkkonummi Brands</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg relative z-10">
          Discover the diverse ecosystem of state-owned enterprises, local contractors, and consumer favorites powering the Kirkkonummi economy.
        </p>
      </div>

      {/* Major Corporations Section */}
      <section className="animate-enter delay-100">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-kx-accent to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
                <Building2 size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white">Major Corporations</h2>
                <p className="text-sm text-gray-400">The publicly traded giants of the KX-10 index.</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {majorCorps.map((company, i) => (
                <BrandCard 
                    key={company.id} 
                    brand={{...company, category: company.sector}} 
                    icon={Building2}
                    to={`/market/${company.id}`}
                    delay={i * 50}
                />
            ))}
        </div>
      </section>

      {/* KNV Ecosystem */}
      <section className="animate-enter delay-200">
        <Link to={knvId ? `/market/${knvId}` : '#'} className="group flex items-center gap-4 mb-8 pb-4 border-b border-white/10 cursor-pointer hover:bg-white/5 rounded-xl p-2 transition-colors">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">KNV</div>
          <div>
             <h2 className="text-2xl font-bold text-white flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                KNV Ecosystem <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
             </h2>
             <p className="text-sm text-gray-400">Infrastructure, surveillance, and industrial control systems.</p>
          </div>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {knvBrands.map((brand, i) => (
            <BrandCard 
                key={brand.id} 
                brand={brand} 
                icon={brand.category.includes('Chemicals') ? Droplet : Cpu} 
                to={`/brands/${brand.id}`}
                delay={i * 50}
            />
          ))}
        </div>
      </section>

      {/* KNT Ecosystem */}
      <section className="animate-enter delay-300">
        <Link to={kntId ? `/market/${kntId}` : '#'} className="group flex items-center gap-4 mb-8 pb-4 border-b border-white/10 cursor-pointer hover:bg-white/5 rounded-xl p-2 transition-colors">
          <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-slate-500/20 group-hover:scale-105 transition-transform">KNT</div>
          <div>
             <h2 className="text-2xl font-bold text-white flex items-center gap-2 group-hover:text-slate-400 transition-colors">
                KNT Defense Network <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
             </h2>
             <p className="text-sm text-gray-400">Security, defense contracting, and tactical engineering.</p>
          </div>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kntBrands.map((brand, i) => (
            <BrandCard 
                key={brand.id} 
                brand={brand} 
                icon={Shield} 
                to={`/brands/${brand.id}`}
                delay={i * 50}
            />
          ))}
        </div>
      </section>

      {/* Consumer Sectors */}
      <section className="animate-enter delay-400">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20">
            <Coffee size={24} />
          </div>
          <div>
             <h2 className="text-2xl font-bold text-white">Food & Provisions</h2>
             <p className="text-sm text-gray-400">Local agriculture, processing, and beverages.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {foodBrands.map((brand, i) => (
            <BrandCard 
                key={brand.id} 
                brand={brand} 
                icon={Coffee} 
                to={`/brands/${brand.id}`}
                delay={i * 50}
            />
          ))}
        </div>
      </section>

      <section className="animate-enter delay-500">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-700 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
             <ShoppingBag size={24} />
          </div>
          <div>
             <h2 className="text-2xl font-bold text-white">Apparel & Gear</h2>
             <p className="text-sm text-gray-400">From rugged workwear to premium civilian outfits.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {apparelBrands.map((brand, i) => (
            <BrandCard 
                key={brand.id} 
                brand={brand} 
                icon={Briefcase} 
                to={`/brands/${brand.id}`}
                delay={i * 50}
            />
          ))}
        </div>
      </section>

      <section className="animate-enter delay-500">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
             <Home size={24} />
          </div>
          <div>
             <h2 className="text-2xl font-bold text-white">Home & Utility</h2>
             <p className="text-sm text-gray-400">Tools, furnishing, and household essentials.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {homeBrands.map((brand, i) => (
            <BrandCard 
                key={brand.id} 
                brand={brand} 
                icon={Hammer} 
                to={`/brands/${brand.id}`}
                delay={i * 50}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default BrandsPage;