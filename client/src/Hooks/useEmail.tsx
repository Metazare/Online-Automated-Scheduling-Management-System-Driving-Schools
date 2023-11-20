import React, { useState } from 'react';
import axios from './useAxios'

interface Data {
  sendEmail: (data: SendEmailData ) => void;
}

interface SendEmailData{
  email: string,
  content: string
}

function useEmail(): Data {

  const sendEmail = async (data: SendEmailData) => {
    try {
      await axios
      .post('/otp', {
        email: data.email,
        content: data.content
      })
      .then((response:any)=>{
        console.log(response.data);
        alert("OTP Sent!");
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  return { 
    sendEmail 
  };
}

export default useEmail;
