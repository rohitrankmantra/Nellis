import React from 'react';
import bmw from '../assets/icons/icons8-bmw.svg';
import ferrari from '../assets/icons/icons8-ferrari.svg';
import honda from '../assets/icons/icons8-honda.svg';
import jeep from '../assets/icons/icons8-jeep.svg';
import rollsRoyce from '../assets/icons/icons8-rolls-royce.svg';
import tesla from '../assets/icons/icons8-tesla.svg';
import toyota from '../assets/icons/icons8-toyota.svg';
import volkswagen from '../assets/icons/icons8-volkswagen.svg';

const CarLogo = () => {
  const carBrands = [
    { name: 'BMW', icon: bmw },
    { name: 'Ferrari', icon: ferrari },
    { name: 'Honda', icon: honda },
    { name: 'Jeep', icon: jeep },
    { name: 'Rolls-Royce', icon: rollsRoyce },
    { name: 'Tesla', icon: tesla },
    { name: 'Toyota', icon: toyota },
    { name: 'Volkswagen', icon: volkswagen },
  ];

  return (
    <div className="container mx-auto p-6 mt-10 lg:w-8/12 bg-gray-50 rounded-lg">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight leading-tight">
        Explore Our Premium Car Selection
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-8">
        {carBrands.map((car, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl  transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border border-gray-100"
          >
            <img src={car.icon} alt={`${car.name} Logo`} className="h-20 w-20 mb-4 object-contain" />
            <p className="text-xl font-semibold text-gray-700 mt-2">{car.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarLogo;