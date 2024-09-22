import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setDoctorId } from '../../redux/userSlice'; // Adjust the path as necessary

function DoctorSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Create FormData to include both text inputs and the profile picture
    const formData = new FormData();
    // formData.append('profilePic', profilePic); // Append profile picture if needed
    formData.append('name', name);
    formData.append('specialty', specialty);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('experience', experience);
    formData.append('password', password);

    try {
      // Perform signup logic by making an API call to your backend
      const response = await axios.post('http://localhost:5000/api/auth/doctor/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'multipart/form-data', // Required if sending FormData with a file
        },
      });

      // Handle successful signup (e.g., redirect or show success message)
      dispatch(setDoctorId(response.data.doctorId));
      console.log('Signup successful:', response.data);

      // Redirect to the ViewPatients page after successful signup
      alert('Signup successful!');
      navigate('/viewpatients'); // Redirect to ViewPatients page

    } catch (error) {
      // Handle error during signup (e.g., display error message)
      console.error('Signup error:', error);
      alert('Error during signup. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Doctor Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 2 Column Grid for Inputs */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Specialty</label>
              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your specialty"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
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
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your years of experience"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {/* Submit Button (Full Width) */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 text-sm mt-2">
          <span>Already have an account?</span>
          <Link to="/doctorlogin" className=" text-blue-500 ">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorSignup;
