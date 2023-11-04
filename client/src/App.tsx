import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import BaseLayout from './Layouts/BaseLayout/BaseLayout';
import RegisterAdmin from './Test/RegisterAdmin';
import RegisterInstructor from './Test/RegisterInstructor';
import RegisterStudent from './Test/RegisterStudent';
import Login from './Test/Login';
import AddCourse from './Test/AddCourse';

function App() {
  return (
    <Routes>
        <Route element={<BaseLayout />} >
            <Route path="/" element={<Home/>} />
        </Route>

        {/* Test Routes */}
        <Route path="/test">
          <Route path="registeradmin" element={<RegisterAdmin/>}/>
          <Route path="registerstudent" element={<RegisterStudent/>}/>
          <Route path="registerinstructor" element={<RegisterInstructor/>}/>
          <Route path="login" element={<Login/>} />
          <Route path="addcourse" element={<AddCourse/>} />
        </Route>
    </Routes>
  );
}

export default App;
