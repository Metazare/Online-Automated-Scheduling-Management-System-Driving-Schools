import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
type Props = {}

// eslint-disable-next-line 
export default function BaseLayout({}: Props) {
  return (
    <>
        <Header />
        <Container>
          <Outlet />
          
        </Container>
        <Footer />
    </>
  )
}