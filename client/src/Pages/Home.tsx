import { Button } from '@mui/material'
import React from 'react'
import { io } from 'socket.io-client'

import TextField from '@mui/material/TextField';

type Props = {}

// Connection to the server with port 5000
const socket = io('http://localhost:5000')

// eslint-disable-next-line
export default function Home({}: Props) {

  const [notification, setNotification] = React.useState({
    studentName: '',
    appointmentDate: '',
    course: ''
  })

  // Sedning the details as notification to the server
  function sendNotification() {
    socket.emit('send_notification', 
                notification.studentName, 
                notification.appointmentDate, 
                notification.course)
    }

  const [socketId, setSocketId] = React.useState({
    clientId: ''
  })

  // taking the socket id from the server
  socket.on('connect', () => {
    console.log(socket.id)
    setSocketId({clientId: socket.id})
  })

  return (
    <>
    <h1>{socketId.clientId}</h1>
    
    <TextField 
      id="outlined-basic" 
      label="Name" variant="outlined" 
      onChange={(e) => setNotification({...notification, studentName: e.target.value})} 
    />

    <TextField 
      id="outlined-basic" 
      label="Date" 
      variant="outlined" 
      onChange={(e) => setNotification({...notification, appointmentDate: e.target.value})} 
    />

    <TextField 
      id="outlined-basic" 
      label="Course" 
      variant="outlined" 
      onChange={(e) => setNotification({...notification, course: e.target.value})} 
    />
    <Button variant="outlined" onClick={sendNotification}>Send Notification</Button></>
  )
}