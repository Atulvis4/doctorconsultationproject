import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient', 
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor', 
  },
  illnessHistory: {
    type: String,
    required: true,
  },
  surgeryDetails: {
    type: String,
  },
  familyMedicalHistory: {
    type: String,
    enum: ['Diabetics', 'Non-Diabetics'], // Radio button options
    required: true,
  },
  allergies: {
    type: String,
  },
  others: {
    type: String,
  },
}, {
  timestamps: true, // Automatically adds `createdAt` and `updatedAt`
});

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;
