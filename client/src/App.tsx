import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home';
import BaseLayout from './Layouts/BaseLayout/BaseLayout';

import RegisterAdmin from './Test/RegisterAdmin';
import RegisterInstructor from './Test/RegisterInstructor';
import RegisterStudent from './Test/RegisterStudent';
import Logout from './Test/Logout';
import AddCourse from './Test/AddCourse';
import EnrollStudent from './Test/EnrollStudent';
import EnrollGet from './Test/EnrollGet';
import AppointmentCreate from './Test/AppointmentCreate';


const theme = createTheme({
  palette:{
    primary: {
      main:'#E24B5B',
    },
    secondary:{
      main:'#2F2E5A',
      dark:'#1C1B45'
    }
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route element={<BaseLayout />} >
          <Route path="/" element={<Home/>} />
        </Route>

        {/* Test Routes */}
        <Route path="/test">
          <Route path="registeradmin" element={<RegisterAdmin/>}/>
          <Route path="registerstudent" element={<RegisterStudent/>}/>
          <Route path="registerinstructor" element={<RegisterInstructor/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="logout" element={<Logout/>} />
          <Route path="addcourse" element={<AddCourse/>} />
          <Route path="enrollstudent" element={<EnrollStudent/>} />
          <Route path="enrollget" element={<EnrollGet/>} />
          <Route path="appointmentcreate" element={<AppointmentCreate/>} />
        </Route>
    </Routes>
    </ThemeProvider>
  );
}

export default App;
