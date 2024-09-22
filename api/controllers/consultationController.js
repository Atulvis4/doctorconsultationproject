import Consultation from '../models/consultationModel.js';

// @desc    Save consultation form data
// @route   POST /api/consultation
// @access  Public (You might want to make this protected later)
export const saveConsultation = async (req, res) => {
  const { patientId, doctorId, illnessHistory, surgeryDetails, familyMedicalHistory, allergies, others } = req.body;

  // Log the incoming data for debugging
  console.log('Received consultation data:', {
    patientId,
    doctorId,
    illnessHistory,
    surgeryDetails,
    familyMedicalHistory,
    allergies,
    others,
  });

  try {
    // Validate required fields
    if (!patientId || !doctorId || !illnessHistory || !familyMedicalHistory) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create a new consultation document
    const consultation = new Consultation({
      patientId,
      doctorId,
      illnessHistory,
      surgeryDetails,
      familyMedicalHistory,
      allergies,
      others,
    });

    // Save to the database
    await consultation.save();  // Save the data but don’t return it in the response

    // Send success message
    res.status(201).json({ message: 'Consultation form submitted successfully' });
  } catch (error) {
    // Log the error for debugging
    console.error('Error saving consultation:', error.message);

    res.status(500).json({ message: 'Server error: Unable to save consultation data' });
  }
};


//api for showing all the consultationforms filled by the patient in patient section.

export const getConsultationsForPatient = async (req, res) => {
    const { patientId } = req.params;
  
    try {
      const consultations = await Consultation.find({ patientId });
      res.status(200).json(consultations);
    } catch (error) {
      console.error('Error fetching consultations:', error);
      res.status(500).json({ message: 'Server error: Unable to fetch consultations' });
    }
  };

  //api for showing consultation form filled by patients to the doctor.(viewconsultationpage)
export const getConsultationsForDoctor = async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const consultations = await Consultation.find({ doctorId }).populate('patientId');
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch consultations for the doctor.' });
    }
  };
  




