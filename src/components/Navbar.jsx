import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car } from 'lucide-react';
import logo from "../assets/logo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Weekly Specials', href: '/weekly-specials' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Special Offers', href: '/special-offers' },
    { name: 'Financing', href: '/financing' },
    { name: 'Service & Parts', href: '/service-parts' },
    { name: 'Dealer Directory', href: '/dealer-directory' },
    { name: 'Auto Businesses', href: '/auto-businesses' },
    { name: 'Community', href: '/community' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-gradient-to-r font-ralewayM  from-slate-900 via-blue-900 to-red-900 text-white sticky top-0 z-50 shadow border-b border-blue-800/30">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                {/* <Car className="h-12 w-12 text-red-500 group-hover:text-red-400 transition-all duration-300 transform group-hover:scale-110" /> */}
                <img src={logo} className='h-16 w-16'></img>
                <div className="absolute -inset-1 bg-red-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 text-center text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/10 hover:text-red-400 relative group ${location.pathname === item.href
                  ? 'text-red-400 bg-white/10'
                  : 'text-white'
                  }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-400 focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-slate-800/95 backdrop-blur-sm border-t border-blue-800/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 text-base font-medium transition-all duration-300 hover:text-red-400 hover:bg-white/10 rounded-lg ${location.pathname === item.href
                  ? 'text-red-400 bg-white/10'
                  : 'text-white'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;