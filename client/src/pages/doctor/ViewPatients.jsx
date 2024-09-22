import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DoctorNavbar from '../../components/DoctorNavbar';
import Popup from '../../components/Popup';

const ViewPatients = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prescriptionOpen, setPrescriptionOpen] = useState(null);
  const [medicine, setMedicine] = useState('');
  const [care, setCare] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Get doctorId from Redux
  const doctorId = useSelector((state) => state.user.doctorId);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/consultdoctor/doctor/consultations/${doctorId}`
        );
        setConsultations(response.data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
        setError('Failed to fetch consultations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, [doctorId]);

  const handlePrescribe = (consultationId) => {
    // Toggle the form for the selected consultation
    setPrescriptionOpen(consultationId);
    
  };

  const handleSubmitPrescription = async (consultationId, patientId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/prescriptions/submitpresciption`,
        {
          consultationId,
          patientId,   // Add patientId to the request payload
          doctorId,
          medicine,
          care,
        }
      );
      console.log(response)

      // Show success popup
      setPopupMessage('Prescription sent successfully!');
      setShowPopup(true);

      console.log('Prescription response:', response.data);
      setPrescriptionOpen(null); // Close the form after submission
      setMedicine(''); // Clear the form
      setCare('');
    } catch (error) {
      console.error('Error sending prescription:', error);
      setPopupMessage('Error sending prescription. Please try again.');
      setShowPopup(true); // Show error popup
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close popup
  };

  return (
    <div className="flex">
      <DoctorNavbar />
      <div className="p-8 w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-8">My Patients</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : consultations.length === 0 ? (
          <p>No consultations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultations.map((consultation) => (
              <div key={consultation._id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                  Patient: {consultation.patientId.name}
                </h2>
                <p className="text-gray-700">
                  Illness History: {consultation.illnessHistory}
                </p>
                <p className="text-gray-700">
                  Family Medical History: {consultation.familyMedicalHistory}
                </p>
                <p className="text-gray-700">Allergies: {consultation.allergies}</p>

                {/* Prescription button */}
                <button
                  className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                  onClick={() => handlePrescribe(consultation._id)}
                >
                  Prescribe
                </button>

                {/* Prescription Form */}
                {prescriptionOpen === consultation._id && (
                  <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold mb-4">Prescription Form</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Medicine</label>
                      <input
                        type="text"
                        value={medicine}
                        onChange={(e) => setMedicine(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the medicine"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Care to be taken</label>
                      <input
                        type="text"
                        value={care}
                        onChange={(e) => setCare(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the care instructions"
                      />
                    </div>
                    <button
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                      onClick={() => handleSubmitPrescription(consultation._id, consultation.patientId._id)} // Pass patientId
                    >
                      Send Prescription
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Popup Component */}
        {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
      </div>
    </div>
  );
};

export default ViewPatients;
