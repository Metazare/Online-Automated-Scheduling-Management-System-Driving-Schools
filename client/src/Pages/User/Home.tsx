import React, {useEffect} from 'react'

// * MUI Imports
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Box, Grid, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import SchoolCard from '../../Components/SchoolCard';

import useReqSchool from '../../Hooks/useReqSchool';
type Props = {}

function Home({}: Props)  {

  const {data, loading, getSchool} = useReqSchool();

  useEffect(()=>{
    getSchool(null);
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  console.log(data)

  return <>
    <div style={{ background: '#2F2E5A',width:"100vw",margin:'auto',padding:"1em 1em 0"}}>
      <Container maxWidth="lg">
          <div style={{padding:"3.8rem 0 2em",}}>
              <Box
                  sx={{
                  display: 'flex',
                  gap:"25px",
                  alignItems:"center",
                  justifyContent:"center"
                  }}
              >
                <Typography variant="h5" color="#ffffff" >Look for a driving school</Typography>
              </Box>
          </div>
          <Paper variant="elevation" elevation={3} sx={{borderRadius:"20px",display:"flex",alignItems:"center", padding:"0 0 0 .5em",width:"50%",minWidth:"300px",margin:" auto ",transform:" translateY(15px)"} }>
            <SearchIcon/>
            <input type="text" style={{flexGrow:"1",border:"none",outline:"none",height:'100%'}}/>
            <Button variant="contained" color="primary" sx={{borderRadius:"20px"}}>
              Search
            </Button>
          </Paper>
      </Container>
    </div>
    <Container maxWidth="lg" sx={{padding:"4em 1em"}}>
      <Typography variant="h6" color="initial" mb={2}>Enrolled Schools</Typography>
      <Grid container spacing={2}>
        <Grid item md={3} sm={4} xs={12}>
          <SchoolCard schoolName={"Smart Driving"} about={"test"} schoolId={"123"} variant="enrolled"/>
        </Grid>
        <Grid item md={3} sm={4} xs={12}>
          <SchoolCard schoolName={"Prestige Driving School"} about={"test"} schoolId={"123"} variant="enrolled"/>
        </Grid>
        
      </Grid>
      <Typography variant="h6" mt={4} color="initial" mb={2}>Available Schools</Typography>
      <Grid container spacing={2}>
      {data?.map((school) => ( 
        <Grid item md={3} sm={4} xs={12}>
          <SchoolCard schoolName={school.name} about={school.about} schoolId={school.schoolId} variant=""/>
        </Grid>
      ))}
      </Grid>
    </Container>
  </>
  
}

export default Home
