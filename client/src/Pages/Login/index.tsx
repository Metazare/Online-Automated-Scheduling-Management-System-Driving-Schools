import React, { useState,useContext} from 'react'

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

import patternImg from '../../Images/Resources/Pattern.jpg'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../../Hooks/useAuth';
import { SnackbarContext } from '../../Context/SnackbarContext';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CircleIcon from '@mui/icons-material/Circle';
import CourseCard from '../../Components/CourseCard';





function Index() {
  const { login } = useAuth();
  const [slider,setSlider] = useState(1);
  const{setOpenSnackBar} = useContext(SnackbarContext)
  const styleContainer = {
    minHeight:"100vh",
    display:"grid",
    gridTemplateColumns:{md:".4fr .6fr",sm:"1fr"},
  };
  const [form, setForm] = useState({
    email: '',
    password:''
  });

  async function submit(e: any){
    e.preventDefault();
    login(form)
  };

  return (
    <Box sx={styleContainer}>
      <Box sx={{backgroundColor:"#2F2E5A",minHeight:"100%", display:{md:"flex",xs:"none"},alignItems:"end", justifyContent:"start",padding:"4% 5%", position:"relative",overflow:"hidden"}}>
        <img style={{position:"absolute", height:"120%", top:"0",left:"0",opacity:".03"}} src={patternImg} alt="" />
        <Box sx={{position:"absolute",top:"55%",left:"50%",transform:"translate(-50%,-50%)"}}>
          {slider === 1? <CourseCard variant={"theoretical"} title={"Theoretical Driving"} display={true} description={"A theoretical driving course imparts essential knowledge about traffic laws, road safety, and vehicle operation through classroom-based instruction. It is a prerequisite for obtaining a learner's permit and helps individuals understand the rules of the road."}/>:""}
          {slider === 2?<CourseCard variant={"practical"} title={"Practical Driving"} display={true} description={"A practical driving course provides hands-on, on-road experience with a certified instructor to develop driving skills and confidence. It's a crucial step in preparing for a driver's license, teaching students how to safely operate a vehicle in real-world traffic situations."}/>:""}

          <Box display="flex" marginTop={4} justifyContent={"center"} gap={2}>
            <IconButton aria-label="" onClick={()=>{setSlider(1)}}>
              <CircleIcon sx={slider !== 1?{transform:"scale(.8)",color:"white",transition:"all ease .3s"}:{transform:"scale(1.2)",color:"#E24B5B",transition:"all ease .3s"}}/>
            </IconButton>
            <IconButton aria-label="" onClick={()=>{setSlider(2)}}>
              <CircleIcon sx={slider !== 2?{transform:"scale(.8)",color:"white",transition:"all ease .3s"}:{transform:"scale(1.2)",color:"#E24B5B",transition:"all ease .3s"}}/>
            </IconButton>
          </Box>
        </Box>
      </Box>
      <div style={{minHeight:"100%",maxWidth:"1200px", display:"flex",alignItems:"center",padding:"50px 0 50px 4em"}}>
        <Box width={"100%"}>
          <form style={{width:"90%"} } onSubmit={submit}>
            <Typography variant="h3" gutterBottom color="primary.main">
              LOGIN
            </Typography>
            <Grid container spacing={2} width={"100%"} mt="20px" mb={"40px"}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="Email"
                  label="Email"
                  variant="outlined"
                  required
                  value={form.email}
                  onChange={(event) => {
                    setForm( { ...form, email: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type='password'
                  fullWidth
                  id="password"
                  label="Password"
                  variant="outlined"
                  required
                  value={form.password}
                  onChange={(event) => {
                    setForm({...form, password: event.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={12} mt="25px">
                <Button type='submit' fullWidth variant="contained" color="primary">
                  Login
                </Button>
                <Button href='register' fullWidth variant="text" color="primary" style={{marginTop:"10px"}}>
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12} mt={"25px"}>
                <Box display="flex" gap={3} alignItems={"center"} sx={{opacity:".5"}}>
                  <hr style={{flexGrow:'1'}} />
                  <Typography variant="body1" color="initial">or</Typography>
                  <hr style={{flexGrow:'1'}}/>
                </Box>
              </Grid>
            </Grid>
          </form>
          <Grid container spacing={2} width={"90%"}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent={"center"}>
              <GoogleLogin
                onSuccess={async (credentialResponse: any) => {
                  try {
                    const token = credentialResponse.credential;
                    const decoded: { email?:string} = await jwtDecode(token);

                    if (decoded.email) {
                      console.log(decoded.email);
                      const email = decoded.email;
                      
                    } else {
                      console.error('Email not found in JWT payload');
                    }
                  } catch (error) {
                    console.error('Error decoding JWT:', error);
                  }
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                useOneTap
              />
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        
      </div>
    </Box>
  )
}

export default Index