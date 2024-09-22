import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorSignup from './pages/doctor/DoctorSignup';
import PatienLogin from './pages/patient/PatienLogin';
import PatientSignup from './pages/patient/PatientSignup';
import StartingPage from './pages/StartingPage';
import PatientProfile from './pages/patient/PatientProfile';
import MyConsultation from './pages/patient/MyConsultation';
import MyPrescription from './pages/patient/ViewPrescriptionsPatient';
import ViewPatients from './pages/doctor/ViewPatients';
import ViewPrescriptionDoctor from './pages/doctor/ViewPresciptionDoctor';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path = "/" element = {<StartingPage/>}/>
    <Route path = "/doctorlogin" element = {<DoctorLogin/>}/>
    <Route path = "/doctorsignup" element = {<DoctorSignup/>}/>
    <Route path = "/patientlogin" element = {<PatienLogin/>}/>
    <Route path = "/patientsignup" element = {<PatientSignup/>}/>
    <Route path = "/patientprofile" element = {<PatientProfile/>}/>
    <Route path="/patientconsultation" element={<MyConsultation />} />
    <Route path="/patientprescription" element={<MyPrescription />} />
    <Route path="/viewpatients" element={<ViewPatients />} />
    <Route path="/viewprescriptiondoctor" element={<ViewPrescriptionDoctor />} />

    </Routes>

    </BrowserRouter>
  )
}

export default App
