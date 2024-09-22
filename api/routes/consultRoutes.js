import express from 'express';
import { getDoctors } from '../controllers/consultDoctor.js';
import { saveConsultation, getConsultationsForPatient, getConsultationsForDoctor  } from '../controllers/consultationController.js';
import { getDoctorById } from '../controllers/consultDoctor.js'; // Import the new controller function

const router = express.Router();

// Route to fetch all doctors
router.get('/consult', getDoctors);

// Route to save a consultation
router.post('/consultationform', saveConsultation);

// Route to fetch consultations for a patient
router.get('/consultations/:patientId', getConsultationsForPatient);

// Route to fetch doctor details by ID
router.get('/doctors/:id', getDoctorById);

//Route to view the confultationforms filled by patients to the doctor
router.get('/doctor/consultations/:doctorId', getConsultationsForDoctor);

export default router;
