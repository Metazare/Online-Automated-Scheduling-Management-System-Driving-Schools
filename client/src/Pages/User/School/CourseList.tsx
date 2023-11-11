import React, {useEffect} from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import { Box, Grid } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CourseAccordion from '../../../Components/CourseAccordion';

import { useParams } from 'react-router-dom';

import useReqSchool from '../../../Hooks/useReqSchool';
import useReqEnroll from '../../../Hooks/useReqEnroll';

function CourseList() {

  const {data, loading, getSchool} = useReqSchool();
  const {data:enrolls, getEnrollments} = useReqEnroll();
  const {id} = useParams();

  useEffect(()=>{
    getSchool({
      schoolId: id
    })
    getEnrollments({
      enrollmentId: null,
      courseId: null,
      status: 'accepted',
      courseType: null
    })
  }, [])

  function getCourses(array) {
    console.log(array.filter(item => item.school && item.school.schoolId === id))
    return array.filter(item => item.school && item.school.schoolId === id);
  }

  function populateObject2(object1, object2) {
    // Create a mapping of courseIds to their corresponding types
    const courseMapping = Object.fromEntries(object1.map(course => [course.courseId, course.type]));
  
    // Map over Object 2 and add the 'type' property based on the courseId
    const populatedObject2 = object2.map(item => ({
      ...item,
      type: courseMapping[item.courseId],
    }));
  
    return populatedObject2;
  }

  
  
    return <>
        <div style={{ background: '#DEDEDE',width:"100vw",margin:'auto',padding:"1em"}}>
            <Container maxWidth="lg">
                <div style={{padding:"3.8rem 0",}}>
                    {/* <a href="/" style={{display:"flex", gap:"5px",alignItems:"center", marginBottom:"30px"}}>  
                        <ArrowBackIcon/>
                        <Typography variant="subtitle1" color="initial"> Go Back</Typography>
                    </a> */}
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
                        {/* <IconButton aria-label="" onClick={()=>alert}>
                        <MoreVertIcon/>
                        </IconButton> */}
                    </Box>
                </div>
                
            </Container>
            
        </div>
        <Container maxWidth="lg" sx={{padding: "2em 1em "}}>
          {/* {enrolls && getCourses(enrolls)?.map((course:any)=>(
            <CourseAccordion variant='use' title={course.type} courseId={course.courseId}/>
          ))} */}

          {data && enrolls && populateObject2(data.courses, getCourses(enrolls))?.map((course:any)=>(
            <CourseAccordion variant='use' title={course.type} courseId={course.courseId}/>
          ))}

        </Container>
        {/* {console.log(populateObject2(data?.courses, getCourses(enrolls)))} */}
    </>
}

export default CourseList