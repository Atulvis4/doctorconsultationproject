import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const StartingPage = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuButtonRef = useRef(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar with Dropdown */}
      <div className="relative bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-green-600 font-bold text-2xl">Healthcare Platform</h1>
        <div className="relative">
          <button
            ref={menuButtonRef}
            className="p-2 bg-green-500 text-white font-semibold rounded-md"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Menu
          </button>
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48"
              style={{ zIndex: 1000 }}
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-green-600">Doctor</h2>
                <button
                  onClick={() => navigate('/doctorlogin')}
                  className="block text-green-600 hover:text-green-800 mt-2 transition duration-300"
                >
                  Doctor Login
                </button>
                <button
                  onClick={() => navigate('/doctorsignup')}
                  className="block text-green-600 hover:text-green-800 mt-2 transition duration-300"
                >
                  Doctor Sign Up
                </button>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-green-600">Patient</h2>
                <button
                  onClick={() => navigate('/patientlogin')}
                  className="block text-green-600 hover:text-green-800 mt-2 transition duration-300"
                >
                  Patient Login
                </button>
                <button
                  onClick={() => navigate('/patientsignup')}
                  className="block text-green-600 hover:text-green-800 mt-2 transition duration-300"
                >
                  Patient Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-green-600 mb-6">Get Started with Us</h1>
          <p className="text-lg text-gray-700">
            Sign up for the best healthcare and consultation platform. Whether you're a doctor looking to provide
            excellent care or a patient seeking reliable consultation, we have the perfect solution for you.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Experience easy and accessible healthcare like never before. Join us today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartingPage;
