import React from "react";
import { Car, Globe } from "lucide-react";

const CarLogo = () => {
  return (
    <div className="w-full py-20 bg-[#F9FAFB] flex justify-center">
      <div className="w-full max-w-6xl px-6">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-14 tracking-tight">
          Explore Our Premium Car Categories
        </h2>

        {/* Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Domestic */}
          <div
            className="group relative w-full p-8 rounded-3xl
            bg-gradient-to-br from-[#0a1430] via-[#0d1d4a] to-[#13336c]
            shadow-xl border border-white/20
            hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-white">

              {/* Icon Frame */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center
                bg-white/10 border border-white/20 backdrop-blur-md
                shadow-lg mb-4 group-hover:scale-110 transition-all duration-300"
              >
                <Car size={40} className="text-[#2E6FEF] drop-shadow-md" />
              </div>

              <h3 className="text-2xl font-bold tracking-wide">DOMESTIC</h3>
              <p className="text-gray-300 text-center text-base mt-2">
                Reliable • Trusted • Everyday Performance
              </p>
            </div>
          </div>

          {/* Imports */}
          <div
            className="group relative w-full p-8 rounded-3xl
            bg-gradient-to-br from-[#0a1430] via-[#0d1d4a] to-[#13336c]
            shadow-xl border border-white/20
            hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-white">

              {/* Icon Frame */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center
                bg-white/10 border border-white/20 backdrop-blur-md
                shadow-lg mb-4 group-hover:scale-110 transition-all duration-300"
              >
                <Globe size={40} className="text-[#E73737] drop-shadow-md" />
              </div>

              <h3 className="text-2xl font-bold tracking-wide">IMPORTS</h3>
              <p className="text-gray-300 text-center text-base mt-2">
                Luxury • High-Performance • Exclusive Models
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarLogo;
