import React, {useEffect, useState} from 'react'
import { io } from 'socket.io-client'

// * MUI Imports
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Box, Grid, Paper, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import SchoolCard from '../../Components/SchoolCard';

import useReqSchool from '../../Hooks/useReqSchool';
import useReqStudent from '../../Hooks/useReqStudent';
import useReqEnroll from '../../Hooks/useReqEnroll';
import SearchInput from '../../Components/SearchInput';
import Chip from '@mui/material/Chip';

type Props = {}

function Home({}: Props)  {

  const {data, loading, getSchool} = useReqSchool();
  const { students, loading: studentLoading, error: studentError, getStudent } = useReqStudent();
  const { data: enrollments, loading: enrollLoading, error: enrollError, getEnrollments } = useReqEnroll();

  const [filteredData,setFilterData] = useState<any>();


  useEffect(()=>{
    getSchool({
      schoolId: null
    });
    getStudent({
      studentId: null
    })
    getEnrollments({
      enrollmentId: null,
      courseId: null,
      status: 'accepted',
      courseType: null
    })
  }, [])

  function removeDuplicatesBySchoolId(arr) {
    const seen = new Set();
    return arr.filter(obj => {
      const schoolId = obj.school.schoolId;
      if (!seen.has(schoolId)) {
        seen.add(schoolId);
        return true;
      }
      return false;
    });
  }

  // console.log(removeDuplicatesBySchoolId(enrollments))

  if (loading) {
    return <div>Loading...</div>
  }

  // console.log(data)

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
          <SearchInput data={data} setFilteredData={setFilterData} filteredData={filteredData}/>
      </Container>
    </div>
    
    <Container maxWidth="lg" sx={{padding:"4em 1em"}}>
      {filteredData !== undefined && filteredData.length === 0 && (
        <Typography variant="subtitle1" align='center' sx={{ marginTop: '1em' }} mb={"4em"}>
          No results found.
        </Typography>
      )}

      {/* Display your search results here */}
      {filteredData !== undefined && filteredData.length > 0 && (
        <>
          <Paper variant="elevation" elevation={3} sx={{padding:'1em',marginBottom:"4em"}} >
            <Box display="flex" alignItems={"center"}>
              <Typography variant="h6" color="primary" sx={{ marginTop: '1em' ,flexGrow:'1'}}  mb={2}>
                Search Result
              </Typography>
              <Chip label="Close" variant="outlined" onClick={()=>setFilterData(undefined)} />
            </Box>
            <Grid container spacing={2}>
              {filteredData.map((school) => (
                <Grid item md={3} sm={4} xs={12}>
                  <SchoolCard schoolName={school.name} about={school.about} schoolId={school.schoolId} variant=""/>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </>
      )}

      {enrollments && enrollments.length > 0 ? (
        <>
          <Typography variant="h6" color="primary" mb={2}>
            Enrolled Schools
          </Typography>
          <Grid container spacing={2}>
            {removeDuplicatesBySchoolId(enrollments)?.map((enrollment) => (
              <Grid item md={3} sm={4} xs={12} key={enrollment.enrollmentId}>
                <SchoolCard
                  schoolName={enrollment.school.name}
                  about={enrollment.school.address}
                  courseId={enrollment.school.schoolId}
                  variant="enrolled"
                  courses={enrollment.school.courses}
                  schoolId={enrollment.school.schoolId}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : <>
        <Typography variant="h6" color="primary" mb={2}>
          Enrolled Schools
        </Typography>
        <Box display="flex" alignItems={"center"} justifyContent={"center"} minHeight={"300px"} alignContent={"center"}>
          <Typography variant="subtitle1"  >
            Enroll Now!
          </Typography>
        </Box>
      </>}

      
      {data && data.length > 0 ? (
        <>
          <Typography variant="h6" mt={4} color="primary" mb={2}>
            Available Schools
          </Typography>
          <Grid container spacing={2}>
            {data.map((school) => (
              <Grid item md={3} sm={4} xs={12} key={school.schoolId}>
                <SchoolCard
                  schoolName={school.name}
                  about={school.about}
                  schoolId={school.schoolId}
                  variant=""
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : <>
      
        <Typography variant="h6" color="primary" mb={2}>
          Driving Schools
        </Typography>
        <Box display="flex" alignItems={"center"} justifyContent={"center"} minHeight={"300px"} alignContent={"center"}>
          <Typography variant="subtitle1"  >
            Sorry, But there's no available driving school
          </Typography>
        </Box>
      </>}
    </Container>
  </>
  
}

export default Home

