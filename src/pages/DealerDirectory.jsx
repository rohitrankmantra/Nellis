import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Star, ArrowRight, Award, Shield, Search, Filter } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DealerDirectory = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    service: '',
    specialty: '',
    minRating: 0,
    certified: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://backend-nelis-website.onrender.com/api/v1/dealerships?limit=9999')
      .then((response) => {
        setDealers(response.data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.message);
      });
  }, []);

  // collect dynamic filter values
  const allServices = [...new Set(dealers.flatMap(d => d.services || []))];
  const allSpecialties = [...new Set(dealers.flatMap(d => d.specialties || []))];

  // filtering logic
  const filteredDealers = useMemo(() => {
    return dealers.filter(dealer => {
      const matchesSearch = dealer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesService = !filters.service || dealer.services?.includes(filters.service);
      const matchesSpecialty = !filters.specialty || dealer.specialties?.includes(filters.specialty);
      const matchesRating = !filters.minRating || (dealer.rating || 0) >= filters.minRating;
      const matchesCertified = !filters.certified || (filters.certified === 'yes' ? dealer.certified : !dealer.certified);

      return matchesSearch && matchesService && matchesSpecialty && matchesRating && matchesCertified;
    });
  }, [dealers, searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Dealer Directory</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Find trusted dealerships along Nellis Boulevard from Craig to Russell Road
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by dealer name..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.service}
                    onChange={(e) => setFilters({...filters, service: e.target.value})}
                  >
                    <option value="">All Services</option>
                    {allServices.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                {/* Specialty */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.specialty}
                    onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                  >
                    <option value="">All Specialties</option>
                    {allSpecialties.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.minRating}
                    onChange={(e) => setFilters({...filters, minRating: parseInt(e.target.value)})}
                  >
                    <option value={0}>Any</option>
                    <option value={3}>3 stars+</option>
                    <option value={4}>4 stars+</option>
                    <option value={5}>5 stars</option>
                  </select>
                </div>

                {/* Certified */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Certified</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.certified}
                    onChange={(e) => setFilters({...filters, certified: e.target.value})}
                  >
                    <option value="">All</option>
                    <option value="yes">Certified Only</option>
                    <option value="no">Non-Certified</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-xl text-gray-600 font-medium">
            Showing {filteredDealers.length} of {dealers.length} dealers
          </p>
        </div>

        {/* Dealers grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div className="w-full p-4 border rounded-lg shadow animate-pulse bg-white" key={i}>
                <div className="h-48 bg-gray-200 rounded w-full shimmer"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
                </div>
              </div>
            ))
          ) : filteredDealers.length > 0 ? (
            filteredDealers.map((dealer) => (
              <div key={dealer._id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={dealer?.coverImage}
                    alt={dealer?.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {dealer.certified && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      Certified
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {dealer?.name}
                    </h2>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < (dealer.rating || 0) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      {/* <span className="ml-2 text-sm text-gray-600 font-medium">{dealer?.rating || 'N/A'}</span> */}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">{dealer?.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{dealer?.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <a href={`tel:${dealer.phone}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                        {dealer?.phone}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <a href={`mailto:${dealer?.email}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300">
                        {dealer?.email}
                      </a>
                    </div>
               <div className="flex flex-col">
  <span className="flex items-center mb-1">
    <Clock className="h-5 w-5 text-blue-600 mr-3" />
    <span className="text-gray-700 font-medium">Working Hours:</span>
  </span>
  {dealer?.hours && typeof dealer.hours === 'object' ? (
    <div className="ml-8 text-gray-700 font-medium space-y-1">
      {Object.entries(dealer.hours).map(([day, time]) => (
        <p key={day}>
          <span className="font-semibold">{day}:</span> {time}
        </p>
      ))}
    </div>
  ) : (
    <span className="ml-8 text-gray-700 font-medium">{dealer?.hours}</span>
  )}
</div>

                  </div>

                  {dealer?.services?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dealer.services.map((s, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {dealer?.specialties?.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dealer.specialties.map((sp, i) => (
                          <span key={i} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-200 transition-colors duration-300">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Link
                      to={`/dealer/${dealer?._id}`}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <a
                      href={`tel:${dealer?.phone}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center shadow-lg hover:shadow-xl"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No dealers found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters to see more results.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      service: '',
                      specialty: '',
                      minRating: 0,
                      certified: ''
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

        {/* Map Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Nellis Boulevard Auto Corridor</h2>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 h-80 rounded-2xl flex items-center justify-center border-2 border-blue-200">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <p className="text-gray-600 text-xl font-semibold">Interactive map showing all dealerships</p>
              <p className="text-gray-500 mt-3 text-lg">From Craig Road to Russell Road</p>
              <div className="mt-6 flex justify-center space-x-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-600">Certified Dealers</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-600">Top Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 via-slate-900 to-green-900 text-white rounded-3xl p-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Visit a Dealership?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Browse our inventory to see what vehicles are available at each location, or get pre-approved for financing
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/inventory"
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center hover:shadow-xl"
              >
                Browse Inventory
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/financing"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                Get Pre-Approved
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDirectory;
