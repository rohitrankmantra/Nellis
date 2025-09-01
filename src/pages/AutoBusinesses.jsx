import React, { useState, useEffect } from "react";
import { MapPin, Phone, Globe, Filter, Star, Award } from "lucide-react";
import { mockBusinesses } from "../data/mockData";
import axios from "axios";
import toast from "react-hot-toast";

const AutoBusinesses = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    ...new Set(mockBusinesses?.map((business) => business.category)),
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Oil Change": "bg-blue-100 text-blue-800",
      "Car Wash": "bg-green-100 text-green-800",
      "Tire Shop": "bg-purple-100 text-purple-800",
      "Parts Store": "bg-orange-100 text-orange-800",
      "Auto Repair": "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Oil Change":
        return "🛢️";
      case "Car Wash":
        return "🚿";
      case "Tire Shop":
        return "🛞";
      case "Parts Store":
        return "🔧";
      case "Auto Repair":
        return "⚙️";
      default:
        return "🚗";
    }
  };

  ///////////////// ---  Business Data get --- ///////////////

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/v1/businesses")
      .then((response) => {
        setBusinesses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.message);
      });
  }, []);

  /////////// filter data //////////////

  const filteredBusinesses = selectedCategory
    ? businesses?.data?.filter(
        (business) => business?.type === selectedCategory
      )
    : businesses;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Auto Businesses
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Complete directory of automotive services along Nellis Boulevard
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-3">
              <Filter className="h-6 w-6 text-gray-600" />
              <span className="font-semibold text-gray-700 text-lg">
                Filter by Category:
              </span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
            >
              <option value="">All Categories</option>
              <option value="Oil Change">Oil Change</option>
              <option value="Car Wash">Car Wash</option>
              <option value="Tire Shop">Tire Shop</option>
              <option value="Parts Store">Parts Store</option>
              <option value="Auto Repair">Auto Repair</option>
              <option value="Service Center">Service Center</option>
              <option value="Repair Shop">Repair Shop</option>
              <option value="Detailing">Detailing</option>
              <option value="Body Show">Body Show</option>
              <option value="Towing Service">Towing Service</option>
              <option value="Insurance">Insurance</option>
              <option value="Financing">Financing</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div
                  className="w-full  p-4 border rounded-lg shadow animate-pulse bg-white"
                  key={index}
                >
                  <div className="h-48 bg-gray-200 rounded w-full shimmer"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 shimmer"></div>
                    <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            (filteredBusinesses?.length > 0
              ? filteredBusinesses
              : businesses?.data
            )?.map((business) => (
              <div
                key={business?._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {business?.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">
                        {getCategoryIcon(business?.type)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                          business?.type
                        )}`}
                      >
                        {business?.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {business?.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {business?.address}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <a
                        href={`tel:${business?.phone}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                      >
                        {business?.phone}
                      </a>
                    </div>
                    {business?.website && (
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-blue-600 mr-3" />
                        <a
                          href={`https://${business?.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
                        >
                          {business?.website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                      Services:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {business?.services?.map((service, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <a
                      href={`tel:${business?.phone}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-xl"
                    >
                      Call
                    </a>
                    {business?.website && (
                      <a
                        href={`https://${business?.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-xl"
                      >
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Category Overview */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Service Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((category) => {
              const businessCount = mockBusinesses.filter(
                (b) => b.category === category
              ).length;
              return (
                <div
                  key={category}
                  className="group text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {category}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {businessCount} business{businessCount !== 1 ? "es" : ""}
                  </p>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 group-hover:translate-x-1"
                  >
                    View All →
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Business CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 via-slate-900 to-purple-900 text-white rounded-3xl p-12">
          <div className="text-center">
            <Award className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Own an Auto Business?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Get listed in our directory and reach thousands of potential
              customers along Nellis Boulevard. Join our network of trusted
              automotive service providers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Add Your Business
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoBusinesses;
