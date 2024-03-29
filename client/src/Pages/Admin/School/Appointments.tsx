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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import useReqStudent from '../../../Hooks/useReqStudent';
import useReqInstructor from '../../../Hooks/useReqInstructor';
import useReqAppointment from '../../../Hooks/useReqAppointment';
import useReqSchool from '../../../Hooks/useReqSchool';
import { io } from 'socket.io-client';
import moment from 'moment';
import SearchInput from '../../../Components/SearchInputAppointments';

import {useAuth} from '../../../Hooks/useAuth';
import useNotif from '../../../Hooks/useNotif';

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
      createAppointment({
        ...form,
        studentId: selectedStudent?.studentId,
      })
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
        {/* // * Appointment body Container  */}
        <Grid item md={8} sm={6} xs={12} sx={{padding:"40px"}}>
            <div style={{display:"flex", alignItems:"center"}}>
                <div style={{flexGrow:"1"}}>
                    <Typography variant="h6" color="primary" >My Schedules</Typography>
                    <Typography variant="body2" color="initial" >{appointments?.length} Results</Typography>
                </div>
                {/* {getUser()==="admin" ?
                  <Button variant="text" color="primary" sx={{background:"white",boxShadow:5}} startIcon={<AddIcon/>} onClick={()=>{setOpen("add")}}>
                      add
                  </Button> : <></>
                } */}
                <SearchInput data={appointments} setFilteredData={setFilteredAppointments} filteredData={filteredAppointments}/>
            </div>
            
            <Grid container spacing={2} mt={1}>
              {(filteredAppointments ? filteredAppointments : appointments)?.map((appointment) => ( 
                <Grid item md={6} xs={12}>
                    <AppointmentCard 
                      modalOpen={setOpen}
                      formResched={formResched}
                      selectAppointment={setFormResched}
                      appointmentId={appointment.appointmentId}
                      studentName={`${appointment.enrollment.student.name.first} ${appointment.enrollment.student.name.last}`}
                      instructorName={`${appointment.instructor.name.first} ${appointment.instructor.name.middle} ${appointment.instructor.name.last}`}
                      instructorID={appointment.instructor.id}
                      courseName={getCourseType(appointment.enrollment)}
                      date={appointment.date}
                      time={`${appointment.enrollment.schedule.from}:00 to ${appointment.enrollment.schedule.to}:00 (${appointment.enrollment.schedule.name})`}
                    />
                </Grid>
              ))}
            </Grid>
        </Grid>
        {/* //* Calendar  Container */}
        <Grid item md={4} sm={6} xs={12} sx={{padding:"40px"}}>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em",minWidth:"350px"}} >
              {appointments && 
                <TESTCalendar
                  appointments={appointments}
                  setSelectedDay={setSelectedDay}
                  selectedDay={selectedDay}
                />
              }
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
                            Add Schedule
                        </Typography>
                        <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                            Please fill up Schedule form 
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
                            {!selectedStudent?"":<>
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
                                          <MenuItem value={course.enrollmentId} key={course.enrollmentId}>
                                              {/* {course.courseId} */}
                                              {getCourseName(course.courseId)}
                                          </MenuItem>
                                      ))}
                                  </TextField>
                              </Grid>
                            </>}
                            {/* //TODO START - Shift */}
                            {form.enrollmentId ? 
                              <Grid item xs={12}>
                                <Paper variant="elevation" elevation={3} sx={{padding:"1em",background:"#D9D9D9"}}>
                                  <Typography variant="subtitle1" fontWeight={500} color="primary">Availability</Typography>
                                  <Typography variant="body2" color="initial">
                                    {findValue(selectedStudent?.enrollments, "enrollmentId", form?.enrollmentId).schedule.name} Shift {" "}
                                    {findValue(selectedStudent?.enrollments, "enrollmentId", form?.enrollmentId).schedule.from}:00 to {" "}
                                    {findValue(selectedStudent?.enrollments, "enrollmentId", form?.enrollmentId).schedule.to}:00
                                  </Typography>
                                </Paper>
                              </Grid>
                            : ""}
                            {/* //TODO END - Shift */}
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
                                        <DatePicker
                                            slotProps={{ textField: { fullWidth: true } }}
                                            label="Date"
                                            minDate={dayjs()}
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
                    <form onSubmit={resched}>
                        <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                            Reschedule Schedules
                        </Typography>
                        <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                            Please input your desired date
                        </Typography>
                        <Grid container spacing={2}>
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
                                      <DatePicker
                                        slotProps={{ textField: { fullWidth: true } }}
                                        label="Date"
                                        minDate={dayjs()}
                                        value={dayjs(formResched.schedule)}
                                        onChange={handleReschedChangeDateTime}
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
                                    Reschedule
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