import React, { useState } from 'react';
import { FormLabel  } from "@mui/material"
import { Input } from '@mui/material';

import axios from './../Hooks/useAxios'

const SendEmails = () => {
  const [form, setForm] = useState({
    email: '',
    otp: ''
  })

  async function handleOnSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    try{
      await axios
      .post('/otp', {
        email: form.email,
        code: form.otp
      })
      .then((response:any)=>{
        console.log(response.data);
        alert("Email sent!");
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
      <FormLabel htmlFor="firstName">OTP</FormLabel>
      <Input id="otp" name="otp" onChange={(e) => setForm({...form, otp: e.target.value})}/>
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input id="email" name="email" onChange={(e) => setForm({...form, email: e.target.value})}/>
      <button
        className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
        type="submit"
      >
        Send Code
      </button>
    </form>
  );
}

export default SendEmails;