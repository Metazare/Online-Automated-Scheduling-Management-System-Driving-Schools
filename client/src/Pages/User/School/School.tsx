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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

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
  {/* //Todo Start of new Design state */}
  const [selectedShift,setSelectedShift] = useState("morning")
  {/* //Todo end of new Design state*/}
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
        schoolId: "",
        schedules: {
          from: 1,
          name:"Morning",
          to :  14
        }
    });

    const daysOfWeek = ["Sunday ", "Monday ", "Tuesday ", "Wednesday ", "Thursday ", "Friday ", "Saturday "];
    const[toEnroll,setToEnroll]= useState([])
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
        schoolId: id || "undefined",
        schedules: form.schedules
      });

      if (enrollError) {
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'error',
          note:enrollError,
        })); 
        console.log(enrollError)
      }

      console.log(enrolls)

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
                  <Typography variant="body2" align='justify' minHeight={"200px"}>{data?.about}</Typography>
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
                            <Grid container spacing={2} width={"100%"} mt="10px" >
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
                                      {data?.courses && (
                                        data.courses
                                          .filter(course => !enrolls || !enrolls.some(enroll => enroll.courseId === course.courseId))
                                          .map(course => (
                                            <MenuItem key={course.courseId} value={course.courseId}>
                                              {course.type}
                                            </MenuItem>
                                          ))
                                      )}

                                        {/* {getCourses(data, enrolls).map((course) => (
                                          <MenuItem key={course.courseId} value={course.courseId}>
                                            {course.type}
                                          </MenuItem>
                                        ))} */}

                                    </TextField>
                                </Grid>
                                {/* //Todo Start of new Design  */}
                                <Grid item xs={12}>
                                  <Typography variant="subtitle1" sx={{fontWeight:"600"}} color="primary">Select Shift</Typography>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <Paper variant="elevation" elevation={3} sx={{padding:"1em",border:"1px solid #C9C9C9",width:"100%",cursor:"pointer"}} 
                                    onClick={()=>{
                                      setSelectedShift("morning");
                                      setForm({...form, schedules: data?.schedules?.find(schedule => schedule.name === "Morning" )});
                                      console.log(form);
                                    }} 
                                  >
                                    <Box display="flex" alignItems={"center"} gap={1} >
                                      <Box flexGrow={"1"}>
                                        <Typography variant="subtitle2" color={selectedShift === "morning"? "primary":"initial"} sx={{fontSize:"13px"}}>
                                          {data?.schedules?.find(schedule => schedule.name === "Morning")?.name || ''} 
                                        </Typography>
                                        <Typography variant="subtitle1" color="initial" sx={{opacity:".6",fontSize:"13px"}}>
                                          {data?.schedules?.find(schedule => schedule.name === "Morning")?.from || '1'}:00 - {data?.schedules?.find(schedule => schedule.name === "Morning")?.to || ''}:00
                                        </Typography>
                                      </Box>
                                      <CheckCircleIcon color='primary' sx={selectedShift === "morning"?{opacity:"1"}:{opacity:"0"}}/>
                                    </Box>
                                  </Paper>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                  <Paper variant="elevation" elevation={3} sx={{padding:"1em",border:"1px solid #C9C9C9",width:"100%",cursor:"pointer"}} 
                                  onClick={()=>{
                                    setSelectedShift("afternoon");
                                    setForm({...form, schedules: data?.schedules?.find(schedule => schedule.name === "Afternoon" )});
                                    console.log("form");
                                    console.log(form);
                                  }}
                                  >
                                    <Box display="flex" alignItems={"center"} gap={1} >
                                      <Box flexGrow={"1"}>
                                        <Typography variant="subtitle2" color={selectedShift === "afternoon"? "primary":"initial"} sx={{fontSize:"13px"}}>
                                          {data?.schedules?.find(schedule => schedule.name === "Afternoon")?.name || ''} 
                                        </Typography>
                                        <Typography variant="subtitle1" color="initial" sx={{opacity:".6",fontSize:"13px"}}>
                                          {data?.schedules?.find(schedule => schedule.name === "Afternoon")?.from || ''}:00 - {data?.schedules?.find(schedule => schedule.name === "Afternoon")?.to || ''}:00
                                        </Typography>
                                      </Box>
                                      <CheckCircleIcon color='primary' sx={selectedShift === "afternoon"?{opacity:"1"}:{opacity:"0"}}/>
                                    </Box>
                                  </Paper>
                                </Grid>
                                {/* //Todo End of new Design  */}
                                <Grid item xs={12} mt="15px">
                                    <Button type='submit' fullWidth variant="contained" color="primary" disabled={form.schedules?false:true}>
                                        Enroll
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                    :
                    ''
                }
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
                        {request?.schedule?.name} at {request?.schedule?.from}:00 - {request?.schedule?.to}:00
                      </Typography>
                    </Paper>
                  ))}  

                </Grid>
            </Grid>
        </Container>
    </>
}

export default School