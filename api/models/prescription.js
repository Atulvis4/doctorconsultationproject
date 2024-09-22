import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  consultationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Consultation', 
    required: true 
  },
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  medicine: { 
    type: String, 
    required: true 
  },
  care: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
}, {
  timestamps: true
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;
