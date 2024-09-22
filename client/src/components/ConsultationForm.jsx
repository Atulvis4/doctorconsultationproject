import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup'; // Import the Popup component

const ConsultationForm = ({ doctor, patientId, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    illnessHistory: '',
    surgeryDetails: '',
    familyMedicalHistory: '',
    allergies: '',
    others: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successPopup, setSuccessPopup] = useState(false); // State for success popup

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      patientId, // Using the patientId passed as a prop
      doctorId: doctor?._id, // Assuming doctor._id exists
      illnessHistory: formData.illnessHistory,
      surgeryDetails: formData.surgeryDetails,
      familyMedicalHistory: formData.familyMedicalHistory,
      allergies: formData.allergies,
      others: formData.others
    };
    
    console.log('Form payload:', payload);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/consultdoctor/consultationform',
        payload
      );
      console.log('Form submitted successfully:', response.data);
      setSuccessPopup(true); // Show success popup
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response?.data?.message || 'Failed to submit the consultation form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setSuccessPopup(false); // Close the success popup
    onClose(); // Optionally close the form as well
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Consultation Form</h2>
        <p className="text-gray-700 mb-4">Consulting with: {doctor?.name}</p> {/* Display selected doctor */}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <label className="block mb-2 font-bold">Current Illness History</label>
              <textarea
                name="illnessHistory"
                value={formData.illnessHistory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <label className="block mb-2 font-bold">Recent Surgery (Time Span)</label>
              <input
                type="text"
                name="surgeryDetails"
                value={formData.surgeryDetails}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <label className="block mb-2 font-bold">Family Medical History</label>
              <div className="mb-4">
                <input
                  type="radio"
                  name="familyMedicalHistory"
                  value="Diabetics"
                  onChange={handleChange}
                  checked={formData.familyMedicalHistory === 'Diabetics'}
                />
                <label className="ml-2">Diabetics</label>
                <input
                  type="radio"
                  name="familyMedicalHistory"
                  value="Non-Diabetics"
                  onChange={handleChange}
                  className="ml-4"
                  checked={formData.familyMedicalHistory === 'Non-Diabetics'}
                />
                <label className="ml-2">Non-Diabetics</label>
              </div>
              <label className="block mb-2 font-bold">Any Allergies</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <label className="block mb-2 font-bold">Others</label>
              <input
                type="text"
                name="others"
                value={formData.others}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </>
          )}
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Success Popup */}
        {successPopup && (
          <Popup
            message="Consultation form submitted successfully!"
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};

export default ConsultationForm;
