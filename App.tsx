import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MarketProvider } from './context/MarketContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CompanyPage from './pages/CompanyPage';
import Portfolio from './pages/Portfolio';
import BrandsPage from './pages/BrandsPage';
import BrandDetailPage from './pages/BrandDetailPage';

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <MarketProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen font-sans pb-20 md:pb-0">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/market/:id" element={<CompanyPage />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/brands/:id" element={<BrandDetailPage />} />
            </Routes>
          </main>
          <footer className="hidden md:block border-t border-white/10 bg-black/20 mt-auto backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-6 text-center text-xs text-gray-500">
                <p>&copy; 2025 Kirkku Exchange (KX). Operated by Kirkkonummen Dollari Authority.</p>
                <p className="mt-1">Currency backed by electricity, gold, grain, and water reserves.</p>
            </div>
          </footer>
        </div>
      </Router>
    </MarketProvider>
  );
};

export default App;