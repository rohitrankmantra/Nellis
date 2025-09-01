import React, { useState } from 'react';
import { Calculator, DollarSign, CreditCard, FileText, CheckCircle, TrendingUp, Shield, Clock } from 'lucide-react';

const Financing = () => {
  const [loanAmount, setLoanAmount] = useState(20000);
  const [downPayment, setDownPayment] = useState(2000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [tradeValue, setTradeValue] = useState(0);

  const calculatePayment = () => {
    const principal = loanAmount - downPayment - tradeValue;
    const monthlyRate = interestRate / 100 / 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    return payment;
  };

  const monthlyPayment = calculatePayment();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Auto Financing</h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Get pre-approved and calculate your payments with our easy financing tools
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Calculator */}
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Payment Calculator</h2>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Vehicle Price: ${loanAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="5000"
                  max="80000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$5,000</span>
                  <span>$80,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Down Payment: ${downPayment.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="500"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$0</span>
                  <span>$20,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Trade-In Value: ${tradeValue.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="30000"
                  step="1000"
                  value={tradeValue}
                  onChange={(e) => setTradeValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$0</span>
                  <span>$30,000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>2%</span>
                  <span>15%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Loan Term: {loanTerm} months
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value={36}>36 months (3 years)</option>
                  <option value={48}>48 months (4 years)</option>
                  <option value={60}>60 months (5 years)</option>
                  <option value={72}>72 months (6 years)</option>
                  <option value={84}>84 months (7 years)</option>
                </select>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-2xl p-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <DollarSign className="h-8 w-8 text-blue-600 mr-2" />
                    <span className="text-lg font-semibold text-blue-800">Estimated Monthly Payment</span>
                  </div>
                  <div className="text-5xl font-bold text-blue-900 mb-2">
                    ${isNaN(monthlyPayment) ? '0' : monthlyPayment.toFixed(0)}
                  </div>
                  <div className="text-lg text-blue-600">
                    Total financed: ${(loanAmount - downPayment - tradeValue).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Finance Application */}
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="flex items-center mb-8">
              <div className="bg-green-100 p-3 rounded-xl mr-4">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Get Pre-Approved</h2>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income</label>
                  <input
                    type="number"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter annual income"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Status</label>
                  <select className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option>Select status</option>
                    <option>Full-time Employee</option>
                    <option>Part-time Employee</option>
                    <option>Self-employed</option>
                    <option>Student</option>
                    <option>Retired</option>
                    <option>Military</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                  <select className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg">
                    <option>NV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="ZIP"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-lg shadow-lg hover:shadow-xl"
              >
                <CreditCard className="h-6 w-6 mr-3" />
                Apply for Pre-Approval
              </button>
            </form>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Get Pre-Approved?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Know Your Budget</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Get a clear picture of what you can afford before you shop, making the process stress-free</p>
            </div>
            <div className="text-center group">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Negotiate Better</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Pre-approval gives you negotiating power at the dealership and shows you're a serious buyer</p>
            </div>
            <div className="text-center group">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Save Time</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Streamline the buying process with pre-approved financing and drive home faster</p>
            </div>
          </div>
        </div>

        {/* Financing Options */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 via-slate-900 to-green-900 text-white rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Financing Options Available</h2>
            <p className="text-xl text-gray-200">We work with multiple lenders to get you the best rates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">2.9%</div>
              <div className="text-gray-200">Starting APR</div>
              <div className="text-sm text-gray-300 mt-1">For qualified buyers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">84</div>
              <div className="text-gray-200">Max Months</div>
              <div className="text-sm text-gray-300 mt-1">Extended terms available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$0</div>
              <div className="text-gray-200">Down Payment</div>
              <div className="text-sm text-gray-300 mt-1">Options available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">24hr</div>
              <div className="text-gray-200">Approval Time</div>
              <div className="text-sm text-gray-300 mt-1">Fast processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financing;