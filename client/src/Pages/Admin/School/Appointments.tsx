import React,{useState, useEffect} from 'react'
import Typography from '@mui/material/Typography'
import { Grid,Button, Paper , Modal,Box, TextField,IconButton } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import TESTCalendar from '../../../Components/TESTCalendar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import useReqStudent from '../../../Hooks/useReqStudent';
import useReqInstructor from '../../../Hooks/useReqInstructor';
import useReqAppointment from '../../../Hooks/useReqAppointment';
import useReqSchool from '../../../Hooks/useReqSchool';
import { io } from 'socket.io-client';

// TODO Calendar and resched Modal

// Components
import AppointmentCard from '../../../Components/AppointmentCard';

// Connection to the server with port 5000
// const socket = io('http://localhost:5000');

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

function Appointments() {

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

    // Notification for sending the appointment (new and resched)
    // function sendAppointment() {
    //     socket.emit('send_new_appointment', 
    //                 studentId,
    //                 instructorId,
    //                 content,
    //                 date)
    // }

    const requestAbortController = React.useRef<AbortController | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

    // const fetchHighlightedDays = (date: Dayjs) => {
    // const controller = new AbortController();
    // fakeFetch(date, {
    //     signal: controller.signal,
    // })
    // * Open Modal 
    const [open, setOpen] = useState("");

    const handleChangeDateTime = (date: any) => {
      setForm({
        ...form,
        schedule: date.toDate(),
      });
    };

    function findValue(array, key, valueToFind) {
      console.log(array)
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
      console.log(data)
    }, []);

    const daysOfWeek = ["Sunday ", "Monday ", "Tuesday ", "Wednesday ", "Thursday ", "Friday ", "Saturday "];

    function getCourseType(data) {
      const { school, courseId } = data;
      const foundCourse = school.courses.find((course) => course.courseId === courseId);
      return foundCourse?.type;
    }

    if (loading && appointmentLoading && instructorLoading) {
      return <div>Loading...</div>
    }

    return <>
        {/* // * Appointment body Container  */}
        <Grid item xs={8} sx={{padding:"40px"}}>
            <div style={{display:"flex", alignItems:"center"}}>
                <div style={{flexGrow:"1"}}>
                    <Typography variant="h6" color="primary" >My Appointments</Typography>
                    <Typography variant="body2" color="initial" >{appointments?.length} Results</Typography>
                </div>
                <Button variant="text" color="primary" sx={{background:"white",boxShadow:5}} startIcon={<AddIcon/>} onClick={()=>{setOpen("add")}}>
                    add
                </Button>
            </div>

            <Grid container spacing={2} mt={1}>
              {appointments?.map((appointment) => ( 
                <Grid item md={6} xs={12}>
                    <AppointmentCard 
                      modalOpen={setOpen}
                      studentName={`${appointment.enrollment.student.name.first} ${appointment.enrollment.student.name.last}`}
                      instructorName={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}
                      courseName={getCourseType(appointment.enrollment)}
                      schedule={appointment.schedule}
                    />
                </Grid>
              ))}
            </Grid>
        </Grid>
        {/* //* Calendar  Container */}
        <Grid item xs={4} sx={{padding:"40px"}}>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em"}}>
                <TESTCalendar/>
            </Paper>
        </Grid>

        {/* //* Modal  Container */}
        <Modal
            open={open.length > 0}
            onClose={()=>{setOpen("")}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {open === "add"?<>
                    <form onSubmit={create}>
                        <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                            Add Appointment
                        </Typography>
                        <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                            Please fill up appointment form 
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-select-currency"
                                    select
                                    label="Student"
                                    required
                                    // value={form.studentId}
                                    onChange={(event) => 
                                    {
                                      setSelectedStudent(event.target.value);
                                      console.log(event.target.value)
                                    }
                                  }
                                >
                                  {students?.map((student) => ( 
                                    <MenuItem value={student} key={student.studentId}>
                                        {student.name.first} {student.name.middle} {student.name.last}
                                    </MenuItem>
                                  ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-select-currency"
                                    select
                                    label="Course"
                                    required
                                    value={form.enrollmentId}
                                    onChange={(event) => {
                                        setForm({...form, enrollmentId: event.target.value });
                                    }}
                                >
                                  {selectedStudent?.enrollments?.map((course) => ( 
                                    <MenuItem  value={course.enrollmentId} key={course.enrollmentId}>
                                        {course.courseId}
                                    </MenuItem>
                                  ))}
                                </TextField>
                            </Grid>
                            {form.enrollmentId ? <>
                              <p>Availability</p>
                              <>
                                <div>
                                  {findValue(selectedStudent.enrollments, 'enrollmentId', form.enrollmentId)?.availability?.days.map(dayNumber => daysOfWeek[dayNumber])} at 
                                  {findValue(selectedStudent.enrollments, 'enrollmentId', form.enrollmentId)?.availability?.time?.start}:00 to 
                                  {findValue(selectedStudent.enrollments, 'enrollmentId', form.enrollmentId)?.availability?.time?.end}:00
                                </div>
                              </>
                            </>
                            : <></>}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-select-currency"
                                    select
                                    label="instructor"
                                    required
                                    value={form.instructorId}
                                    onChange={(event) => {
                                        setForm({...form, instructorId: event.target.value });
                                    }}
                                >
                                   {instructors?.map((instructor) => ( 
                                    <MenuItem  value={instructor.instructorId} key={instructor.instructorId}>
                                        {instructor.name.first} {instructor.name.middle} {instructor.name.last}
                                    </MenuItem>
                                  ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Vehicle (Optional)"
                                    value={form.vehicle}
                                    onChange={(event) => {
                                        setForm({...form, vehicle: event.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        {/* <DateTimePicker label="Date and Time" 
                                            slotProps={{ textField: { fullWidth: true } }}
                                            value={form.dateTime}
                                            onChange={(newValue) => {
                                                setForm({...form, dateTime: dayjs(newValue)});
                                            }}
                                        /> */}

                                      <DateTimePicker
                                        slotProps={{ textField: { fullWidth: true } }}
                                        label="Date and Time"
                                        value={dayjs(form.schedule)}
                                        onChange={handleChangeDateTime}
                                      />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item  xs={12} mt={"4"} height={"40px"}>
                                
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                    cancel
                                </Button>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Button variant="contained" fullWidth color="primary" type="submit">
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>:""}
                {open === "resched"?<>
                    <form action="">
                        <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                            Reschedule Appointment
                        </Typography>
                        <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                            Please input your desired date
                        </Typography>

                        <Grid container spacing={2}>
                            
                            <Grid item xs={12}>
                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker label="Date and Time" 
                                            slotProps={{ textField: { fullWidth: true } }}
                                            value={form.dateTime}
                                            onChange={(newValue) => {
                                                setForm({...form, dateTime: dayjs(newValue)});
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider> */}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="reason"
                                    label="Reason of Resched"
                                    value={formResched.reason}
                                    onChange={(event) => {
                                        setFormResched({...formResched, reason: event.target.value});
                                    }}
                                />
                            </Grid>
                            <Grid item  xs={12} mt={"4"} height={"40px"}>
                                
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                    cancel
                                </Button>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Button variant="contained" fullWidth color="primary">
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>:""}
            </Box>
        </Modal>
    </>
    
}

export default Appointments;