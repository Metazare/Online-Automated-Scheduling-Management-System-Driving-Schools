import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'

import useReqSchool from '../Hooks/useReqSchool'
import {useAuth} from '../Hooks/useAuth'

type Props = {}


export default function TestSchool({}: Props) {
  const {data, loading, error, editSchool, getSchool} = useReqSchool();
  const {register} = useAuth();

  const [form, setForm] = useState({
    schoolId: '',
    name: '',
    about: '',
    address: '',
    contact: '',
    email: '',
    profile: '',
    schedules: '',
  })

  const registerBtn = async () => {
    register({
      name: 'NYANANANANA',
      about: "Test",
      address: "somewhere",
      contact: "0915666147",
      email: "nya@test.com",
      role: "admin",
      password: "Test.1234",
      schedules: [{
        name: "Morning",
        from: 0,
        to: 12
      },{
        name: "Afternoon",
        from: 13,
        to: 23
      }]
    })
  }

  const getBtn = async () => {
    await getSchool({
      schoolId: "Bs2Bs6gS51HMCditRDJHvZavcnRdkGD1bB"
    });
    await setForm(data);
    await console.log(data);
  }

  const editBtn = async () => {
    await editSchool({
      ...form, 
      schedules: [{
        name: "Morning",
        from: 5,
        to: 6
      },{
        name: "Afternoon",
        from: 15,
        to: 16
      }]
    });
  }

  return (
    <>
      <Button onClick={registerBtn}>
        TestRegister
      </Button>

      <Button onClick={getBtn} >
        Get School
      </Button>

      <Button onClick={editBtn} >
        Edit School
      </Button>
      



      {/* <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
      /> */}
    </>
  )
}