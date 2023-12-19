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

import { Link } from 'react-router-dom';


function CourseList() {

  const {data, loading, getSchool} = useReqSchool();
  const {data:enrolls, getEnrollments} = useReqEnroll();
  const {appointments, getAppointments} = useReqAppointment();
  const {id} = useParams();

  const [selectedDay, setSelectedDay] = useState<Dayjs | null>()
  const [filteredAppointments, setFilteredAppointments] = useState<any>([]);

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

  const [open, setOpen] = useState("");
  
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
                    </Box>
                </div>
                
            </Container>
            
        </div>
        <Container maxWidth="lg" sx={{padding: "2em 1em "}}>
          {/* {enrolls && getCourses(enrolls)?.map((course:any)=>(
            <CourseAccordion variant='use' title={course.type} courseId={course.courseId}/>
          ))} */}

          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <Box display="flex" flexDirection={"column"} gap={"10px"}>
                {data && enrolls && populateObject2(data.courses, getCourses(enrolls))?.map((course:any)=>(
                  <CourseAccordion variant='use' title={course.type} courseId={course.courseId} progress={CalculateProgress(course?.progress)}/>
                ))}
              </Box>
            </Grid>


            <Grid item md={4} xs={12} sx={{display:"flex",flexDirection:"column",gap:"15px"}}>
              <Paper variant="elevation" elevation={3}>
                {/* <TESTCalendar appointments={appointments}/> */}

                {appointments && 
                  <TESTCalendar
                    appointments={appointments}
                    setSelectedDay={setSelectedDay}
                    selectedDay={selectedDay}
                  />
                }
              </Paper>
              <Box display="flex" flexDirection={"column"} gap={"20px"} mt={"20px"}>

                {/* Insert Appointment here */}

                {/* {appointments?.map((appointment)=>(
                  <AppointmentCard 
                    modalOpen={setOpen}
                    studentName={""}
                    instructorName={appointment.instructor.name.first + " " + appointment.instructor.name.last}
                    instructorID={appointment.instructor.instructorId}
                    courseName={getCourseType(appointment.enrollment, appointment.school)}
                    schedule={appointment.schedule}
                  />
                ))} */}

              {(filteredAppointments ? filteredAppointments : appointments)?.map((appointment) => ( 
                <AppointmentCard 
                  modalOpen={setOpen}
                  studentName={""}
                  instructorName={appointment.instructor.name.first + " " + appointment.instructor.name.last}
                  instructorID={appointment.instructor.instructorId}
                  courseName={getCourseType(appointment.enrollment, appointment.school)}
                  schedule={appointment.schedule}
                />
              ))}

              </Box>
            </Grid>
          </Grid>

        </Container>
        {/* {console.log(populateObject2(data?.courses, getCourses(enrolls)))} */}
    </>
}

export default CourseList