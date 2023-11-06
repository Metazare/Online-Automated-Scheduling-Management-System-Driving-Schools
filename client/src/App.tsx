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
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* public */}
        <Route element={<BaseLayout />} >
          <Route path="/" element={<LandingPage/>} />
        </Route>

        {/* users */}
        <Route element={<BaseLayout />} >
          <Route path="/courses/lesson" element={<LessonView/>} />
        </Route>
        {/* student */}
        <Route element={<BaseLayout />} >
          <Route path="/home" element={<Home/>} />
          <Route path="/school" element={<School/>} />
          <Route path="/courses" element={<CoursesList/>} />

        </Route>
        {/* admin */}
        <Route element={<BaseLayout />} >
          <Route path="" element={<Home/>} />
          <Route path="admin/school" element={<ManageSchool/>} />
        </Route>





      </Routes>
    </ThemeProvider>

  );
}

export default App;
