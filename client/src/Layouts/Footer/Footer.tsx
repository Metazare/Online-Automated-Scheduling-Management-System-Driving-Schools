import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'


type Props = {}

// eslint-disable-next-line 
export default function Footer({}: Props) {
    return <>
      <div style={{ background: '#1C1B45',width:"100%",margin:'8em auto 0',padding:"4em 1em 2em"}}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} textAlign={"center"} color="#ffffff">OASMS</Typography>
        </Container>
        <div style={{display:"flex",flexWrap:"wrap",gap:"25px",justifyContent:"center", marginTop:"25px"}}>
          <a href="#home">
            <Typography variant="subtitle1" fontWeight={600} color="#B6B6B6">Home</Typography>
          </a>
          <a href="#home">
            <Typography variant="subtitle1" fontWeight={600} color="#B6B6B6">About us </Typography>
          </a>
          <a href="#home">
            <Typography variant="subtitle1" fontWeight={600} color="#B6B6B6">Course Offered</Typography>
          </a>
          <a href="#home">
            <Typography variant="subtitle1" fontWeight={600} color="#B6B6B6">Login</Typography>
          </a>
          <a href="#home">
            <Typography variant="subtitle1" fontWeight={600} color="primary">Sign Up</Typography>
          </a>
        </div>
      </div>
      <div style={{ background: '#2F2E5A',width:"100%",margin:'auto',padding:"1em 1em 4em"}}>
          <Typography variant="subtitle1" align="center" fontWeight={600} color="#ffffff">©2023 OASMS</Typography>
      </div>
    
    </>
}