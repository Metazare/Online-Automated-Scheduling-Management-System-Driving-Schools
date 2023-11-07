import React from 'react'
import { Button } from '@mui/material'
import { io } from 'socket.io-client'

import TextField from '@mui/material/TextField';

// * MUI IMPORTS
// import Container from '@mui/material/Container'
// import Typography from '@mui/material/Typography'
// import Avatar from '@mui/material/Avatar';
// import { Box, IconButton } from '@mui/material';
// import CallIcon from '@mui/icons-material/Call';
// import EmailIcon from '@mui/icons-material/Email';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// Connection to the server with port 5000
const socket = io('http://localhost:5000')

function Home()  {

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
    
    
    // <Box  sx={{ background: 'secondary.dark',width:"100vw",margin:'auto',padding:"1em"}}>
    //   <h1>wew</h1>
    //   <Container maxWidth="lg">
    //     <div style={{padding:"4rem 0",}}>
    //       <a href="#" style={{display:"flex", gap:"5px",alignItems:"center", marginBottom:"10px"}}>  
    //         <ArrowBackIcon/>
    //         <Typography variant="subtitle1" color="initial"> Go Back</Typography>
    //       </a>
    //       <Box
    //         sx={{
    //           display: 'flex',
    //           gap:"25px",
    //           alignItems:"center"
    //         }}
    //       >
    //         <Avatar
    //           alt="Remy Sharp"
    //           src="/static/images/avatar/1.jpg"
    //           sx={{ width: 80, height: 80 }}
    //         />
    //         <div style={{flexGrow:"1"}}>
    //           <Typography variant="h4" fontWeight={500} color="initial">SMART Driving</Typography>
    //           <Box
    //             sx={{
    //               display: 'flex',
    //               gap:"10px"
    //             }}
    //           >
    //             <Box
    //             sx={{
    //               display: 'flex',
    //               gap:"5px"
    //             }}
    //             >
    //               <CallIcon/> 
    //               <Typography variant="body1" fontWeight={500}>0915-666-147</Typography>
    //             </Box>
    //             <Box
    //             sx={{
    //               display: 'flex',
    //               gap:"5px"
    //             }}
    //             >
    //               <EmailIcon/> 
    //               <Typography variant="body1" fontWeight={500}>0915-666-147</Typography>
    //             </Box>
    //           </Box>
    //         </div>
    //         <IconButton aria-label="" onClick={()=>alert}>
    //           <MoreVertIcon/>
    //         </IconButton>
    //       </Box>
    //     </div>
    //   </Container>
    // </Box>
  )
}

export default Home

