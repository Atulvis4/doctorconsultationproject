// app.js
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import consultRoutes from './routes/consultRoutes.js';
import prescriptionRoutes from './routes/presciptions.js'

dotenv.config();

const app = express();

// Connect to DB
connectDB();


// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your React frontend
    credentials: true, // If you need to send cookies or authentication headers
  }));
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/consultdoctor', consultRoutes);
app.use('/api/prescriptions', prescriptionRoutes); // Register prescription routes



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
