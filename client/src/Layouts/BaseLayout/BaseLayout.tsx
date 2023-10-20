import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

type Props = {}

// eslint-disable-next-line 
export default function BaseLayout({}: Props) {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}