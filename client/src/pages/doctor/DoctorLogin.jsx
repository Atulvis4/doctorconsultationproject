import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDoctorId } from '../../redux/userSlice'; // Adjust the path as necessary

function DoctorLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate for redirecting
  // State to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
        type: 'doctor', // Ensure you are logging in as a doctor
      });

      // Save token to localStorage or sessionStorage
      localStorage.setItem('token', response.data.token);
      
      // Dispatch doctorId to Redux store
      dispatch(setDoctorId(response.data.doctorId));

      // Navigate to ViewPatients page after successful login
      alert('Login successful!');
      navigate('/viewpatients'); // Redirect to ViewPatients page

    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid login credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Doctor Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Login
          </button>
        </form>
        {error && <p>{error}</p>}
        <div className="flex gap-2 text-sm mt-2">
          <span>Don't have an account?</span>
          <Link to="/doctorsignup" className=" text-blue-500 ">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
