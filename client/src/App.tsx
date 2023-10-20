import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import BaseLayout from './Layouts/BaseLayout/BaseLayout';

function App() {
  return (
    <Routes>
        <Route element={<BaseLayout />} >
            <Route path="/" element={<Home/>} />
        </Route>
    </Routes>
  );
}

export default App;
