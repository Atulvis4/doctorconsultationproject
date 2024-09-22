import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // To get patientId from Redux
import axios from 'axios';
import PatientNavbar from '../../components/PatientNavbar';

function MyConsultation() {
  const [consultations, setConsultations] = useState([]);
  const [doctors, setDoctors] = useState({}); // Store doctor details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get patientId from Redux store
  const patientId = useSelector((state) => state.user.patientId);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/consultdoctor/consultations/${patientId}`);
        const consultationsData = response.data;

        setConsultations(consultationsData);

        // Fetch doctor details
        const doctorIds = consultationsData.map(consultation => consultation.doctorId);
        const uniqueDoctorIds = [...new Set(doctorIds)]; // Get unique doctor IDs
        const doctorPromises = uniqueDoctorIds.map(id => axios.get(`http://localhost:5000/api/consultdoctor/doctors/${id}`));
        
        const doctorResponses = await Promise.all(doctorPromises);
        const doctorData = doctorResponses.reduce((acc, curr) => {
          acc[curr.data._id] = curr.data.name; // Store doctor name by ID
          return acc;
        }, {});
        
        setDoctors(doctorData);
      } catch (error) {
        console.error('Error fetching consultations:', error);
        setError('Failed to fetch consultations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchConsultations();
    }
  }, [patientId]);

  return (
    <div className="flex">
      <PatientNavbar />
      <div className="p-8 w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-8">My Consultations</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : consultations.length === 0 ? (
          <p>No consultations found.</p>
        ) : (
          <ul>
            {consultations.map((consultation) => (
              <li key={consultation._id} className="border-b py-4">
                <h2 className="text-xl font-semibold">
                  Consultation with {doctors[consultation.doctorId] || 'Loading...'}
                </h2>
                <p>Illness History: {consultation.illnessHistory}</p>
                <p>Family Medical History: {consultation.familyMedicalHistory}</p>
                <p>Allergies: {consultation.allergies}</p>
                {/* Add more fields as necessary */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyConsultation;
