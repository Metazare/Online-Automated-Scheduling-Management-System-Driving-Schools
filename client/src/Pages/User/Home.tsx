import React from 'react'

// * MUI IMPORTS
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import { Box, IconButton } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


type Props = {}

function Home({}: Props)  {
  return (
    <Box  sx={{ background: 'secondary.dark',width:"100vw",margin:'auto',padding:"1em"}}>
      <h1>wew</h1>
      {/* <Container maxWidth="lg">
        <div style={{padding:"4rem 0",}}>
          <a href="#" style={{display:"flex", gap:"5px",alignItems:"center", marginBottom:"10px"}}>  
            <ArrowBackIcon/>
            <Typography variant="subtitle1" color="initial"> Go Back</Typography>
          </a>
          <Box
            sx={{
              display: 'flex',
              gap:"25px",
              alignItems:"center"
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 80, height: 80 }}
            />
            <div style={{flexGrow:"1"}}>
              <Typography variant="h4" fontWeight={500} color="initial">SMART Driving</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap:"10px"
                }}
              >
                <Box
                sx={{
                  display: 'flex',
                  gap:"5px"
                }}
                >
                  <CallIcon/> 
                  <Typography variant="body1" fontWeight={500}>0915-666-147</Typography>
                </Box>
                <Box
                sx={{
                  display: 'flex',
                  gap:"5px"
                }}
                >
                  <EmailIcon/> 
                  <Typography variant="body1" fontWeight={500}>0915-666-147</Typography>
                </Box>
              </Box>
            </div>
            <IconButton aria-label="" onClick={()=>alert}>
              <MoreVertIcon/>
            </IconButton>
          </Box>
        </div>
      </Container> */}
    </Box>
  )
}

export default Home

