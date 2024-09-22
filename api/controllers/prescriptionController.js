import Prescription from '../models/prescription.js';
import mongoose from 'mongoose';

// Controller to submit a new prescription
export const createPrescription = async (req, res) => {
  const { consultationId, doctorId, patientId, medicine, care } = req.body;

  // Validate input
  if (!consultationId || !doctorId || !patientId || !medicine || !care) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Create new prescription
    const newPrescription = new Prescription({
      consultationId,
      doctorId,
      patientId,
      medicine,
      care,
    });

    // Save prescription to the database
    await newPrescription.save();

    // Send success response
    res.status(201).json({ message: 'Prescription created successfully.', prescription: newPrescription });
  } catch (error) {
    console.error('Error saving prescription:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Controller to fetch all prescriptions for a doctor
export const getPrescriptionsForDoctor = async (req, res) => {
    const { doctorId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ error: 'Invalid doctorId' });
    }
  
    try {
      // Fetch prescriptions and populate consultationId and patientId
      const prescriptions = await Prescription.find({ doctorId })
        .populate({
          path: 'consultationId',
          populate: {
            path: 'patientId', // Populate patientId inside consultationId
            model: 'Patient',  // Ensure it's referencing the correct Patient model
            select: 'name email', // Select fields to show for patient (e.g., name, email)
          },
        });
  
      if (!prescriptions) {
        return res.status(404).json({ error: 'No prescriptions found for this doctor' });
      }
  
      res.status(200).json(prescriptions);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      res.status(500).json({ error: 'Server error fetching prescriptions' });
    }
  };
  

// Update a prescription
export const updatePrescription = async (req, res) => {
    const { id } = req.params;
    const { medicine, care } = req.body;
  
    try {
      const prescription = await Prescription.findById(id);
      if (!prescription) {
        return res.status(404).json({ message: 'Prescription not found.' });
      }
  
      // Update prescription fields
      prescription.medicine = medicine || prescription.medicine;
      prescription.care = care || prescription.care;
  
      await prescription.save();
      res.status(200).json({ message: 'Prescription updated successfully.', prescription });
    } catch (error) {
      console.error('Error updating prescription:', error);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  };

// Controller to fetch all prescriptions for a patient
export const getPrescriptionsForPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const prescriptions = await Prescription.find({ patientId })
      .populate('doctorId', 'name specialty')
      .populate('consultationId');

    if (!prescriptions.length) {
      return res.status(404).json({ message: 'No prescriptions found for this patient.' });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
