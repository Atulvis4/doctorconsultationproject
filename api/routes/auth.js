// routes/auth.js
import express from 'express';
import { doctorSignup, patientSignup, login } from '../controllers/authcontroller.js';

const router = express.Router();

// Doctor signup
router.post('/doctor/signup',  doctorSignup);

// Patient signup
router.post('/patient/signup',   patientSignup);     
// upload.single('profilePic'),

// Login route
router.post('/login', login);

export default router;
