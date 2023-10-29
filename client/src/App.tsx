import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import BaseLayout from './Layouts/BaseLayout/BaseLayout';
import Register from './Test/Register';
import Login from './Test/Login';

function App() {
  return (
    <Routes>
        <Route element={<BaseLayout />} >
            <Route path="/" element={<Home/>} />
        </Route>

        {/* Test Routes */}
        <Route path="/test">
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>} />
        </Route>
    </Routes>
  );
}

export default App;
