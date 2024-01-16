import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import { Grid,Button, Paper , Modal,Box, TextField,IconButton } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';


import useReqStudent from '../../../Hooks/useReqStudent';
import useReqInstructor from '../../../Hooks/useReqInstructor';
import useReqAppointment from '../../../Hooks/useReqAppointment';
import useReqSchool from '../../../Hooks/useReqSchool';

import {useAuth} from '../../../Hooks/useAuth';
import useNotif from '../../../Hooks/useNotif';
// TODO Calendar and resched Modal

// Components
import AppointmentCard from '../../../Components/AppointmentCard';
import ScheduleCard from '../../../Components/ScheduleCard';


// Connection to the server with port 5000
// const socket = io('http://localhost:5000');


// Define a generic type for your state
type YourStateType<T> = T | undefined;

function Appointments() {

  const {User, getUser} = useAuth();
  const {sendNotification} = useNotif();

  const { students, loading, error, getStudent } = useReqStudent();
  const { instructors, loading: instructorLoading, error: instructorError, credentials, getInstructor, createInstructor, updateInstructor} = useReqInstructor();
  const { appointments, loading: appointmentLoading, error: appointmentError, createAppointment, getAppointments, updateAppointment } = useReqAppointment();
  const { data, loading: schoolLoading, error: schoolError, getSchool } = useReqSchool();

  const [selectedDay, setSelectedDay] = useState<Dayjs | null>()
  const [selectedCourse, setSelectedCourse] = useState<YourStateType<any>>(undefined);
  const [filteredAppointments, setFilteredAppointments] = useState<any>([]);

    // * Reason Value 
    const [selectedStudent, setSelectedStudent] = useState<YourStateType<any>>(undefined);

    // * Declaration for adding new appointments form
    const [form, setForm] = useState({
        enrollmentId:"",
        instructorId:"",
        studentId:"",
        vehicle:"",
        schedule: new Date()
    })
    const [formResched,setFormResched] = useState({
      schedule: new Date(),
      appointmentId:"",
    })
    const [open, setOpen] = useState("");

    const handleChangeDateTime = (date: any) => {
      setForm({
        ...form,
        schedule: date.toDate(),
      });
    };

    const handleReschedChangeDateTime = (date: any) => {
      setFormResched({
        ...formResched,
        schedule: date.toDate(),
      });
    };

    function findValue(array, key, valueToFind) {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        console.log(element)
        if (element.hasOwnProperty(key) && element[key] === valueToFind) {
          console.log(element)
          return element;
        }
      }
      return false;
    }
    

    async function create(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      setOpen("")
      // createAppointment({
      //   ...form,
      //   studentId: selectedStudent?.studentId,
      // })
      setForm({
        enrollmentId:"",
        instructorId:"",
        studentId:"",
        vehicle:"",
        schedule: new Date()
      })
      getAppointments({
        appointmentId: null,
        studentId: null,
        instructorId: null,
        status: null,
      });
      getAppointments({
        appointmentId: null,
        studentId: null,
        instructorId: null,
        status: null,
      });
    };

    async function resched(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      setOpen("")
      updateAppointment(formResched)
      setFormResched({
        schedule: new Date(),
        appointmentId:"",
      })
      getAppointments({
        appointmentId: null,
        studentId: null,
        instructorId: null,
        status: null,
      });
    }
    useEffect(()=>{
      console.log("Dito")
      console.log(appointments)
    },[])
    useEffect(()=>{
      if(appointments !== null || appointments !== undefined){
        setsundayAppointments(checkerDay("sunday"))
        setMondayAppointments(checkerDay("monday"))
        settuesdayAppointments(checkerDay("tuesday"))
        setwednesdayAppointments(checkerDay("wednesday"))
        setthursdayAppointments(checkerDay("thursday"))
        setfridayAppointments(checkerDay("friday"))
        setSaturdayAppointments(checkerDay("saturday"))
        console.log("sundayAppointments")
        console.log(appointments)
      }
    },[appointments])

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
            const dateA = new Date(a.schedule.from);
            const dateB = new Date(b.schedule.from);
    
            // Sort in ascending order (soonest first)
            return dateA.getTime() - dateB.getTime();
          });
        return filteredAppointmentsArray;
      }
      return [];
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

    function getCourseName(value) {
      const foundCourse = data.courses.find((course) => course.courseId === value );
      return foundCourse?.type;
    }

    function getCourseType(data) {
      const { school, courseId } = data;
      const foundCourse = school.courses.find((course) => course.courseId === courseId);
      return foundCourse?.type;
    }

    if (appointments && loading && appointmentLoading && instructorLoading) {
      return <div>Loading...</div>
    }

    return <>
      <Box display="flex" sx={{overflowX:'scroll',flexDirection:{md:"row",xs:"column"}}}>
        <Box flexGrow={1}  sx={{background:"white",width:{md:"250px",xs:"100%"},padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
          background: '#D6D6D6',
        }}}>
          <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Sun</Typography>
          <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
            {sundayAppointments !== null && sundayAppointments?.map((appointment) => (
              appointment.schedule.days.includes("sunday")? 
                <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} student={`${appointment.enrollment.student.name.first} ${appointment.enrollment.student.name.middle} ${appointment.enrollment.student.name.last}`} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
            ))}
          </Box>
        </Box>
        <Box flexGrow={1}  sx={{background:"white",width:{md:"250px",xs:"100%"},padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
          background: '#D6D6D6',
        }}}>
          <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Mon</Typography>
          <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
            {mondayAppointments !== null && mondayAppointments?.map((appointment) => (
              appointment.schedule.days.includes("monday")? 
                <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} student={`${appointment.enrollment.student.name.first} ${appointment.enrollment.student.name.middle} ${appointment.enrollment.student.name.last}`} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
            ))}
          </Box>
        </Box>
        <Box flexGrow={1}  sx={{background:"white",width:{md:"250px",xs:"100%"},padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
          background: '#D6D6D6',
        }}}>
          <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Tue</Typography>
          <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
            {tuesdayAppointments !== null && tuesdayAppointments?.map((appointment) => (
              appointment.schedule.days.includes("monday")? 
                <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} student={`${appointment.enrollment.student.name.first} ${appointment.enrollment.student.name.middle} ${appointment.enrollment.student.name.last}`} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
            ))}
          </Box>
        </Box>
        <Box flexGrow={1}  sx={{background:"white",width:{md:"250px",xs:"100%"},padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
          background: '#D6D6D6',
        }}}>
          <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Wed</Typography>
          <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
            {wednesdayAppointments !== null && wednesdayAppointments?.map((appointment) => (
              appointment.schedule.days.includes("monday")? 
                <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} student={`${appointment.enrollment.student.name.first} ${appointment.enrollment.student.name.middle} ${appointment.enrollment.student.name.last}`} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
            ))}
          </Box>
        </Box>
        <Box flexGrow={1}  sx={{background:"white",width:{md:"250px",xs:"100%"},padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
          background: '#D6D6D6',
        }}}>
          <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Thu</Typography>
          <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
            {thursdayAppointments !== null && thursdayAppointments?.map((appointment) => (
              appointment.schedule.days.includes("monday")? 
                <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} student={`${appointment.enrollment.student.name.first} ${appointment.enrollment.student.name.middle} ${appointment.enrollment.student.name.last}`} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
            ))}
          </Box>
        </Box>
        <Box flexGrow={1}  sx={{background:"white",width:{md:"250px",xs:"100%"},padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
          background: '#D6D6D6',
        }}}>
          <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Fri</Typography>
          <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
            {fridayAppointments !== null && fridayAppointments?.map((appointment) => (
              appointment.schedule.days.includes("monday")? 
                <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} student={`${appointment.enrollment.student.name.first} ${appointment.enrollment.student.name.middle} ${appointment.enrollment.student.name.last}`} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
            ))}
          </Box>
        </Box>
        <Box flexGrow={1}  sx={{background:"white",width:{md:"250px",xs:"100%"},padding:"1em .1em 1em",transition:"all ease .3s",borderRadius:"4px",':hover': {
          background: '#D6D6D6',
        }}}>
          <Typography variant="h6" color="initial" sx={{opacity:".5"}} textAlign={"center"}>Sat</Typography>
          <Box display="flex" flexDirection={"column"} gap={1} mt={3}>
            {saturdayAppointments !== null && saturdayAppointments?.map((appointment) => (
              appointment.schedule.days.includes("monday")? 
                <ScheduleCard course={getCourseName(appointment.enrollment.courseId)} time={`${dayjs(appointment.schedule.from).format("h:mm A")} - ${dayjs(appointment.schedule.to).format("h:mm A")}`} vehicle={appointment.vehicle} student={`${appointment.enrollment.student.name.first} ${appointment.enrollment.student.name.middle} ${appointment.enrollment.student.name.last}`} instructor={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}/>:""
            ))}
          </Box>
        </Box>
      </Box>
    </>
}

export default Appointments;