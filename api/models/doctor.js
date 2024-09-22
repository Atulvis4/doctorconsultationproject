// models/doctor.js
import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  experience: { type: Number, required: true },
  // profilePic: { type: String, required: true },
  password: { type: String, required: true },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;
