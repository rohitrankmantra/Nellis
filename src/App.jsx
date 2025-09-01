import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WeeklySpecials from "./pages/WeeklySpecials";
import Inventory from "./pages/Inventory";
import SpecialOffers from "./pages/SpecialOffers";
import Financing from "./pages/Financing";
import ServiceParts from "./pages/ServiceParts";
import DealerDirectory from "./pages/DealerDirectory";
import DealerProfile from "./pages/DealerProfile";
import AutoBusinesses from "./pages/AutoBusinesses";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";

function App() {
 
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-ralewayM">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weekly-specials" element={<WeeklySpecials />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/special-offers" element={<SpecialOffers />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/service-parts" element={<ServiceParts />} />
            <Route path="/dealer-directory" element={<DealerDirectory />} />
            <Route path="/dealer/:id" element={<DealerProfile />} />
            <Route path="/auto-businesses" element={<AutoBusinesses />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                theme: {
                  primary: "#4aed88",
                },
              },
            }}
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
