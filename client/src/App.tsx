import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Pages
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/User/Home';
import BaseLayout from './Layouts/BaseLayout/BaseLayout';
import School from './Pages/User/School/School'
import LessonView from './Pages/User/School/LessonView';
import CoursesList from './Pages/User/School/CourseList'
import ManageSchool from './Pages/Admin/School/ManageSchool';
import Error from './Pages/Error';
// Hooks
import { ProtectedRoute } from './Hooks/useAuth';
import { type } from 'os';

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

type Props={
  openSnackbar: {
    severity: string ;
    note: string;
  } 
  setOpenSnackbar:React.Dispatch<React.SetStateAction<{
      severity: string;
      note: string;
  }>>
}


function App({openSnackbar,setOpenSnackbar}:Props) {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="*" element={<Error/>} />
        <Route element={<BaseLayout />} >

          {/* public */}
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar}/>} />
          <Route path="/" element={<LandingPage/>} />
          
          {/* admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "instructor"]}/>}>
            <Route path="" element={<Home/>} />
            <Route path="dashboard" element={<ManageSchool/>} />
          </Route>

          {/* student */}
          <Route element={<ProtectedRoute allowedRoles={["student"]}/>}>
            <Route path="/home" element={<Home/>} />
            <Route path="/school/:id" element={<School/>} />
            <Route path="/course/:id" element={<CoursesList/>} />
          </Route>

          {/* users */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "student", "instructor"]}/>}>
            <Route path="/course/:cid/:lid" element={<LessonView/>} />
          </Route>

        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
