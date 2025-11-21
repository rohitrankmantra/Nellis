import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Star, Car, ArrowLeft, Globe, Award, Shield, CheckCircle } from 'lucide-react';
import { mockDealers, mockCars } from '../data/mockData';
import axiosInstance from '../lib/axiosInstance';


const DealerProfile = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState(null);


  useEffect(() => {
 axiosInstance.get(`/dealerships/${id}`)
  .then((response) => {
    setDealer(response.data);
  })
  .catch((error) => {
    toast.error(error?.response?.data?.message || error.message);
  });

  }, [])


  // const dealer = mockDealers.find(d => d.id === id);
  // const dealerCars = mockCars.filter(car => car.dealershipId === id);

  // if (!dealer) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md">
  //         <h1 className="text-3xl font-bold text-gray-900 mb-6">Dealer Not Found</h1>
  //         <p className="text-gray-600 mb-8">The dealership you're looking for doesn't exist or has been moved.</p>
  //         <Link 
  //           to="/dealer-directory" 
  //           className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300"
  //         >
  //           Return to Dealer Directory
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  const dayMap = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };
  const weekDays = Object.values(dayMap);

  const parsedHours = (() => {
    const str = dealer?.data?.hours || "";
    const parsed = {};

    const parts = str.split(",").map((p) => p.trim());

 parts.forEach((part) => {
  // split only on the first colon
  const [days, time] = part.split(/:(.+)/).map((s) => s.trim()); 
  if (days.includes("-")) {
    const [start, end] = days.split("-").map((d) => d.trim());
    const keys = Object.keys(dayMap);
    const startIndex = keys.indexOf(start);
    const endIndex = keys.indexOf(end);

    for (let i = startIndex; i <= endIndex; i++) {
      parsed[dayMap[keys[i]]] = time;
    }
  } else {
    parsed[dayMap[days]] = time;
  }
});


    return parsed;
  })();


  return (

    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-green-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/dealer-directory"
              className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors duration-300"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Directory
            </Link>
            <div className="flex items-center space-x-4">
              <h1 className="text-5xl font-bold">{dealer?.data?.name}</h1>
              <div className="flex items-center space-x-2">
                <Award className="h-8 w-8 text-yellow-400" />
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Certified Dealer
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Dealer Info */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={dealer?.data?.coverImage}
                    alt={dealer?.data?.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-3 text-gray-900">{dealer?.data?.name}</h2>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 fill-current" />
                          ))}
                        </div>
                        <span className="ml-3 text-gray-600 text-lg font-medium">4.8 (124 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xl leading-relaxed">{dealer?.data?.description}</p>
                </div>
              </div>

              {/* Services & Specialties */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-3xl font-bold mb-8 text-gray-900">Services & Specialties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-6 flex items-center">
                      <Shield className="h-6 w-6 text-blue-600 mr-3" />
                      Services Offered:
                    </h4>
                    <div className="space-y-3">
                      {dealer?.data?.services?.map((service, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 font-medium text-lg">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-6 flex items-center">
                      <Award className="h-6 w-6 text-blue-600 mr-3" />
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {dealer?.data?.specialties?.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-800 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-200 transition-colors duration-300"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Inventory */}
              {/* <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-3xl font-bold mb-8 flex items-center text-gray-900">
                  <Car className="h-8 w-8 text-blue-600 mr-3" />
                  Current Inventory ({dealerCars.length} vehicles)
                </h3>
                {dealerCars.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {dealerCars.map((car) => (
                      <div key={car.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
                        <img
                          src={car.image}
                          alt={`${car.year} ${car.make} ${car.model}`}
                          className="w-full h-40 object-cover rounded-xl mb-4"
                        />
                        <h4 className="font-bold text-xl text-gray-900">{car.year} {car.make} {car.model}</h4>
                        <p className="text-gray-600 text-lg">{car.mileage.toLocaleString()} miles</p>
                        <p className="text-3xl font-bold text-green-600 mt-3">${car.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 text-xl">No vehicles currently in inventory.</p>
                    <p className="text-gray-500 mt-2">Please contact the dealership for availability.</p>
                  </div>
                )}
                <div className="mt-8 text-center">
                  <Link
                    to="/inventory"
                    className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-300"
                  >
                    View All Inventory →
                  </Link>
                </div>
              </div> */}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg text-gray-900">Address</p>
                      <p className="text-gray-600 text-lg">{dealer?.data?.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-lg text-gray-900">Phone</p>
                      <a href={`tel:${dealer?.data?.phone}`} className="text-blue-600 hover:text-blue-800 text-lg font-medium transition-colors duration-300">
                        {dealer?.data?.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-lg text-gray-900">Email</p>
                      <a href={`mailto:${dealer?.data?.email}`} className="text-blue-600 hover:text-blue-800 text-lg font-medium transition-colors duration-300">
                        {dealer?.data?.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                    <div>
                      <p className="font-semibold text-lg text-gray-900">Website</p>
                      <a href={`https://${dealer?.data?.website}`} className="text-blue-600 hover:text-blue-800 text-lg font-medium transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                        {dealer?.data?.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                  <Clock className="h-6 w-6 text-blue-600 mr-3" />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl shadow p-6">
                {dealer?.data?.hours ? (
  // If backend sends full string like "7:30 AM to 5:50 PM"
  typeof dealer.data.hours === 'string' && dealer.data.hours.includes('to') ? (
    <p className="text-gray-600 font-medium text-lg">{dealer.data.hours}</p>
  ) : (
    // Otherwise display parsed object
    Object.entries(parsedHours).map(([day, hours]) => (
      <div
        key={day}
        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
      >
        <span className="font-semibold text-gray-900">{day}:</span>
        <span className="text-gray-600 font-medium">{hours}</span>
      </div>
    ))
  )
) : (
  <p className="text-gray-500 font-medium">Working hours not available</p>
)}

                  </div>

                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions</h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${dealer?.data?.phone}`}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center block text-lg shadow-lg hover:shadow-xl"
                  >
                    Call Now
                  </a>
                  <a
                    href={`mailto:${dealer?.data?.email}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center block text-lg shadow-lg hover:shadow-xl"
                  >
                    Send Email
                  </a>
                  <Link
                    to="/financing"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center block text-lg shadow-lg hover:shadow-xl"
                  >
                    Get Pre-Approved
                  </Link>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Location</h3>
                <div className="bg-gradient-to-br from-blue-50 to-green-50 h-64 rounded-2xl flex items-center justify-center border-2 border-blue-200">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-semibold text-lg">Interactive Map</p>
                    <p className="text-gray-500 mt-2">{dealer?.data?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default DealerProfile;

