import React, { useEffect, useRef, useState } from 'react';
import { Play, Calendar, MapPin, Star, ArrowRight, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const WeeklySpecials = () => {

  // Helper function to force HTTPS URLs
  const getHttpsUrl = (url) => {
    if (!url) return '';
    return url.replace(/^http:\/\//i, 'https://');
  };

  //////////// --- get Weekly Specials Data --- //////////////
  const [WeeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVideoUrl, setModalVideoUrl] = useState(null);
  const videoRefs = useRef({});

  const handlePlay = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play();
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get('https://backend-nelis-website.onrender.com/api/v1/weekly-specials')
      .then((response) => {
        setWeeklyData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.message);
      });
  }, []);

  const handleShowPopUpVideo = (url) => {
    setModalVideoUrl(url);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-red-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Weekly Specials</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Watch the latest video deals from our dealership partners and discover incredible savings
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((index) => (
              <div className="w-full p-4 border rounded-lg shadow animate-pulse bg-white" key={index}>
                <div className="h-48 bg-gray-200 rounded w-full shimmer"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 shimmer"></div>
                  <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
                </div>
              </div>
            ))
          ) : (
            WeeklyData?.data?.map((special) => (
              <div
                key={special?._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <video
                    ref={(el) => (videoRefs.current[special?._id] = el)}
                    src={getHttpsUrl(special?.video)}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handleShowPopUpVideo(special?.video)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 transition-all duration-300 transform group-hover:scale-110 shadow-2xl"
                    >
                      <Play className="h-10 w-10" />
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    NEW
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {special?.title}
                  </h3>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="font-medium">{special?.dealership?.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{new Date(special?.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {special.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleShowPopUpVideo(special.video)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                    >
                      Watch Video
                    </button>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-600">
                        Featured Deal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {modalVideoUrl && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full relative shadow-2xl">
              <button
                onClick={() => setModalVideoUrl(null)}
                className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 z-10"
              >
                <X className="h-5 w-5" />
              </button>
              <video
                src={getHttpsUrl(modalVideoUrl)}
                className="w-full h-[400px] object-cover"
                controls
                autoPlay
              />
            </div>
          </div>
        )}

        {/* Submit Video CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 via-slate-900 to-red-900 text-white rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Feature Your Dealership?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Submit your weekly video specials to be featured on our platform.
            Reach thousands of potential customers across Las Vegas and showcase your best deals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Submit Your Video
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Play className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Video Marketing</h3>
            <p className="text-gray-600">Showcase your vehicles with engaging video content that drives sales</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Featured Placement</h3>
            <p className="text-gray-600">Get premium visibility on our homepage and weekly specials page</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowRight className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Drive Traffic</h3>
            <p className="text-gray-600">Direct qualified leads straight to your dealership</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySpecials;
