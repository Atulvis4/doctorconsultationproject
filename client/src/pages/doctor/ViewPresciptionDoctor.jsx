// ViewPrescriptionDoctor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DoctorNavbar from '../../components/DoctorNavbar'; // Assuming you have a DoctorNavbar component
import Popup from '../../components/Popup'; // Assuming Popup is available

const ViewPrescriptionDoctor = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPrescriptionId, setEditPrescriptionId] = useState(null); // To track which prescription is being edited
  const [medicine, setMedicine] = useState('');
  const [care, setCare] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // Get doctorId from Redux (you should have it stored after login)
  const doctorId = useSelector((state) => state.user.doctorId);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/prescriptions/doctor/${doctorId}`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setError('Failed to fetch prescriptions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [doctorId]);

  const handleEdit = (prescriptionId, currentMedicine, currentCare) => {
    setEditPrescriptionId(prescriptionId);
    setMedicine(currentMedicine || '');  // Ensure default empty string
    setCare(currentCare || '');          // Ensure default empty string
  };

  const handleSubmitEdit = async (prescriptionId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/prescriptions/${prescriptionId}`, {
        medicine,
        care,
      });

      setPopupMessage('Prescription updated successfully!');
      setShowPopup(true);

      // Update the local state after successful edit
      setPrescriptions((prevPrescriptions) =>
        prevPrescriptions.map((prescription) =>
          prescription._id === prescriptionId ? { ...prescription, medicine, care } : prescription
        )
      );

      setEditPrescriptionId(null); // Close the edit form
    } catch (error) {
      console.error('Error updating prescription:', error);
      setPopupMessage('Error updating prescription. Please try again.');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex">
      <DoctorNavbar />
      <div className="p-8 w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-8">My Prescriptions</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : prescriptions.length === 0 ? (
          <p>No prescriptions found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prescriptions.map((prescription) => (
              <div key={prescription._id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">ConsultationID: {prescription.consultationId?._id}</h2>
                <p className="text-gray-700">Patient: {prescription.consultationId?.patientId?.name || 'Unknown Patient'}</p>
                <p className="text-gray-700">Medicine: {prescription.medicine}</p>
                <p className="text-gray-700">Care: {prescription.care}</p>

                <button
                  className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  onClick={() => handleEdit(prescription._id, prescription.medicine, prescription.care)}
                >
                  Edit Prescription
                </button>

               {/* Edit Prescription Form */}
{editPrescriptionId === prescription._id && (
  <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
    <h3 className="text-lg font-semibold mb-4">Edit Prescription</h3>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Medicine</label>
      <input
        type="text"
        value={medicine} // Make sure this is set correctly to the state variable
        onChange={(e) => setMedicine(e.target.value)} // Ensure the value updates here
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter the updated medicine"
      />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Care to be taken</label>
      <input
        type="text"
        value={care} // Controlled input for care
        onChange={(e) => setCare(e.target.value)} // This should correctly update the care state
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter the updated care instructions"
      />
    </div>
    <button
      className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
      onClick={() => handleSubmitEdit(prescription._id)} // Ensure this submits the changes
    >
      Save Changes
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

export default ViewPrescriptionDoctor;
