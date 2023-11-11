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
import dayjs, { Dayjs } from 'dayjs';

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
  const { data, loading: schoolLoading, error: schoolError, getSchool } = useReqSchool();

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

    async function create(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      createAppointment(form);
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
      console.log(students)
      console.log(instructors)
      console.log(data)
    }, []);

    if (loading && appointmentLoading && instructorLoading) {
      return <div>Loading...</div>
    }

    return <>
        <Grid item xs={8} sx={{padding:"40px"}}>
            <Typography variant="h6" color="primary" mb={1}>About Us</Typography>
            <Typography variant="body2" align='justify'>SMART Driving is the best choice for your quality driving lessons. The company is already trusted by reputable companies to provide road safety education and assessment to their employees, SMART is also conferred by various award-giving bodies in training and services. For more than 20 years in the industry, we have honed our curriculum to make it suitable for all kinds of learners that we will encounter. Together with all the members of SMART Driving School, we will make your driving training a truly worthwhile experience.</Typography>
            <Typography variant="h6" color="primary" mt={2} mb={1}>Courses</Typography>
            <Box sx={{display:'flex', gap:"25px",flexWrap:"wrap"}}>
                <CourseCard variant={"theoretical"} title={"Theoretical Driving"} /> 
                <CourseCard variant={"practical"} title={"Practical Driving"} /> 
            </Box>
        </Grid>
        <Grid item xs={4}>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",marginBottom:"25px",opacity:".7"}}>
                <div style={{display:"flex"}}>
                    <Typography sx={{flexGrow:"1"}} variant="subtitle1" color="primary" mb={"15px"}>Total Revenue</Typography>
                    <AttachMoneyIcon sx={{fill:"#E24B5B"}}/> 
                </div>
                <Typography  variant="h4" color="initial">6,000</Typography>
            </Paper>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",marginBottom:"25px",opacity:".7"}}>
                <div style={{display:"flex"}}>
                    <Typography sx={{flexGrow:"1"}} variant="subtitle1" color="primary" mb={"15px"}>Total  System Usage</Typography>
                    <AttachMoneyIcon sx={{fill:"#E24B5B"}}/> 
                </div>
                <Typography  variant="h4" color="initial">N/A</Typography>
            </Paper>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",marginBottom:"25px",opacity:".7"}}>
                <div style={{display:"flex"}}>
                    <Typography sx={{flexGrow:"1"}} variant="subtitle1" color="primary" mb={"15px"}>Total Students and Progress</Typography>
                    <AttachMoneyIcon sx={{fill:"#E24B5B"}}/> 
                </div>
                <Typography  variant="h4" color="initial">99% completion</Typography>
            </Paper>
        </Grid>
    </>
}

export default Home