import React, { useState,useContext } from 'react';
import axios from './useAxios'
import { SnackbarContext } from '../Context/SnackbarContext';

interface Data {
  sendEmail: (data: SendEmailData ) => void;
  sendEmailInstructor : (data: SendEmailData ) => void;
}


interface SendEmailData{
  email: string,
  content: string
}

function useEmail(): Data {
  const{setOpenSnackBar} = useContext(SnackbarContext)

  const sendEmail = async (data: SendEmailData) => {
    try {
      await axios
      .post('/email', {
        to: data.email,
        subject: "OASMS OTP",
        content: data.content
      })
      .then((response:any)=>{
        console.log(response.data);
        console.log(data.content)
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'info',
          note:"OTP Sent!",
        }));
      });
    } catch (error: any) {
      console.log(error);
      setOpenSnackBar(openSnackBar => ({
        ...openSnackBar,
        severity:'error',
        note:"OTP Doesn't match",
      }));
    }
  }
  const sendEmailInstructor = async (data: SendEmailData) => {
    try {
      await axios
      .post('/email', {
        to: data.email,
        subject: "Welcome to OASMS",
        content: data.content
      })
      .then((response:any)=>{
        console.log(response.data);
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'info',
          note:"Account Credential Send to the new Instructor",
        }));
      });
    } catch (error: any) {
      console.log(error);
      setOpenSnackBar(openSnackBar => ({
        ...openSnackBar,
        severity:'error',
        note:"Encountered some error in sending email",
      }));
    }
  }

  return { 
    sendEmail,sendEmailInstructor
  };
}

export default useEmail;
