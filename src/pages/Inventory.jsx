"use client";

import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { 
  Search, Filter, Phone, Mail, Gauge, Calendar, Palette, Fuel, MapPin 
} from "lucide-react";

const API_BASE_URL = "https://backend-nelis-website.onrender.com/api/v1"; // your backend base URL

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    make: "",
    minPrice: 0,
    maxPrice: 100000,
    maxMileage: 100000,
    minYear: 2015,
    dealership: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch vehicles from backend
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/vehicles`);
      setInventory(res.data.data);

      // Extract dealers from vehicles (populated)
      const uniqueDealers = Array.from(
        new Map(res.data.data.map(v => [v.dealership._id, v.dealership])).values()
      );
      setDealers(uniqueDealers);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      alert("Failed to fetch inventory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const makes = [...new Set(inventory.map(car => car.brand))];

  const filteredCars = useMemo(() => {
    return inventory.filter(car => {
      const matchesSearch =
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMake = !filters.make || car.brand === filters.make;
      const matchesPrice = car.price >= filters.minPrice && car.price <= filters.maxPrice;
      const matchesMileage = car.mileage <= filters.maxMileage;
      const matchesYear = car.year >= filters.minYear;
      const matchesDealership =
        !filters.dealership || car.dealership._id === filters.dealership;

      return (
        matchesSearch &&
        matchesMake &&
        matchesPrice &&
        matchesMileage &&
        matchesYear &&
        matchesDealership
      );
    });
  }, [inventory, searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-red-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Vehicle Inventory</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Browse quality pre-owned vehicles from trusted dealers
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by make or model..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl flex items-center transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Make</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.make}
                    onChange={e => setFilters({ ...filters, make: e.target.value })}
                  >
                    <option value="">All Makes</option>
                    {makes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.maxPrice}
                    onChange={e => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                  >
                    <option value={100000}>Any Price</option>
                    <option value={10000}>Under $10,000</option>
                    <option value={15000}>Under $15,000</option>
                    <option value={20000}>Under $20,000</option>
                    <option value={25000}>Under $25,000</option>
                    <option value={30000}>Under $30,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Max Mileage</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.maxMileage}
                    onChange={e => setFilters({ ...filters, maxMileage: parseInt(e.target.value) })}
                  >
                    <option value={100000}>Any Mileage</option>
                    <option value={10000}>Under 10,000 miles</option>
                    <option value={25000}>Under 25,000 miles</option>
                    <option value={50000}>Under 50,000 miles</option>
                    <option value={75000}>Under 75,000 miles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Min Year</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.minYear}
                    onChange={e => setFilters({ ...filters, minYear: parseInt(e.target.value) })}
                  >
                    <option value={2015}>2015 or newer</option>
                    <option value={2018}>2018 or newer</option>
                    <option value={2020}>2020 or newer</option>
                    <option value={2022}>2022 or newer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dealership</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.dealership}
                    onChange={e => setFilters({ ...filters, dealership: e.target.value })}
                  >
                    <option value="">All Dealerships</option>
                    {dealers.map(dealer => (
                      <option key={dealer._id} value={dealer._id}>{dealer.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-xl text-gray-600 font-medium">
            {loading ? "Loading..." : `Showing ${filteredCars.length} of ${inventory.length} vehicles`}
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => {
            const dealer = car.dealership;
            return (
              <div key={car._id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={car.images[0] || ""} 
                    alt={`${car.year} ${car.brand} ${car.model}`}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${car.status === "Available" ? "bg-green-600 text-white" : "bg-gray-400 text-white"}`}>
                    {car.status}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{car.year} {car.brand} {car.model}</h3>
                    <span className="text-2xl font-bold text-green-600">${car.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Gauge className="h-4 w-4 mr-2 text-blue-600" />
                      {car.mileage.toLocaleString()} miles
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      {car.year}
                    </div>
                    <div className="flex items-center">
                      <Palette className="h-4 w-4 mr-2 text-blue-600" />
                      {car.exteriorColor || "N/A"}
                    </div>
                    <div className="flex items-center">
                      <Fuel className="h-4 w-4 mr-2 text-blue-600" />
                      {car.fuelType || "N/A"}
                    </div>
                  </div>
                  
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                      <p className="text-sm text-gray-600 font-medium">Available at:</p>
                    </div>
                    <p className="font-semibold text-blue-600 text-lg">{dealer?.name}</p>
                    <p className="text-sm text-gray-500">{dealer?.address}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center font-semibold">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Dealer
                    </button>
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center font-semibold">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Inquiry
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCars.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No vehicles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters to see more results.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilters({
                    make: '',
                    minPrice: 0,
                    maxPrice: 100000,
                    maxMileage: 100000,
                    minYear: 2015,
                    dealership: ''
                  });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
