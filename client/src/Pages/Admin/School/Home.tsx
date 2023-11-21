import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography'
import { Box, Grid, Paper, IconButton } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// * Components
import CourseCard from '../../../Components/CourseCard'

import useReqSchool from '../../../Hooks/useReqSchool';
import useReqStudent from '../../../Hooks/useReqStudent';
import useReqAppointment from '../../../Hooks/useReqAppointment';
import useReqInstructor from '../../../Hooks/useReqInstructor';
import TodayIcon from '@mui/icons-material/Today';
import dayjs, { Dayjs } from 'dayjs';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
// Style for Modal
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius:'8px',
  boxShadow: 24,
  p: 4,
}; 

// Define a generic type for your state
type YourStateType<T> = T | undefined;

function Home() {
  
  const { students, loading, error, getStudent } = useReqStudent();
  const { instructors, loading: instructorLoading, error: instructorError, credentials, getInstructor, createInstructor, updateInstructor} = useReqInstructor();
  const { appointments, loading: appointmentLoading, error: appointmentError, createAppointment, getAppointments, updateAppointment } = useReqAppointment();
  const { data: school, loading: schoolLoading, error: schoolError, getSchool } = useReqSchool();

    // * Reason Value 
    const [reason,setReason] = useState("")
    const [selectedStudent, setSelectedStudent] = useState<YourStateType<any>>(undefined);

    // * Declaration for adding new appointments form
    const [form, setForm] = useState({
        enrollmentId:"",
        instructorId:"",
        vehicle:"",
        schedule: new Date()
    })
    const [formResched,setFormResched] = useState({
        reschedDateTime:dayjs('2022-04-17T15:30'),
        reason:"",
    })
    // * Open Modal 
    const [open, setOpen] = useState("");

    const handleChangeDateTime = (date: any) => {
      setForm({
        ...form,
        schedule: date.toDate(),
      });
    };


    useEffect(() => {
      getStudent({
        studentId:null,
        courseType:null
      })
      getInstructor({
        instructorId: null,
        status: "active"
      });
      getAppointments({
        appointmentId: null,
        studentId: null,
        instructorId: null,
        status: null,
      });
      getSchool({
        schoolId: null
      });
    }, []);

    if (loading && appointmentLoading && instructorLoading) {
      return <div>Loading...</div>
    }

    return <>
        <Grid item xs={8} sx={{padding:"40px"}}>
            <Typography variant="h6" color="primary" mb={1}>About</Typography>
            <Typography variant="body2" align='justify'>{school?.about}</Typography>
            <Typography variant="h6" color="primary" mt={2} mb={1}>Courses</Typography>
            <Box sx={{display:'flex', gap:"25px",flexWrap:"wrap"}}>
              {school?.courses?.map((course)=>(
                <CourseCard variant={"theoretical"} title={course.type} courseId={course.courseId}/> 
              ))}
            </Box>
        </Grid>
        <Grid item xs={4}>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",marginBottom:"25px",opacity:".7"}}>
                <div style={{display:"flex"}}>
                    <Typography sx={{flexGrow:"1"}} variant="subtitle1" color="primary" mb={"15px"}>Total Appointments</Typography>
                    <TodayIcon sx={{fill:"#E24B5B"}}/> 
                </div>
                <Typography  variant="h4" color="initial">{appointments?.length}</Typography>
            </Paper>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",marginBottom:"25px",opacity:".7"}}>
                <div style={{display:"flex"}}>
                    <Typography sx={{flexGrow:"1"}} variant="subtitle1" color="primary" mb={"15px"}>Total Instructors</Typography>
                    <WorkIcon sx={{fill:"#E24B5B"}}/> 
                </div>
                <Typography  variant="h4" color="initial">{instructors?.length}</Typography>
            </Paper>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",marginBottom:"25px",opacity:".7"}}>
                <div style={{display:"flex"}}>
                    <Typography sx={{flexGrow:"1"}} variant="subtitle1" color="primary" mb={"15px"}>Total Students</Typography>
                    <PersonIcon sx={{fill:"#E24B5B"}}/> 
                </div>
                <Typography  variant="h4" color="initial">{students?.length}</Typography>
            </Paper>
        </Grid>
    </>
}

export default Home