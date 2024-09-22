// models/patient.js
import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  surgeryHistory: { type: String, required: true },
  illnessHistory: { type: String, required: true },
  // profilePic: { type: String, required: true },
  password: { type: String, required: true },
});

const Patient = mongoose.model('Patient', PatientSchema);

export default Patient;
