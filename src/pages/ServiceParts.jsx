import React, { useState } from "react";
import {
  Wrench,
  Package,
  Calendar,
  Clock,
  Car,
  CheckCircle,
  Star,
  Award,
  Shield,
  Loader,
  Check,
} from "lucide-react";
import { LifeBuoy, BatteryCharging, Lightbulb } from "lucide-react";
import axiosInstance from '../lib/axiosInstance';

import toast from "react-hot-toast";

const ServiceParts = () => {
  const [activeTab, setActiveTab] = useState("service");
  const [formData, setFormData] = useState({
    name: "", // This will be first name + last name
    phone: "",
    email: "",
    vehicleYear: "",
    make: "",
    model: "",
    serviceNeeded: "",
    preferredDate: "",
    preferredTime: "",
    additionalNotes: "",
  });

  const [formDataParts, setFormDataParts] = useState({
    name: "", // This will be firstName + lastName
    phone: "",
    email: "",
    vehicleYear: "",
    make: "",
    model: "",
    VIN: "",
    partsNeeded: "",
    preferredPickup: "", // This will store the date
    preferredPickupOption: "", // This will store the selected text (e.g., "Pickup at dealership")
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
      setFormData((prev) => ({ ...prev, name: `${value} ${lastName}`.trim() }));
    } else if (name === "lastName") {
      setLastName(value);
      setFormData((prev) => ({
        ...prev,
        name: `${firstName} ${value}`.trim(),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
      setFormDataParts((prev) => ({
        ...prev,
        name: `${value} ${lastName}`.trim(),
      }));
    } else if (name === "lastName") {
      setLastName(value);
      setFormDataParts((prev) => ({
        ...prev,
        name: `${firstName} ${value}`.trim(),
      }));
    } else if (name === "preferredPickupOption") {
      // Handle dropdown selection for preferred pickup option
      setFormDataParts((prev) => ({ ...prev, [name]: value }));
      // If you want to use this for a concrete date, you'd need another input
      // For now, let's assume `preferredPickup` is the actual date input.
    } else {
      setFormDataParts((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = () => {
    const {
      name,
      phone,
      email,
      vehicleYear,
      make,
      model,
      serviceNeeded,
      preferredDate,
      preferredTime,
    } = formData;
    return (
      name.trim() !== "" &&
      phone.trim() !== "" &&
      email.trim() !== "" &&
      vehicleYear !== "" &&
      make.trim() !== "" &&
      model.trim() !== "" &&
      serviceNeeded.trim() !== "" &&
      preferredDate.trim() !== "" &&
      preferredTime.trim() !== ""
    );
  };
  const isFormValid2 = () => {
    const {
      name,
      phone,
      email,
      vehicleYear,
      make,
      model,
      partsNeeded,
      preferredPickup,
      preferredPickupOption,
    } = formDataParts;
    return (
      name.trim() !== "" &&
      phone.trim() !== "" &&
      email.trim() !== "" &&
      vehicleYear !== "" &&
      make.trim() !== "" &&
      model.trim() !== "" &&
      partsNeeded.trim() !== "" &&
      preferredPickup.trim() !== "" &&
      preferredPickupOption.trim() !== ""
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setFormSubmitted(false); // Reset success message state

    try {
      // Adjust preferredDate format for backend (e.g., to ISO string)
      const submissionData = {
        ...formData,
        preferredDate: new Date(formData.preferredDate).toISOString(),
      };

 const response = await axiosInstance.post("services", submissionData);


      if (response.status === 201) {
        toast.success("Appointment scheduled successfully!");
        setFormSubmitted(true); // Indicate success
        // Optionally reset form after successful submission
        setFormData({
          name: "",
          phone: "",
          email: "",
          vehicleYear: "",
          make: "",
          model: "",
          serviceNeeded: "",
          preferredDate: "",
          preferredTime: "",
          additionalNotes: "",
        });
        setFirstName("");
        setLastName("");
      } else {
        toast.error("Failed to schedule appointment. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error scheduling service:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Error scheduling appointment. Please check your details."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSubmitParts = async (e) => {
    e.preventDefault();

    if (!isFormValid2()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setFormSubmitted(false); // Reset success message state

    try {
      // Adjust preferredPickup format for backend (to ISO string)
      const submissionData = {
        ...formDataParts,
        preferredPickup: new Date(formDataParts.preferredPickup).toISOString(),
        // Exclude preferredPickupOption from the data sent to backend if not needed
        // The backend model only expects 'preferredPickup' (Date)
      };
    

      const response = await axios.post(`${API_BASE_URL}parts`, submissionData);

      if (response.status === 201) {
        toast.success("Parts request submitted successfully!");
        setFormSubmitted(true); // Indicate success
        // Optionally reset form after successful submission
        setFormDataParts({
          name: "",
          phone: "",
          email: "",
          vehicleYear: "",
          make: "",
          model: "",
          VIN: "",
          partsNeeded: "",
          preferredPickup: "",
          preferredPickupOption: "",
        });
        setFirstName("");
        setLastName("");
      } else {
        toast.error("Failed to submit parts request. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error submitting parts request:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "Error submitting parts request. Please check your details."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      name: "Oil Change & Filter",
      price: "$39.95",
      time: "30 minutes",
      description:
        "Full synthetic oil change with new filter and comprehensive multi-point inspection",
      popular: true,
    },
    {
      name: "Brake Service",
      price: "$199.95",
      time: "2 hours",
      description:
        "Complete brake inspection, pad replacement, and rotor resurfacing with warranty",
      popular: false,
    },
    {
      name: "Tire Rotation & Balance",
      price: "$79.95",
      time: "45 minutes",
      description:
        "Professional tire rotation, wheel balancing, and pressure check",
      popular: false,
    },
    {
      name: "A/C Service",
      price: "$149.95",
      time: "1.5 hours",
      description:
        "A/C system inspection, refrigerant recharge, and comprehensive leak test",
      popular: true,
    },
    {
      name: "Transmission Service",
      price: "$179.95",
      time: "1 hour",
      description:
        "Transmission fluid change and filter replacement with system flush",
      popular: false,
    },
    {
      name: "Engine Diagnostics",
      price: "$129.95",
      time: "1 hour",
      description:
        "Advanced computer diagnostic scan with detailed report and recommendations",
      popular: false,
    },
  ];

  const parts = [
    {
      category: "Engine Parts",
      items: ["Oil Filters", "Air Filters", "Spark Plugs", "Belts & Hoses"],
      icon: <Car className="h-6 w-6" />,
    },
    {
      category: "Brake Parts",
      items: ["Brake Pads", "Brake Rotors", "Brake Fluid", "Brake Lines"],
      icon: <Shield className="h-6 w-6" />,
    },
    {
      category: "Electrical",
      items: ["Batteries", "Alternators", "Starters", "Fuses"],
      icon: <Wrench className="h-6 w-6" />,
    },
    {
      category: "Suspension",
      items: ["Shocks", "Struts", "Springs", "Control Arms"],
      icon: <Package className="h-6 w-6" />,
    },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear + 1 - i);

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Service & Parts
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Professional automotive service and genuine parts from certified
              technicians
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-12">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("service")}
              className={`flex-1 py-6 px-8 text-center font-semibold transition-all duration-300 rounded-t-2xl ${
                activeTab === "service"
                  ? "text-blue-600 border-b-4 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Wrench className="h-6 w-6 inline mr-3" />
              Service Appointment
            </button>
            <button
              onClick={() => setActiveTab("parts")}
              className={`flex-1 py-6 px-8 text-center font-semibold transition-all duration-300 rounded-t-2xl ${
                activeTab === "parts"
                  ? "text-blue-600 border-b-4 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <Package className="h-6 w-6 inline mr-3" />
              Order Parts
            </button>
          </div>
        </div>

        {activeTab === "service" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Service Booking Form */}
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <h2 className="text-3xl font-bold mb-8 flex items-center text-gray-900">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                Book Service Appointment
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="vehicleYear"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Vehicle Year
                    </label>
                    <select
                      id="vehicleYear"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      required
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="make"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Make
                    </label>
                    <select
                      id="make"
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      required
                    >
                      <option value="">Select Make</option>
                      <option value="Honda">Honda</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Ford">Ford</option>
                      <option value="Chevrolet">Chevrolet</option>
                      <option value="Nissan">Nissan</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="BMW">BMW</option>
                      <option value="Audi">Audi</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Kia">Kia</option>
                      <option value="Subaru">Subaru</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="model"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Model
                    </label>
                    <input
                      id="model"
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter model"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="serviceNeeded"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Service Needed
                  </label>
                  <select
                    id="serviceNeeded"
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="Brake Service">Brake Service</option>
                    <option value="Tire Service">Tire Service</option>
                    <option value="A/C Service">A/C Service</option>
                    <option value="Engine Diagnostics">
                      Engine Diagnostics
                    </option>
                    <option value="General Inspection">
                      General Inspection
                    </option>
                    <option value="Battery Check/Replacement">
                      Battery Check/Replacement
                    </option>
                    <option value="Suspension Repair">Suspension Repair</option>
                    <option value="Fluid Check/Top-off">
                      Fluid Check/Top-off
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Preferred Date
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      min={minDate} // Set minimum date to today
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="preferredTime"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Preferred Time
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      required
                    >
                      <option value="">Select Time Slot</option>
                      <option value="Morning (8AM-12PM)">
                        Morning (8AM-12PM)
                      </option>
                      <option value="Afternoon (12PM-5PM)">
                        Afternoon (12PM-5PM)
                      </option>
                      <option value="Evening (5PM-8PM)">
                        Evening (5PM-8PM)
                      </option>
                      <option value="Anytime">Anytime</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="additionalNotes"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Describe any specific issues or concerns..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-5 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-lg shadow-lg hover:shadow-xl
                  ${
                    !isFormValid() || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader className="h-6 w-6 mr-3 animate-spin" />
                  ) : formSubmitted ? (
                    <Check className="h-6 w-6 mr-3" />
                  ) : (
                    <Calendar className="h-6 w-6 mr-3" />
                  )}
                  {isSubmitting
                    ? "Scheduling..."
                    : formSubmitted
                    ? "Appointment Confirmed!"
                    : "Schedule Appointment"}
                </button>
              </form>
            </div>

            {/* Service Menu */}
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Service Menu
              </h2>
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                      service.popular
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <h3 className="font-bold text-xl text-gray-900">
                          {service.name}
                        </h3>
                        {service.popular && (
                          <span className="ml-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <span className="text-2xl font-bold text-blue-600">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="font-medium">{service.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "parts" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Parts Order Form */}
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <h2 className="text-3xl font-bold mb-8 flex items-center text-gray-900">
                <div className="bg-green-100 p-3 rounded-xl mr-4">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
                Order Parts
              </h2>

              <form onSubmit={handleSubmitParts} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange2}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange2}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formDataParts.phone}
                      onChange={handleChange2}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formDataParts.email}
                      onChange={handleChange2}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="vehicleYear"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Vehicle Year
                    </label>
                    <select
                      id="vehicleYear"
                      name="vehicleYear"
                      value={formDataParts.vehicleYear}
                      onChange={handleChange2}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      required
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="make"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Make
                    </label>
                    <select
                      id="make"
                      name="make"
                      value={formDataParts.make}
                      onChange={handleChange2}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      required
                    >
                      <option value="">Select Make</option>
                      <option value="Honda">Honda</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Ford">Ford</option>
                      <option value="Chevrolet">Chevrolet</option>
                      <option value="Nissan">Nissan</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="BMW">BMW</option>
                      <option value="Audi">Audi</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Kia">Kia</option>
                      <option value="Subaru">Subaru</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="model"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Model
                    </label>
                    <input
                      id="model"
                      type="text"
                      name="model"
                      value={formDataParts.model}
                      onChange={handleChange2}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      placeholder="Enter model"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="VIN"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    VIN (Optional)
                  </label>
                  <input
                    id="VIN"
                    type="text"
                    name="VIN"
                    value={formDataParts.VIN}
                    onChange={handleChange2}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter VIN for exact part matching (17 characters)"
                    maxLength={17}
                  />
                </div>

                <div>
                  <label
                    htmlFor="partsNeeded"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Parts Needed
                  </label>
                  <textarea
                    id="partsNeeded"
                    name="partsNeeded"
                    rows={4}
                    value={formDataParts.partsNeeded}
                    onChange={handleChange2}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="List the parts you need (e.g., brake pads, oil filter, spark plugs)..."
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="preferredPickup"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Preferred Pickup Date
                    </label>
                    <input
                      id="preferredPickup"
                      type="date"
                      name="preferredPickup"
                      value={formDataParts.preferredPickup}
                      onChange={handleChange2}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      min={minDate}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="preferredPickupOption"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Preferred Pickup/Delivery Option
                    </label>
                    <select
                      id="preferredPickupOption"
                      name="preferredPickupOption"
                      value={formDataParts.preferredPickupOption}
                      onChange={handleChange2}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="Pickup at dealership">
                        Pickup at dealership
                      </option>
                      <option value="Local delivery (+$15)">
                        Local delivery (+$15)
                      </option>
                      <option value="Express delivery (+$25)">
                        Express delivery (+$25)
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-lg shadow-lg hover:shadow-xl
                  ${
                    !isFormValid2() || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={!isFormValid2() || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader className="h-6 w-6 mr-3 animate-spin" />
                  ) : formSubmitted ? (
                    <Check className="h-6 w-6 mr-3" />
                  ) : (
                    <Package className="h-6 w-6 mr-3" />
                  )}
                  {isSubmitting
                    ? "Submitting Request..."
                    : formSubmitted
                    ? "Request Confirmed!"
                    : "Submit Parts Request"}
                </button>
              </form>
            </div>

            {/* Parts Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Parts Categories
              </h2>
              <div className="space-y-8">
                {parts.map((category, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-bold text-xl mb-4 flex items-center text-gray-900">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        {category.icon}
                      </div>
                      {category.category}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Service Specials */}
        <div className="mt-20 bg-gradient-to-r from-red-700 via-slate-900 to-blue-900 text-white rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Current Service Specials
            </h2>
            <p className="text-xl text-gray-200">
              Limited time offers on essential services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">
                  Oil Change Special
                </h3>
                <p className="text-red-200 mb-2 line-through">Regular $49.95</p>
                <p className="text-4xl font-bold mb-4">$29.95</p>
                <p className="text-sm">
                  Includes synthetic blend oil and filter
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <Award className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">
                  Brake Inspection
                </h3>
                <p className="text-red-200 mb-2 line-through">Regular $89.95</p>
                <p className="text-4xl font-bold mb-4">FREE</p>
                <p className="text-sm">With any brake service</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">A/C Check</h3>
                <p className="text-red-200 mb-2 line-through">Regular $79.95</p>
                <p className="text-4xl font-bold mb-4">$39.95</p>
                <p className="text-sm">Perfect for Las Vegas heat!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceParts;
