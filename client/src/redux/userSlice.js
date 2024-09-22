//  src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    doctorId: null,
    patientId: null,
  },
  reducers: {
    setDoctorId: (state, action) => {
      state.doctorId = action.payload;
    },
    setPatientId: (state, action) => {
      state.patientId = action.payload;
    },
    clearUser: (state) => {
      state.doctorId = null;
      state.patientId = null;
    },
  },
});

export const { setDoctorId, setPatientId, clearUser } = userSlice.actions;

export default userSlice.reducer;
