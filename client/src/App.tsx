import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/User/Home';
import BaseLayout from './Layouts/BaseLayout/BaseLayout';
import School from './Pages/School/School'
import schoolView from './Pages/School/School';

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

        <Route path="/" element={<Home/>} />

        {/* user */}
        <Route element={<BaseLayout />} >
          <Route path="/home" element={<Home/>} />
          <Route path="/school" element={<School/>} />
        </Route>





      </Routes>
    </ThemeProvider>

  );
}

export default App;
