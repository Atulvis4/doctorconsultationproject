import express from 'express';
import {
  createPrescription,
  getPrescriptionsForDoctor,
  getPrescriptionsForPatient,
  updatePrescription 
} from '../controllers/prescriptionController.js';

const router = express.Router();

router.post('/submitpresciption', createPrescription);

router.get('/doctor/:doctorId', getPrescriptionsForDoctor);

// PUT: Update a prescription
router.put('/:id', updatePrescription);

router.get('/patient/:patientId', getPrescriptionsForPatient);

export default router;
