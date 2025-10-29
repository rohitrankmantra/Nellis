import React from 'react';
import { Link } from 'react-router-dom';
import { Car, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import logo from "../assets/nelis-logo.png"
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                {/* <Car className="h-10 w-10 text-red-500" /> */}
                <img src={logo} className=' h-20 w-32 ml-['></img>
                <div className="absolute -inset-1  rounded-full blur"></div>
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Nellis Blvd Auto Dealers
              </span>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Your premier destination for quality used vehicles along Nellis Boulevard. 
              Serving Las Vegas with pride, honor, and exceptional service since day one.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-white/10">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xl mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/inventory" className="text-gray-300 hover:text-red-400 transition-colors duration-300 hover:pl-2">Browse Inventory</Link></li>
              <li><Link to="/financing" className="text-gray-300 hover:text-red-400 transition-colors duration-300 hover:pl-2">Get Financing</Link></li>
              <li><Link to="/service-parts" className="text-gray-300 hover:text-red-400 transition-colors duration-300 hover:pl-2">Service & Parts</Link></li>
              <li><Link to="/weekly-specials" className="text-gray-300 hover:text-red-400 transition-colors duration-300 hover:pl-2">Weekly Specials</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-xl mb-6 text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium">1892 Ringe Lane</p>
                  <p className="text-gray-300">Las Vegas, NV 89156</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-500 flex-shrink-0" />
                <a href="tel:702-809-6463" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                  702-809-6463
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-500 flex-shrink-0" />
                <a href="mailto:denny@nellisboulevardautodealers.com" className="text-gray-300 hover:text-red-400 transition-colors duration-300">
                   denny@nellisboulevardautodealers.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2024 Nellis Boulevard Auto Dealers. All rights reserved.
            </p>
            <p className="text-gray-400 text-center md:text-right mt-2 md:mt-0">
              Proudly serving Las Vegas from Craig to Russell Road
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;