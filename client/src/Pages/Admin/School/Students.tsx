import React,{useState, useEffect,useContext} from 'react'
import {  Grid, Typography, IconButton, TextField } from '@mui/material';
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

    const { updateProgress } = useReqLesson();
    const { students, loading, error, getStudent } = useReqStudent();
    const { data: school, loading: schoolLoading, error: errorSchool, getSchool } = useReqSchool();
    const [selectedStudent, setSelectedStudent] = useState<YourStateType<any>>(undefined);
    const [selectedCourse, setSelectedCourse] = useState<YourStateType<any>>(undefined);
    
    // * Modal Open
    const [open, setOpen] = useState("");
    // TODO Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // TODO End Pagination

    const [form, setForm] = useState({
        courseId: "",
        studentId: "",
        lessonId:"",
        lesson:"",
        feedback:""
    })

    const daysOfWeek = ["Sunday ", "Monday ", "Tuesday ", "Wednesday ", "Thursday ", "Friday ", "Saturday "];

    useEffect(() => {
      getStudent({
        studentId:null,
        courseType:null
      })
      getSchool({
        schoolId: null
      })
    }, []);

    function getCourseType(data) {
      const { courseId } = data;
      const foundCourse = school.courses.find((course) => course.courseId === courseId);
      return foundCourse?.type;
    }

    // function getLesson(data) {
    //   const { lessonId } = data;
    //   const foundCourse = school.courses.find((course) => course.courseId === courseId);
    //   return foundCourse?.type;
    // }

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
                        <TableCell component="th" scope="row" sx={{display:"flex",alignItems:"center",gap:"10px"}} >
                            <Avatar alt="Remy Sharp" src={student.profile} />
                            <div>
                                <Typography variant="subtitle1"color="initial" fontWeight={500}>{student.name.first.charAt(0).toUpperCase()  + student.name.first.slice(1)} {student.name.middle.charAt(0).toUpperCase()  + student.name.middle.slice(1)} {student.name.last.charAt(0).toUpperCase()  + student.name.last.slice(1)} </Typography>
                                <Typography variant="body2" color="initial" sx={{marginTop:"-4px"}}>{moment(student.createdAt).format('LLL')}</Typography>
                            </div>
                        </TableCell>
                        <TableCell >

                          <Box display="flex" flexDirection={"column"} gap={"2em"}>
                            {student.enrollments?.map((enrollment) => ( 
                              <>{enrollment.status === "accepted" && <div>{getCourseType(enrollment)}</div>}</>
                            ))}
                          </Box>
                          
                        </TableCell>
                          {/* //TODO START - Shift */}
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
                        {/* //TODO END - Shift */}
                        <TableCell  >
                          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                            {student.enrollments?.map((enrollment) => ( 
                              <>{enrollment.status === "accepted" && 
                                <CircularProgressWithLabel defaultValue={0} value={CalculateProgress(enrollment)} />
                              }</>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell >
                            <IconButton aria-label="" onClick={()=>{setOpen("update");setSelectedStudent(student)}}>
                                <TaskIcon/>
                            </IconButton>
                        </TableCell>
                        <TableCell >
                            <IconButton aria-label="" href={`/chat/student/${student.studentId}`}>
                              <ChatIcon/>
                            </IconButton>
                        </TableCell>
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
                          
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Progress Update
                                    
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                                    Select the course and lesson to mark as complete.
                                </Typography>
                                <Grid container spacing={2} mt={3}>
                                    <Grid item  xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
                                            <Select
                                              required
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              label="Select Lesson"
                                              value={form.courseId}
                                              onChange={(event)=>{ 
                                                
                                                const selectedCourseId = event.target.value; // Assuming the value is the courseId
                                                const selectedCourse = selectedStudent?.enrollments.find(course => course.courseId === selectedCourseId);

                                                setSelectedCourse(selectedCourse);
                                                setForm({ ...form, courseId: selectedCourseId });

                                                console.log(selectedCourse)
                                              }}
                                            >
                                              {selectedStudent && selectedStudent?.enrollments.map((course) => (
                                                <MenuItem key={course.courseId} value={course.courseId}>
                                                  {getCourseType(course)}
                                                </MenuItem>
                                              ))}

                                            </Select>
                                        </FormControl>
                                    </Grid>
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
                    </Box>
                </Modal>
            </div>
        </Grid>
    )
}

export default Students