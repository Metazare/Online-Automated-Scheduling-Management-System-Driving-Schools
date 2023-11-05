import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Container from '@mui/material/Container';

export default function BaseLayout() {
  return (
    <>
        <Header />
        <Outlet />
          
        {/* <Footer /> */}
    </>
  )
}