import React,{useState, useEffect,useContext} from 'react'
import {  Grid, Typography, IconButton, TextField,Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TaskIcon from '@mui/icons-material/Task';
import CircularProgress, {CircularProgressProps,} from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import useReqAppointment from '../../../Hooks/useReqAppointment';
import useReqEnroll from '../../../Hooks/useReqEnroll';

import { useAuth } from '../../../Hooks/useAuth';
import useReqInstructor from '../../../Hooks/useReqInstructor';
import useReqStudent from '../../../Hooks/useReqStudent';
import useReqSchool from '../../../Hooks/useReqSchool';
import useReqLesson from '../../../Hooks/useReqLesson';
import moment from 'moment';
import ChatIcon from '@mui/icons-material/Chat';
import { SnackbarContext } from '../../../Context/SnackbarContext';
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

function CircularProgressWithLabel(props: CircularProgressProps & { value: number },) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

function CalculateProgress(data){
  // Create an object to store the count for each student
  let completionCount = 0;
  let lessonCount = 0

  // Iterate through each enrollment and check progress status

  data.progress.forEach((progress) => {
    if (progress.status === 'complete') {
      // Increment count if progress is marked as 'complete'
      completionCount++;
    }
    lessonCount++;
  });

  return (completionCount / lessonCount) * 100;
}

type YourStateType<T> = T | undefined;

function Students() {
    const{setOpenSnackBar} = useContext(SnackbarContext)
    const {getUser} = useAuth();
    const { updateProgress } = useReqLesson();
    const { students, loading, error, getStudent } = useReqStudent();
    const { data: school, loading: schoolLoading, error: errorSchool, getSchool } = useReqSchool();
    const [selectedStudent, setSelectedStudent] = useState<YourStateType<any>>(undefined);
    const [selectedCourse, setSelectedCourse] = useState<YourStateType<any>>(undefined);
    const [selectedCourseID, setSelectedCourseID] = useState<string>("");
    const { instructors, loading: instructorLoading, error: instructorError, credentials, getInstructor,updateInstructor} = useReqInstructor();
    const {  loading: appointmentLoading, error: appointmentError, createAppointment, getAppointments } = useReqAppointment();
    const { data:enrolls, loading:enrollLoading, getEnrollments, updateEnrollments } = useReqEnroll();
    
    const handleChangeDateTime = (date: any) => {
      setFormSchedule({
        ...formSchedule,
        schedule: date.toDate(),
      });
    };
    const [formSchedule, setFormSchedule] = useState({
      enrollmentId:"",
      instructorId:"",
      studentId:"",
      vehicle:"",
      schedule: new Date()
    })

    // * Modal Open
    const [open, setOpen] = useState("");
    const [form, setForm] = useState({
        courseId: "",
        studentId: "",
        lessonId:"",
        lesson:"",
        feedback:""
    })
    const [formDrop,setFormDrop] = useState({
      enrollmentId:"",
      reason:""
    })
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
    function getCourseName(value) {
      const foundCourse = school.courses.find((course) => course.courseId === value );
      return foundCourse?.type;
    }

    async function create(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      setOpen("")
      createAppointment({
        ...formSchedule,
        studentId: selectedStudent?.studentId,
      })
      setFormSchedule({
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


    useEffect(() => {
      getStudent({
        studentId:null,
        courseType:null
      })
      getSchool({
        schoolId: null
      })
      getInstructor({
        instructorId: null,
        status: "active"
      });
      getEnrollments({
        enrollmentId: null,
        courseId: null,
        status: 'pending',
        courseType: null,
      });
    }, []);

    function getCourseType(data) {
      const { courseId } = data;
      const foundCourse = school.courses.find((course) => course.courseId === courseId);
      return foundCourse?.type;
    }

    async function dropStudent(e:any) {
      e.preventDefault();
      await updateEnrollments({enrollmentId:  formDrop.enrollmentId, status: 'declined', reason: formDrop.reason, studentId: selectedStudent.studentId});
      getStudent({
        studentId:null,
        courseType:null
      })
      setOpen("");
    }
    async function submit(e: any){
      e.preventDefault();

      console.log({
        enrollmentId: selectedCourse?.enrollmentId,
        lessonId: form.lessonId,
        status: 'complete'
      })

      if (selectedCourse && form.lessonId) {
        updateProgress({
          enrollmentId: selectedCourse?.enrollmentId,
          lessonId: form.lessonId,
          status: 'complete',
          feedback: form.feedback
        })
      }
      else {
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'warning',
          note:"Please Select Course and Lesson",
        })); 
      }
      
    };
    useEffect(()=>{
      const selectedCourse = selectedStudent?.enrollments.find(course => course.courseId === selectedCourseID);
      setSelectedCourse(selectedCourse)
      console.log(selectedCourse)
    },[selectedCourseID])

    function filterStudentsWithAcceptedEnrollment(students) {
      if (!students) {
        return [];
      }
      
      return students.filter((student) => {
        const hasAcceptedEnrollment = student.enrollments.some(
          (enrollment) => enrollment.status === 'accepted'
        );
        return hasAcceptedEnrollment;
      });
    }

    if (loading || schoolLoading) {
      return <div>Loading...</div>
    }
    console.log(students)
    return (
        <Grid item xs={12} sx={{padding:"40px"}}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell >
                          Name
                        </TableCell>
                        <TableCell >
                          Course
                        </TableCell>
                        <TableCell >
                          Selected Shift
                        </TableCell>
                        <TableCell >
                          Progress
                        </TableCell>
                        <TableCell >
                        </TableCell>
                        <TableCell >
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {filterStudentsWithAcceptedEnrollment(students)?.map((student) => ( 
                    <TableRow  hover role="checkbox" >
                        <TableCell >
                          <Box sx={{display:"flex",alignItems:"center",gap:"15px",height:'100%'}} >
                            <Avatar alt="Remy Sharp" src={student.profile} />
                            <div>
                                <Typography variant="subtitle1"color="initial" fontWeight={500}>{student.name.first.charAt(0).toUpperCase()  + student.name.first.slice(1)} {student.name.middle.charAt(0).toUpperCase()  + student.name.middle.slice(1)} {student.name.last.charAt(0).toUpperCase()  + student.name.last.slice(1)} </Typography>
                                <Typography variant="body2" color="initial" sx={{marginTop:"-4px"}}>{moment(student.createdAt).format('LLL')}</Typography>
                            </div>
                            <IconButton aria-label="" href={`/chat/student/${student.studentId}`}>
                              <ChatIcon/>
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell >

                          <Box display="flex" flexDirection={"column"} gap={"2em"}>
                            {student.enrollments?.map((enrollment) => ( 
                              <>{enrollment.status === "accepted" && <div>{getCourseType(enrollment)}</div>}</>
                            ))}
                          </Box>
                          
                        </TableCell>
                        <TableCell >
                          <Box display="flex" flexDirection={"column"} gap={"2em"}>
                            {student.enrollments?.map((enrollment) => ( 
                              <>{enrollment.status === "accepted" && 
                                <div>
                                  {enrollment?.schedule?.name} Shift {enrollment?.schedule?.from}:00 to {enrollment?.schedule?.to}:00 
                                </div>
                              }</>
                            ))}   
                          </Box>
                        </TableCell>

                        <TableCell  >
                          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            {student.enrollments?.map((enrollment) => ( 
                              <>{enrollment.status === "accepted" && 
                                <CircularProgressWithLabel defaultValue={0} value={!isNaN(CalculateProgress(enrollment))?CalculateProgress(enrollment):0} />
                              }</>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" flexDirection="column" alignItems="center">
                            {student.enrollments?.map((enrollment) => ( 
                              <>{enrollment.status === "accepted" && 
                                <IconButton
                                  aria-label=""
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setSelectedCourseID(enrollment.courseId);
                                    setOpen("update");
                                  }}
                                >
                                  <TaskIcon />
                                </IconButton>
                              }</>
                            ))}
                          </Box>
                        </TableCell>
                        {getUser() === "admin"?
                        <>
                          <TableCell >
                            <Box display="flex" sx={{flexDirection:"column"}}>
                              {student.enrollments?.map((enrollment) => ( 
                                <>{
                                  enrollment.status === "accepted" && 
                                  <IconButton
                                    aria-label=""
                                    onClick={() => {
                                      setSelectedStudent(student);
                                      setSelectedCourseID(enrollment.courseId);
                                      setFormSchedule({...formSchedule, enrollmentId: enrollment.enrollmentId });
                                      setOpen("schedule");
                                    }}
                                  >
                                    <EventNoteIcon/>
                                  </IconButton>
                                }</>
                              ))}
                            </Box>
                          </TableCell>
                          <TableCell >
                          <Box display="flex" sx={{flexDirection:"column"}}>
                            {student.enrollments?.map((enrollment) => ( 
                              <>{
                                enrollment.status === "accepted" && 
                                <IconButton
                                  aria-label=""
                                  onClick={() => {
                                    setSelectedStudent(student);
                                    setSelectedCourseID(enrollment.courseId);
                                    setFormDrop({...formDrop, enrollmentId: enrollment.enrollmentId });
                                    setOpen("drop");
                                  }}
                                >
                                  <DeleteIcon/>

                                </IconButton>
                              }</>
                            ))}
                          </Box>
                        </TableCell>
                        </>:""}
                        
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
            </TableContainer>
            <div>
              <Modal
                open={open.length > 0}
                onClose={()=>{setOpen("")}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  {open === "update"?<>
                    <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">Progress Update</Typography>
                    <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">Select the course and lesson to mark as complete.</Typography>
                    <Grid container spacing={2} mt={3}>
                      <Grid item  xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Lesson</InputLabel>
                            <Select
                              required
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Select Lesson"
                              value={form.lessonId}
                              onChange={(event)=>{ setForm({...form, lessonId: event.target.value });}}
                            >
                              {selectedCourse?.progress.map((lesson) => (
                                lesson.status === "complete"?"": 
                                  <MenuItem key={lesson.lesson.lessonId} value={lesson.lesson.lessonId}>
                                    {lesson.lesson.title}
                                  </MenuItem>
                              ))}
                            </Select>
                        </FormControl>
                      </Grid>
                      <Grid item  xs={12}>
                          <TextField
                              fullWidth
                              required
                              id="feedback"
                              label="Feedback"
                              value={form.feedback}
                              onChange={(event)=>{ setForm({...form, feedback: event.target.value });}}
                          />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} mt={4}>
                        <Grid item sm={4} xs={12}>
                            <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                cancel
                            </Button>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <Button variant="contained" type='submit' fullWidth color="primary" onClick={(e)=>{setOpen("");submit(e)}} >
                                Mark as Complete
                            </Button>
                        </Grid>
                    </Grid>
                    
                  </>:""}
                  {open === "drop"?<>
                    <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">Drop Student</Typography>
                    <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">Are you sure you want to drop this student to this course?</Typography>
                    <form onSubmit={dropStudent}>
                      <Grid container spacing={1} mt={2}>
                          <Grid item  xs={12}>
                              <Typography variant="body1" color="initial">Reason</Typography>
                              <TextField
                                fullWidth
                                id="reason"
                                value={formDrop.reason}
                                multiline
                                required
                                onChange={(e)=>{setFormDrop({...formDrop, reason:e.target.value})}}
                              />
                          </Grid>  
                          <Grid  item  xs={12} mb={3}>
                            {formDrop.enrollmentId}
                            <br />
                            {selectedStudent.studentId}
                          </Grid>
                          <Grid item sm={4} xs={12} >
                              <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                  cancel
                              </Button>
                          </Grid>
                          <Grid item sm={8} xs={12}>
                              <Button variant="contained" type='submit' fullWidth color="primary">
                                  Drop
                              </Button>
                          </Grid>
                      </Grid>
                    </form>
                  </>:""}
                  {open === "schedule"?<>
                    <form onSubmit={create}>
                      <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                          Add Schedule
                      </Typography>
                      <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                          Please fill up Schedule form 
                      </Typography>

                      <Grid container spacing={2}>
                          {formSchedule.enrollmentId ? 
                            <Grid item xs={12}>
                              <Paper variant="elevation" elevation={3} sx={{padding:"1em",background:"#D9D9D9"}}>
                                <Typography variant="subtitle1" fontWeight={500} color="primary">Availability</Typography>
                                <Typography variant="body2" color="initial">
                                  {findValue(selectedStudent?.enrollments, "enrollmentId", formSchedule?.enrollmentId).schedule.name} Shift {" "}
                                  {findValue(selectedStudent?.enrollments, "enrollmentId", formSchedule?.enrollmentId).schedule.from}:00 to {" "}
                                  {findValue(selectedStudent?.enrollments, "enrollmentId", formSchedule?.enrollmentId).schedule.to}:00
                                </Typography>
                              </Paper>
                            </Grid>
                          : ""}
                          <Grid item xs={12}>
                              <TextField
                                  fullWidth
                                  id="outlined-select-currency"
                                  select
                                  label="instructor"
                                  required
                                  value={formSchedule.instructorId}
                                  onChange={(event) => {
                                      setFormSchedule({...formSchedule, instructorId: event.target.value });
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
                                  value={formSchedule.vehicle}
                                  onChange={(event) => {
                                    setFormSchedule({...formSchedule, vehicle: event.target.value });
                                  }}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={['DateTimePicker']}>
                                      <DatePicker
                                          slotProps={{ textField: { fullWidth: true } }}
                                          label="Date"
                                          minDate={dayjs()}
                                          value={dayjs(formSchedule.schedule)}
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
                </Box>
              </Modal>
            </div>
        </Grid>
    )
}

export default Students