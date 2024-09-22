import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch } from 'react-redux'; // Import useDispatch
import axios from 'axios';
import { setPatientId } from '../../redux/userSlice'; // Import the setPatientId action

function PatientSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [surgeryHistory, setSurgeryHistory] = useState('');
  const [illnessHistory, setIllnessHistory] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/patient/signup', {
        name,
        email,
        phone,
        surgeryHistory,
        illnessHistory,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Assuming the backend sends the patientId in response
      const { patientId, token } = response.data;

      // Store patientId in Redux
      dispatch(setPatientId(patientId));

      // Save token to localStorage (if needed)
      localStorage.setItem('token', token);

      // Navigate to patient profile page
      navigate('/patientprofile')
    } catch (error) {
      console.error('Signup error:', error);
      alert('Error during signup. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Patient Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">History Of Surgery</label>
              <input
                type="text"
                value={surgeryHistory}
                onChange={(e) => setSurgeryHistory(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter your Surgery History"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">History Of Illness</label>
              <input
                type="text"
                value={illnessHistory}
                onChange={(e) => setIllnessHistory(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter your Illness History"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 text-sm mt-2">
          <span>Already have an account?</span>
          <Link to="/patientlogin" className="text-blue-500">Log-In</Link>
        </div>
      </div>
    </div>
  );
}

export default PatientSignup;
