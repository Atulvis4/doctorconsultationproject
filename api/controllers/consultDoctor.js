// Import the Doctor model
import Doctor from '../models/doctor.js';

// @desc    Fetch all doctors
// @route   GET /api/doctors
// @access  Public
export const getDoctors = async (req, res) => {
  try {
    // Fetch all doctors from the database
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    // Handle any errors that occur during fetching
    console.error(error.message);
    res.status(500).json({
      message: 'Server Error: Unable to fetch doctors.',
      error: error.message,
    });
  }
};


export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
