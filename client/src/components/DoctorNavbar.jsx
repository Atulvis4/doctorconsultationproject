import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const DoctorNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    // dispatch(clearUser()); // This clears the user info from the Redux store

 
    navigate('/');
  };


  return (
    <nav className="bg-gray-200 text-gray-800 h-screen w-64 shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-600">My Dashboard</h1>
        <ul>
          <li className="mb-2">
            <Link to="/viewpatients" className="block p-2 hover:bg-green-300 rounded">
              View Patients
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/viewprescriptiondoctor" className="block p-2 hover:bg-green-300 rounded">
              Prescriptions
            </Link>
          </li>
          <li className="mb-2">
          <button 
              onClick={handleLogout}
              className="block p-2 hover:bg-green-300 rounded w-full text-left">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
