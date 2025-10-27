import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import {
  Car,
  Shield,
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";
import CarLogo from "../components/CarLogo";

const Home = () => {


  return (
    <div>
      <Hero />

      <section>
        <CarLogo />
      </section>
      {/* Features Section */}
      <section className="py-20 border-t  bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Nellis Boulevard Auto Dealers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're your trusted partner for quality used vehicles along Las
              Vegas' premier auto corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Quality Vehicles
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Thoroughly inspected, low-mileage cars from trusted dealerships
                with detailed history reports
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Warranty Protection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Extended warranties and comprehensive service protection plans
                available for peace of mind
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Competitive Pricing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Best prices on Nellis Boulevard with flexible financing options
                and trade-in programs
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Quick Service
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Fast approvals and same-day delivery when possible with
                streamlined processes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-blue-200">
              Our numbers speak for themselves
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-red-400 mb-2">Thousands </div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-400 mb-2">Hundreds</div>
              <div className="text-blue-200">Vehicles Available</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-400 mb-2">20+</div>
              <div className="text-blue-200">Trusted Dealerships</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-red-400 mb-2">25</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Dealerships */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Some on List
            </h2>
            <p className="text-xl text-gray-600">
              Trusted partners serving the Las Vegas community with excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg"
                  alt="Vegas Premier Auto"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  Vegas Premier Auto
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Family-owned dealership with 20+ years of experience serving
                  Las Vegas
                </p>
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-gray-600 font-medium">
                    4.8 (124 reviews)
                  </span>
                </div>
                <Link
                  to="/dealer/1"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group-hover:translate-x-1 transition-all duration-300"
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg"
                  alt="Thunderbird Motors"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  Thunderbird Motors
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Proud to serve military families with honor and exceptional
                  service
                </p>
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-gray-600 font-medium">
                    4.9 (89 reviews)
                  </span>
                </div>
                <Link
                  to="/dealer/2"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group-hover:translate-x-1 transition-all duration-300"
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg"
                  alt="Desert Auto Sales"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  Desert Auto Sales
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Flexible financing for all credit situations and first-time
                  buyers
                </p>
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                    <Star className="h-5 w-5 text-gray-300" />
                  </div>
                  <span className="ml-3 text-sm text-gray-600 font-medium">
                    4.5 (156 reviews)
                  </span>
                </div>
                <Link
                  to="/dealer/3"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group-hover:translate-x-1 transition-all duration-300"
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/dealer-directory"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Dealerships
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "Excellent service and great selection. Found the perfect car
                for my family at Vegas Premier Auto. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">John Davis</div>
                  <div className="text-gray-600 text-sm">Las Vegas, NV</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "As a military family, Thunderbird Motors treated us with
                respect and got us a great deal. Thank you!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    Sarah Martinez
                  </div>
                  <div className="text-gray-600 text-sm">Henderson, NV</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "First-time buyer and they made the process so easy. Desert Auto
                Sales helped me get approved with no credit history."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  MR
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">
                    Mike Rodriguez
                  </div>
                  <div className="text-gray-600 text-sm">
                    North Las Vegas, NV
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Next Vehicle?
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            Browse our extensive inventory of quality pre-owned vehicles or get
            pre-approved for financing today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/inventory"
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Browse Inventory
              <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/financing"
              className="group bg-transparent border-2 border-white/80 hover:bg-white hover:text-blue-900 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Get Pre-Approved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
