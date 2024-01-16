import React, {useState,useEffect} from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import { Box, Grid, Paper } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CourseAccordion from '../../../Components/CourseAccordion';
import TESTCalendar from '../../../Components/TESTCalendar';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import useReqSchool from '../../../Hooks/useReqSchool';
import useReqEnroll from '../../../Hooks/useReqEnroll';
import useReqAppointment from '../../../Hooks/useReqAppointment';
import dayjs, { Dayjs } from 'dayjs';
import AppointmentCard from '../../../Components/AppointmentCard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Link } from 'react-router-dom';
import ScheduleCard from '../../../Components/ScheduleCard';

function CourseList() {

  const {data, loading, getSchool} = useReqSchool();
  const {data:enrolls, getEnrollments} = useReqEnroll();
  const {appointments, getAppointments} = useReqAppointment();
  const {id} = useParams();

  const [selectedDay, setSelectedDay] = useState<Dayjs | null>()
  const [filteredAppointments, setFilteredAppointments] = useState<any>([]);

  const [openSchedule,setOpenSchedule] = useState(false);
  const [sundayAppointments,setsundayAppointments] = useState<any>([])
  const [mondayAppointments,setMondayAppointments] = useState<any>([])
  const [tuesdayAppointments,settuesdayAppointments] = useState<any>([])
  const [wednesdayAppointments,setwednesdayAppointments] = useState<any>([])
  const [thursdayAppointments,setthursdayAppointments] = useState<any>([])
  const [fridayAppointments,setfridayAppointments] = useState<any>([])
  const [saturdayAppointments,setSaturdayAppointments] = useState<any>([])

  const checkerDay = (day: string) => {
    if (appointments !== null) {
      const filteredAppointmentsArray = appointments
        .filter((appointment) => appointment.schedule.days.includes(day))
        .sort((a, b) => {
          // Convert schedule.from strings to Date objects for comparison
          const dateA = new Date(a.schedule.from);
          const dateB = new Date(b.schedule.from);
  
          // Sort in descending order (recent first)
          return  dateA.getTime() - dateB.getTime();
        });
      return filteredAppointmentsArray;
    }
    return [];
  };
  useEffect(()=>{
    if(appointments !== null || appointments !== undefined){
      setsundayAppointments(checkerDay("sunday"))
      setMondayAppointments(checkerDay("monday"))
      settuesdayAppointments(checkerDay("tuesday"))
      setwednesdayAppointments(checkerDay("wednesday"))
      setthursdayAppointments(checkerDay("thursday"))
      setfridayAppointments(checkerDay("friday"))
      setSaturdayAppointments(checkerDay("saturday"))
    }
  },[appointments])
  function getCourseName(value) {
    const foundCourse = data.courses.find((course) => course.courseId === value );
    return foundCourse?.type;
  }
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
    getAppointments({

    })
    
    const filterObjectsByDate = (objects, targetDate) => {
      console.log(objects)
      if(targetDate){
        console.log("Yes Target Date")
        return objects.filter((object) => {
          const objectDate = new Date(object.date).toLocaleDateString(); // Convert schedule to a string in the format MM/DD/YYYY
          const targetDateString = new Date(targetDate).toLocaleDateString(); // Convert target date to a string in the format MM/DD/YYYY
          return objectDate === targetDateString;
        });
      } else{
        console.log("No Target Date")
        return objects;
      }
    }

    setFilteredAppointments(filterObjectsByDate(appointments, selectedDay));

  }, [selectedDay]);

  function getCourseType(enrollment, school) {
    const courseId = enrollment.courseId;

    // Find the course with the matching courseId
    const course = school.courses.find(course => course.courseId === courseId);

    // Return the type of the found course, or null if not found
    return course ? course.type : null;
  }

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

  function CalculateProgress(data){

    console.log(data)
    // Create an object to store the count for each student
    let completionCount = 0;
    let lessonCount = 0
  
    // Iterate through each enrollment and check progress status
  
    data.forEach((progress) => {
      if (progress.status === 'complete') {
        // Increment count if progress is marked as 'complete'
        completionCount++;
      }
      lessonCount++;
    });
  
    return (completionCount / lessonCount) * 100;
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
                          <EmailIcon/> 
                          <Typography variant="body1" fontWeight={500}>{data?.email}</Typography>
                        </Box>
                      </Box>
                    </div>
                    <IconButton aria-label="" href={`/chat/admin/${data?.schoolId}`} size='large'>
                      <ChatIcon/>
                    </IconButton>
                    <IconButton aria-label="" onClick={()=>{setOpenSchedule(!openSchedule)}} size='large'>
                      <EventNoteIcon color={openSchedule?"primary":"inherit"}/>
                    </IconButton>
                </Box>
            </div>
            
        </Container>  
    </div>
    {!openSchedule && 
      <Container maxWidth="lg" sx={{padding: "2em 1em "}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection={"column"} gap={"10px"}>
              {data && enrolls && populateObject2(data.courses, getCourses(enrolls))?.map((course:any)=>(
                <CourseAccordion variant='use' title={course.type} courseId={course.courseId} progress={CalculateProgress(course?.progress)}/>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    }
    {openSchedule && 
      <Container maxWidth="lg" sx={{padding: "2em 1em "}}>
        <Box display="flex" width={"100%"} sx={{overflowX:'scroll' }}>
          <Box flexGrow={1} maxWidth={"190px"} sx={{background:"white",padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
            background: '#D6D6D6',
          }}}>
            <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Sun</Typography>
            <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
              {sundayAppointments !== null && sundayAppointments?.map((appointment) => (
                appointment.schedule.days.includes("sunday")? 
                  <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
              ))} 
            </Box>
          </Box>
          <Box flexGrow={1} maxWidth={"190px"} sx={{background:"white",padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
            background: '#D6D6D6',
          }}}>
            <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Mon</Typography>
            <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
              {mondayAppointments !== null && mondayAppointments?.map((appointment) => (
                appointment.schedule.days.includes("monday")? 
                  <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
              ))}
            </Box>
          </Box>
          <Box flexGrow={1} maxWidth={"190px"} sx={{background:"white",padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
            background: '#D6D6D6',
          }}}>
            <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Tue</Typography>
            <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
              {tuesdayAppointments !== null && tuesdayAppointments?.map((appointment) => (
                appointment.schedule.days.includes("tuesday")? 
                  <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle}  instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
              ))}
            </Box>
          </Box>
          <Box flexGrow={1} maxWidth={"190px"} sx={{background:"white",padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
            background: '#D6D6D6',
          }}}>
            <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Wed</Typography>
            <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
              {wednesdayAppointments !== null && wednesdayAppointments?.map((appointment) => (
                appointment.schedule.days.includes("wednesday")? 
                  <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
              ))}
            </Box>
          </Box>
          <Box flexGrow={1} maxWidth={"190px"} sx={{background:"white",padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
            background: '#D6D6D6',
          }}}>
            <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Thu</Typography>
            <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
              {thursdayAppointments !== null && thursdayAppointments?.map((appointment) => (
                appointment.schedule.days.includes("thursday")? 
                  <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
              ))}
            </Box>
          </Box>
          <Box flexGrow={1} maxWidth={"190px"} sx={{background:"white",padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
            background: '#D6D6D6',
          }}}>
            <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Fri</Typography>
            <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
              {fridayAppointments !== null && fridayAppointments?.map((appointment) => (
                appointment.schedule.days.includes("friday")? 
                  <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
              ))}
            </Box>
          </Box>
          <Box flexGrow={1} maxWidth={"190px"} sx={{background:"white",padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
            background: '#D6D6D6',
          }}}>
            <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Sat</Typography>
            <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
              {saturdayAppointments !== null && saturdayAppointments?.map((appointment) => (
                appointment.schedule.days.includes("saturday")? 
                  <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    }
    {/* {console.log(populateObject2(data?.courses, getCourses(enrolls)))} */}
  </>
}

export default CourseList