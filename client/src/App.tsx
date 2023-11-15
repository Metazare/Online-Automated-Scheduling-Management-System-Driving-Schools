import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import io from 'socket.io-client';

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
import Chat from './Pages/User/Chat';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

// Hooks
import { ProtectedRoute } from './Hooks/useAuth';
import { type } from 'os';

// Test
import TestNotification from './Test/TestNotification';
import TestChat from './Test/TestChat';

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

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');


type Props = {
  openSnackbar: {
    severity: AlertColor;
    note: string;
  };
  setOpenSnackbar: React.Dispatch<React.SetStateAction<{
    severity: AlertColor;
    note: string;
  }>>;
};

function App({openSnackbar,setOpenSnackbar}:Props) {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<BaseLayout socket={socket}/>} >
          {/* public */}
          <Route path="*" element={<Error/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
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
            <Route path="/chat/:type/:id" element={<Chat socket={socket}/>} />
            <Route path="/chat" element={<Chat socket={socket}/>} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;