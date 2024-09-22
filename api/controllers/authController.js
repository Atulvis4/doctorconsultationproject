import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Doctor from '../models/doctor.js';
import Patient from '../models/patient.js';

// Helper function to generate JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Doctor Signup
export const doctorSignup = async (req, res) => {
  const { name, specialty, email, phone, experience, password } = req.body;
  console.log(req.body);

  try {
    // Validate request data
    if (!name || !specialty || !email || !phone || !experience || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ msg: 'Doctor already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new doctor
    const newDoctor = new Doctor({
      name,
      specialty,
      email,
      phone,
      experience,
      password: hashedPassword,
    });

    await newDoctor.save();

    // Generate JWT
    const payload = { userId: newDoctor.id, type: 'doctor' };
    const token = generateToken(payload);

    // Send doctorId in response
    res.status(201).json({
      token,
      doctorId: newDoctor.id, // Send doctorId
      msg: 'Doctor registered successfully'
    });
  } catch (err) {
    console.error(`Doctor signup error: ${err.message}`);
    res.status(500).json({ msg: 'Server error during doctor signup' });
  }
};

// Patient Signup 
export const patientSignup = async (req, res) => {
  const { name, email, phone, surgeryHistory, illnessHistory, password } = req.body;
  console.log(req.body);

  try {
    // Validate request data
    if (!name || !email || !phone || !surgeryHistory || !illnessHistory || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ msg: 'Patient already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new patient
    const newPatient = new Patient({
      name,
      email,
      phone,
      surgeryHistory,
      illnessHistory,
      password: hashedPassword,
    });

    await newPatient.save();

    // Generate JWT
    const payload = { userId: newPatient.id, type: 'patient' };
    const token = generateToken(payload);

    // Send response with patient ID
    res.status(201).json({ token, msg: 'Patient registered successfully', patientId: newPatient.id });
  } catch (err) {
    console.error(`Patient signup error: ${err.message}`);
    res.status(500).json({ msg: 'Server error during patient signup' });
  }
};


// Login 
export const login = async (req, res) => {
  const { email, password, type } = req.body;

  try {
    // Validate request data
    if (!email || !password || !type) {
      return res.status(400).json({ msg: 'Email, password, and user type are required' });
    }

    let user;
    if (type === 'doctor') {
      user = await Doctor.findOne({ email });
    } else if (type === 'patient') {
      user = await Patient.findOne({ email });
    } else {
      return res.status(400).json({ msg: 'Invalid user type' });
    }

    // Check if user exists
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = { userId: user.id, type };
    const token = generateToken(payload);

    // Send response with user ID based on type
    if (type === 'doctor') {
      res.json({ token, msg: 'Login successful', doctorId: user.id });
    } else if (type === 'patient') {
      res.json({ token, msg: 'Login successful', patientId: user.id });
    }
  } catch (err) {
    console.error(`Login error: ${err.message}`);
    res.status(500).json({ msg: 'Server error during login' });
  }
};
