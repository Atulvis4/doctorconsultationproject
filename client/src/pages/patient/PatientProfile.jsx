import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import axios from 'axios'; // Import axios
import ConsultationForm from '../../components/ConsultationForm';
import PatientNavbar from '../../components/PatientNavbar'; // Import PatientNavbar

function PatientProfile() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to track the selected doctor
  const [isConsultFormOpen, setConsultFormOpen] = useState(false); // State to track form visibility

  // Get patientId from Redux store
  const patientId = useSelector((state) => state.user.patientId);

  useEffect(() => {
    // Fetch doctors from the API using axios
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/consultdoctor/consult');
        setDoctors(response.data); // Update state with fetched doctors
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Function to open the consultation form
  const handleConsultClick = (doctor) => {
    setSelectedDoctor(doctor);
    setConsultFormOpen(true);
  };

  // Function to close the consultation form
  const handleCloseForm = () => {
    setConsultFormOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="flex">
      <PatientNavbar /> {/* Include the PatientNavbar here */}
      <div className="min-h-screen bg-gray-100 p-8 flex-1">
        <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">Welcome to Your Profile</h1>
        
        {patientId ? (
          <>
            <h2 className="text-2xl text-gray-700 mb-6 text-center">Available Doctors for Consultation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-green-600">{doctor.name}</h3>
                    <p className="text-gray-700 mt-2">Specialty: {doctor.specialty}</p>
                    <p className="text-gray-700 mt-2">Experience: {doctor.experience} years</p>
                    <p className="text-gray-700 mt-2">Contact: {doctor.email}</p>
                    <p className="text-gray-700 mt-2">Phone: {doctor.phone}</p>
                  </div>
                  <button
                    className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                    onClick={() => handleConsultClick(doctor)} // Pass the selected doctor to the handler
                  >
                    Consult
                  </button>
                </div>
              ))}
            </div>

            {/* Consultation Form Modal */}
            {isConsultFormOpen && (
              <ConsultationForm
                doctor={selectedDoctor} // Pass the selected doctor to the form
                patientId={patientId} // Pass patientId to the form
                onClose={handleCloseForm} // Close form handler
              />
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl text-red-600">Patient ID is not available. Please log in again.</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientProfile;
