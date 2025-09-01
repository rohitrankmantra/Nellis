import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Star, ArrowRight, Award, Shield } from 'lucide-react';
import { mockDealers } from '../data/mockData';
import axios from 'axios';
import toast from 'react-hot-toast';

const DealerDirectory = () => {

  ///////////// ---  Dealer Data get --- ///////////////

  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/api/v1/dealerships')
      .then((response) => {
        setDealers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.message);
      });
  }, []);




  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {
            loading ? (
              <>
                {
                  [1, 2, 3, 4, 5, 6].map((index) => (
                    <div className="w-full  p-4 border rounded-lg shadow animate-pulse bg-white" key={index}>
                      <div className="h-48 bg-gray-200 rounded w-full shimmer"></div>
                      <div className="mt-4 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 shimmer"></div>
                        <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
                      </div>
                    </div>
                  ))
                }
              </>
            ) : dealers?.data?.map((dealer) => (
              <div key={dealer?._id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={dealer?.coverImage}
                    alt={dealer?.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    Certified
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {dealer?.name}
                    </h2>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 font-medium">4.8</span>
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
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-gray-700 font-medium">Mon-: {dealer?.hours.split(',')[0]}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dealer?.services?.map((service, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-300"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dealer?.specialties?.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-200 transition-colors duration-300"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

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
            ))}
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
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center  hover: shadow-xl"
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