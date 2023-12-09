import React,{useState, useEffect,useContext} from 'react'

import io from 'socket.io-client';

// * MUI Imports
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import { Box, Grid } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

// 
import moment from 'moment';
import { SnackbarContext } from '../../../Context/SnackbarContext';
// * Components
import CourseCard from '../../../Components/CourseCard'
import MenuItem from '@mui/material/MenuItem';

import useReqSchool from '../../../Hooks/useReqSchool';
import useReqEnroll from '../../../Hooks/useReqEnroll';
import useReqLesson from '../../../Hooks/useReqLesson';

import { useParams } from 'react-router-dom';

// const socket = io('http://localhost:5000');

function School() {
  const{setOpenSnackBar} = useContext(SnackbarContext)
  const navigate = useNavigate();
  const {data, loading, getSchool} = useReqSchool();
  const {data:lessons, loading:lessonLoading, getLessons} = useReqLesson();
  const {data: enrolls, loading: enrollLoading, error: enrollError, getEnrollments, enroll} = useReqEnroll();
  const {id} = useParams();

  const [enrolled,setEnrolled] = useState(false)
    const [form, setForm] = useState({
        course:'',
        sunday: false,
        monday:false,
        tuesday:false,
        wednesday:false,
        thursday:false,
        friday:false,
        saturday:false,
        startTime: new Date(),
        endTime: new Date(),
        schoolId: ""
    });

    const daysOfWeek = ["Sunday ", "Monday ", "Tuesday ", "Wednesday ", "Thursday ", "Friday ", "Saturday "];

    useEffect(()=>{
      getSchool({
        schoolId: id
      });
      getEnrollments({
        enrollmentId: null,
        courseId: null,
        status: 'accepted',
        courseType: null,
      })
    }, [])

    function getSchoolDataById(value) {
      console.log(value.filter(item => item.school.schoolId === id))
      return value.filter(item => item.school.schoolId === id);
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

    const appendSelectedDays = (form): number[] => {
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const selectedDays: number[] = [];
    
      days.forEach((day, index) => {
        if (form[day]) {
          selectedDays.push(index);
        }
      });
    
      return selectedDays;
    };

    const handleChangeStart = (time: any) => {
      setForm({
        ...form,
        startTime: time,
      });
    };
  
    const handleChangeEnd = (time: any) => {
      setForm({
        ...form,
        endTime: time,
      });
    };

    async function submit(e: any) {
      e.preventDefault();
      // if ((appendSelectedDays(form).length === 0) || !form.startTime || !form.endTime) {
      //   setOpenSnackBar(openSnackBar => ({
      //     ...openSnackBar,
      //     severity:'warning',
      //     note:"Please select at least one day",
      //   })); 
      //   return;
      // }
      enroll({
        courseId: form.course,
        // days: [0,1,2,3,4,5,6],
        // startTime: 0,
        // endTime: 24,
        schoolId: id || "undefined"
      });
      setOpenSnackBar(openSnackBar => ({
        ...openSnackBar,
        severity:'error',
        note:enrollError,
      })); 
      console.log(enrollError)
    }


    function getCourses(school, enrollments){

      console.log(school)
      console.log(enrollments)
      
      // Extract courseIds from enrollments
      const enrolledCourseIds = enrollments.map((enrollment) => enrollment.courseId);

      // Filter courses in the school that are not in the enrolledCourseIds
      const availableCourses = school.courses.filter(
        (course) => !enrolledCourseIds.includes(course.courseId)
      );

      console.log(availableCourses)

      return availableCourses
    }
    
    if (loading && enrollLoading) {
        return <p>Loading...</p>
    }

    if (data?.length === 0) {
        return <p>No data</p>
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
                        alt={data?.name}
                        src={data?.profile}
                        sx={{ width: 80, height: 80 }}
                        />
                        <div style={{flexGrow:"1"}}>
                        <Typography variant="h4" fontWeight={500} color="initial">{data?.name}</Typography>
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
                            <Typography variant="body1" fontWeight={500}>{data?.contact}</Typography>
                            </Box>
                            <Box
                            sx={{
                            display: 'flex',
                            gap:"5px"
                            }}
                            >
                            {/* <EmailIcon/> 
                            <Typography variant="body1" fontWeight={500}>0915-666-147</Typography> */}
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
            <Grid container spacing={2}>
                <Grid item md={8} sm={8} xs={12} sx={{padding:"40px"}}>
                  <Typography variant="h6" color="primary" mb={1}>About</Typography>
                  <Typography variant="body2" align='justify'>{data?.about}</Typography>
                  <Typography variant="h6" color="primary" mt={2} mb={1}>Courses</Typography>
                  <Box sx={{display:'flex', gap:"25px",flexWrap:"wrap"}}>
                    {data?.courses?.map((course)=>(
                      <>
                        <CourseCard variant={"theoretical"} title={course.type} courseId={course.courseId} type="student"/> 
                      </>
                    ))}
                  </Box> 
                </Grid>
                <Grid item md={4} sm={4} xs={12} display={"flex"} gap={"1em"} flexDirection={"column"}>
                {!enrolled?
                    <Paper sx={{padding:"1em"}}  elevation={3}>
                        <Typography variant="h6" color="primary">Enroll Now</Typography>
                        <form onSubmit={submit}>
                            <Grid container spacing={2} width={"100%"} mt="20px" mb={"40px"}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="outlined-select-currency"
                                        select
                                        label="Select Course"
                                        required
                                        value={form.course}
                                        onChange={(event) => {
                                            setForm({...form, course: event.target.value });
                                            
                                        }}
                                    >
                                        {data?.courses?.map((course) => (
                                          <MenuItem key={course.courseId} value={course.courseId}>
                                            {course.type}
                                          </MenuItem>
                                        ))}

                                        {/* {getCourses(data, enrolls).map((course) => (
                                          <MenuItem key={course.courseId} value={course.courseId}>
                                            {course.type}
                                          </MenuItem>
                                        ))} */}

                                    </TextField>
                                </Grid>
                                <Grid item xs={12} mt="15px">
                                    <Button type='submit' fullWidth variant="contained" color="primary">
                                        Enroll
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                    :
                    ''
                }
                {/* {data && enrolls && populateObject2(data.courses, getSchoolDataById(enrolls))?.map((request)=>(
                  <Paper sx={{padding:"1em"}} elevation={3}>
                    <Typography variant="h6" color="primary">Your Enrolled Cources is {request.status}</Typography>
                    <Typography variant="subtitle2" mt={2} mb={1} color="initial">Selected Course</Typography>
                    <Typography variant="body2" color="initial">{request.type}</Typography>
                    <Typography variant="subtitle2" mt={2} mb={1} color="initial">Availability</Typography>
                    <Typography variant="body2" color="initial">
                      {request?.availability?.days.map(dayNumber => daysOfWeek[dayNumber])} at {request?.availability?.time?.start}:00 to {request?.availability?.time?.end}:00
                    </Typography>
                  </Paper>
                ))} */}

                  {/* <Paper sx={{padding:"1em",background:"#D9D9D9"}} elevation={3}>
                    <Typography variant="subtitle2"  mb={1} color="initial">Selected Course</Typography>
                    <Typography variant="body2" color="initial">TDC Face to Face</Typography>
                    <Typography variant="subtitle2" mt={2} mb={1} color="initial">Availability</Typography>
                    <Typography variant="body2" color="initial">
                      Mo, Tu, We, Th, Fr, at (8:00 AM to 8:00 AM)
                    </Typography>
                  </Paper> */}

                  {enrolls && enrolls.length > 0 ? 
                  <Box display={"flex"} gap={"5px"} alignItems={"center"}>
                    <hr style={{flexGrow:'1',borderColor:"#E24B5B"}} />
                    <Typography variant="h6" color="primary">List of Enrolled Courses</Typography>
                    <hr style={{flexGrow:'1',borderColor:"#E24B5B"}} />
                  </Box>
                  : <></> }

                  {data && enrolls && populateObject2(data.courses, getSchoolDataById(enrolls))?.map((request)=>(
                    <Paper sx={{padding:"1em"}} elevation={3} component={Link} to={`/course/${id}`} >
                      <Typography variant="subtitle2"  mb={1} color="initial">Selected Course</Typography>
                      <Typography variant="body2" color="initial">{request.type}</Typography>
                      <Typography variant="subtitle2" mt={2} mb={1} color="initial">Availability</Typography>
                      <Typography variant="body2" color="initial">
                        {/* Mo, Tu, We, Th, Fr, at (8:00 AM to 8:00 AM) */}
                        {request?.availability?.days.map(dayNumber => daysOfWeek[dayNumber].substring(0, 2)+", ")} at {request?.availability?.time?.start}:00 to {request?.availability?.time?.end}:00
                      </Typography>
                    </Paper>
                  ))}  

                </Grid>
            </Grid>
        </Container>
    </>
}

export default School