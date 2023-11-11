import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/User/Home';
import BaseLayout from './Layouts/BaseLayout/BaseLayout';
import School from './Pages/User/School/School'
import LessonView from './Pages/User/School/LessonView';
import CoursesList from './Pages/User/School/CourseList'

//Test Routes
import RegisterAdmin from './Test/RegisterAdmin';
import RegisterInstructor from './Test/RegisterInstructor';
import RegisterStudent from './Test/RegisterStudent';
import Logout from './Test/Logout';
import AddCourse from './Test/AddCourse';
import EnrollStudent from './Test/EnrollStudent';
import EnrollGet from './Test/EnrollGet';
// import AppointmentCreate from './Test/AppointmentCreate';

import ManageSchool from './Pages/Admin/School/ManageSchool';

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

        {/* public */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route element={<BaseLayout />} >
          <Route path="/" element={<LandingPage/>} />
        </Route>

        {/* admin */}
        <Route element={<BaseLayout />} >
          <Route path="" element={<Home/>} />
          <Route path="dashboard" element={<ManageSchool/>} />
        </Route>

        {/* users */}
        <Route element={<BaseLayout />} >
          <Route path="/courses/lesson" element={<LessonView/>} />
          <Route path="/course/:cid/:lid" element={<LessonView/>} />
        </Route>

        {/* student */}
        <Route element={<BaseLayout />} >
          <Route path="/home" element={<Home/>} />
          <Route path="/school/:id" element={<School/>} />
          <Route path="/courses" element={<CoursesList/>} />
        </Route>

        {/* test */}
        <Route path="/test">
          <Route path="registeradmin" element={<RegisterAdmin/>}/>
          <Route path="registerstudent" element={<RegisterStudent/>}/>
          <Route path="registerinstructor" element={<RegisterInstructor/>}/>
          <Route path="logout" element={<Logout/>} />
          <Route path="addcourse" element={<AddCourse/>} />
          <Route path="enrollstudent" element={<EnrollStudent/>} />
          <Route path="enrollget" element={<EnrollGet/>} />
          {/* <Route path="appointmentcreate" element={<AppointmentCreate/>} /> */}
        </Route>

      </Routes>
    </ThemeProvider>
  );
}

export default App;
