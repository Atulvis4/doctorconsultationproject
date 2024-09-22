// ViewPrescriptionsPatient.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PatientNavbar from '../../components/PatientNavbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF autotable for table formatting

const ViewPrescriptionsPatient = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get patientId from Redux (assuming it's stored after login)
  const patientId = useSelector((state) => state.user.patientId);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/prescriptions/patient/${patientId}`);
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
        setError('Failed to fetch prescriptions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPrescriptions();
    }
  }, [patientId]);

  // Function to generate PDF in table format
  const handleDownloadPDF = (prescription) => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(16);
    doc.text('Prescription', 20, 20);

    // Prepare table data
    const tableData = [
      ['Doctor', prescription.doctorId.name],
      ['Specialty', prescription.doctorId.specialty],
      ['Medicine', prescription.medicine],
      ['Care Instructions', prescription.care],
      ['Consultation ID', prescription.consultationId._id],
      ['Date', new Date(prescription.createdAt).toLocaleDateString()],
    ];

    // Add table to the PDF
    doc.autoTable({
      head: [['Field', 'Details']], // Table headings
      body: tableData,              // Table content
      startY: 30,                   // Start after the title
      theme: 'grid',                // Table styling
    });

    // Save the PDF
    doc.save(`Prescription_${prescription._id}.pdf`);
  };

  return (
    <div className="flex">
      <PatientNavbar />
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
                <h2 className="text-xl font-bold mb-4">Doctor: {prescription.doctorId.name}</h2>
                <p className="text-gray-700">Specialty: {prescription.doctorId.specialty}</p>
                <p className="text-gray-700">Medicine: {prescription.medicine}</p>
                <p className="text-gray-700">Care Instructions: {prescription.care}</p>
                <p className="text-gray-500 text-sm">Consultation ID: {prescription.consultationId._id}</p>

                <button
                  className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  onClick={() => handleDownloadPDF(prescription)}
                >
                  Download Prescription
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPrescriptionsPatient;
