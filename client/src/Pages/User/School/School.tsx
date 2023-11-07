import React,{useState, useEffect} from 'react'

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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// * Components
import CourseCard from '../../../Components/CourseCard'
import MenuItem from '@mui/material/MenuItem';

import useReqSchool from '../../../Hooks/useReqSchool';
import useReqEnroll from '../../../Hooks/useReqEnroll';

import { useParams } from 'react-router-dom';

function School() {
  const {data, loading, getSchool} = useReqSchool();
  const {enroll} = useReqEnroll();
  const {id} = useParams();

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
        endTime: new Date()
    });


    useEffect(()=>{
      getSchool(id);
    }, [])

    const appendSelectedDays = (form): number[] => {
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const selectedDays: number[] = [];
    
      days.forEach((day, index) => {
        if (form[day]) {
          selectedDays.push(index);
        }
      });
    
      return selectedDays;
    };

    const handleChangeStart = (time: any) => {
      setForm({
        ...form,
        startTime: time,
      });
    };
  
    const handleChangeEnd = (time: any) => {
      setForm({
        ...form,
        endTime: time,
      });
    };

    async function submit(e: any) {
      e.preventDefault();
      enroll({
        courseId: form.course,
        days: appendSelectedDays(form),
        startTime: form.startTime,
        endTime: form.endTime
      });
    }
    

    if (loading) {
        return <p>Loading...</p>
    }
    
    return <>
        <div style={{ background: '#DEDEDE',width:"100vw",margin:'auto',padding:"1em"}}>
            <Container maxWidth="lg">
                <div style={{padding:"3.8rem 0",}}>
                    <a href="/" style={{display:"flex", gap:"5px",alignItems:"center", marginBottom:"30px"}}>  
                        <ArrowBackIcon/>
                        <Typography variant="subtitle1" color="initial"> Go Back</Typography>
                    </a>
                    <Box
                        sx={{
                        display: 'flex',
                        gap:"25px",
                        alignItems:"center"
                        }}
                    >
                        <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
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
                    <Typography variant="h6" color="primary" mb={1}>About Us</Typography>
                    <Typography variant="body2" align='justify'>{data?.about}</Typography>
                    <Typography variant="h6" color="primary" mt={2} mb={1}>Courses</Typography>
                    <Box sx={{display:'flex', gap:"25px",flexWrap:"wrap"}}>
                        <CourseCard variant={"theoretical"} title={"Theoretical Driving"} /> 
                        <CourseCard variant={"practical"} title={"Practical Driving"} /> 
                    </Box>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                {enrolled?
                    <Paper sx={{padding:"1em"}}  elevation={3}>
                        <Typography variant="h6" color="primary">Enroll Now</Typography>
                        <form action="">
                            <Grid container spacing={2} width={"100%"} mt="20px" mb={"40px"}>
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
                                        {data?.courses?.map((course) => (
                                          <MenuItem key={course.courseId} value={course.courseId}>
                                            {course.type}
                                          </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <Typography fontWeight={500}>Set Availability</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item >
                                            <div
                                                className={form.sunday ? "selectSwitch selectSwitchActive" : "selectSwitch"}
                                                onClick={() => {
                                                    setForm({ ...form, sunday: !form.sunday });
                                                }}
                                            >
                                                <p>Su</p>
                                            </div>
                                        </Grid>
                                        <Grid item >
                                            <div
                                                className={form.monday ? "selectSwitch selectSwitchActive" : "selectSwitch"}
                                                onClick={() => {
                                                    setForm({ ...form, monday: !form.monday });
                                                }}
                                            >
                                                <p>Mo</p>
                                            </div>
                                        </Grid>
                                        <Grid item >
                                            <div
                                                className={form.tuesday ? "selectSwitch selectSwitchActive" : "selectSwitch"}
                                                onClick={() => {
                                                    setForm({ ...form, tuesday: !form.tuesday });
                                                }}
                                            >
                                                <p>Tu</p>
                                            </div>
                                        </Grid>
                                        <Grid item >
                                            <div
                                                className={form.wednesday ? "selectSwitch selectSwitchActive" : "selectSwitch"}
                                                onClick={() => {
                                                    setForm({ ...form, wednesday: !form.wednesday });
                                                }}
                                            >
                                                <p>We</p>
                                            </div>
                                        </Grid>
                                        <Grid item >
                                            <div
                                                className={form.thursday ? "selectSwitch selectSwitchActive" : "selectSwitch"}
                                                onClick={() => {
                                                    setForm({ ...form, thursday: !form.thursday });
                                                }}
                                            >
                                                <p>Th</p>
                                            </div>
                                        </Grid>
                                        <Grid item >
                                            <div
                                                className={form.friday ? "selectSwitch selectSwitchActive" : "selectSwitch"}
                                                onClick={() => {
                                                    setForm({ ...form, friday: !form.friday });
                                                }}
                                            >
                                                <p>Fr</p>
                                            </div>
                                        </Grid>
                                        <Grid item >
                                            <div
                                                className={form.saturday ? "selectSwitch selectSwitchActive" : "selectSwitch"}
                                                onClick={() => {
                                                    setForm({ ...form, saturday: !form.saturday });
                                                }}
                                            >
                                                <p>St</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* 
                                    // TODO Update text field to much better component
                                 */}
                                <Grid item md={6} sm={12}>
                                  <TimePicker
                                      label="Start Time"
                                      onChange={handleChangeStart}
                                  />
                                </Grid>
                                {/* 
                                    // TODO Update text field to much better component
                                */}
                                <Grid item md={6} sm={12}>
                                  <TimePicker
                                      label="End Time"
                                      onChange={handleChangeEnd}
                                  />
                                </Grid>
                                <Grid item xs={12} mt="15px">
                                    <Button type='submit' fullWidth variant="contained" color="primary">
                                        Enroll
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                    :
                    <Paper sx={{padding:"1em"}} elevation={3}>
                        <Typography variant="h6" color="primary">Your Request is Pending..</Typography>
                        <Typography variant="subtitle2" mt={2} mb={1} color="initial">Selected Course</Typography>
                        <Typography variant="body2" color="initial">Practical Driving Course</Typography>
                        <Typography variant="subtitle2" mt={2} mb={1} color="initial">Availability</Typography>
                        <Typography variant="body2" color="initial">Mon, Tues and Friday from 1 to 5 pm</Typography>
                    </Paper>
                }
                </Grid>
            </Grid>
        </Container>
    </>
}

export default School