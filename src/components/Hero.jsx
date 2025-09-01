import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Award } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-red-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-transparent to-red-900/80"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20  left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center space-x-2 bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/30">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm">Las Vegas Premier Dealership</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Find Your Perfect
                <span className="block text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text">
                  Used Vehicle
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                Discover quality pre-owned cars from trusted dealerships along Nellis Boulevard. 
                From Craig to Russell Road, we've got the best deals in Las Vegas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/inventory"
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Browse Inventory
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/weekly-specials"
                className="group bg-transparent border-2 border-white/80 hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center transform hover:scale-105 backdrop-blur-sm"
              >
                Weekly Specials
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="text-sm text-gray-300">Warranty Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-blue-400" />
                <span className="text-sm text-gray-300">Certified Dealers</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">This Week's Featured Deals</h3>
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">2020 Honda Civic</p>
                      <p className="text-sm text-gray-200">Low mileage • Excellent condition</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">$18,995</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">2019 Toyota Camry</p>
                      <p className="text-sm text-gray-200">Excellent condition • One owner</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">$22,495</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">2021 Nissan Altima</p>
                      <p className="text-sm text-gray-200">Like new • Factory warranty</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">$19,895</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link 
                  to="/weekly-specials" 
                  className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300"
                >
                  View All Deals →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;