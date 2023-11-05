import React,{useState} from 'react'

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

// * Components
import CourseCard from '../../Components/CourseCard'
import MenuItem from '@mui/material/MenuItem';

function School() {
    const [form, setForm] = useState({
        course:'',
        sunday: false,
        monday:false,
        tuesday:false,
        wednesday:false,
        thursday:false,
        friday:false,
        saturday:false,
        startTime:"17:59",
        endTime:"17:59"
    });
    return <>
        <div style={{ background: '#DEDEDE',width:"100vw",margin:'auto',padding:"1em"}}>
            <Container maxWidth="lg">
                <div style={{padding:"3.8rem 0",}}>
                    <a href="#" style={{display:"flex", gap:"5px",alignItems:"center", marginBottom:"30px"}}>  
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
                        <Typography variant="h4" fontWeight={500} color="initial">SMART Driving</Typography>
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
                            <Typography variant="body1" fontWeight={500}>0915-666-147</Typography>
                            </Box>
                            <Box
                            sx={{
                            display: 'flex',
                            gap:"5px"
                            }}
                            >
                            <EmailIcon/> 
                            <Typography variant="body1" fontWeight={500}>0915-666-147</Typography>
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
                    <Typography variant="body2" align='justify'>SMART Driving is the best choice for your quality driving lessons. The company is already trusted by reputable companies to provide road safety education and assessment to their employees, SMART is also conferred by various award-giving bodies in training and services. For more than 20 years in the industry, we have honed our curriculum to make it suitable for all kinds of learners that we will encounter. Together with all the members of SMART Driving School, we will make your driving training a truly worthwhile experience.</Typography>
                    <Typography variant="h6" color="primary" mt={2} mb={1}>Courses</Typography>
                    <Box sx={{display:'flex', gap:"25px",flexWrap:"wrap"}}>
                        <CourseCard variant={"theoretical"} title={"Theoretical Driving"} /> 
                        <CourseCard variant={"practical"} title={"Practical Driving"} /> 
                    </Box>
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                    <Paper sx={{padding:"1em"}}>
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
                                        <MenuItem  value={"male"}>
                                        Male
                                        </MenuItem>
                                        <MenuItem  value={"female"}>
                                        Female
                                        </MenuItem>
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
                                    <TextField
                                        fullWidth
                                        id="startTime"
                                        label="Start Time"
                                        variant="outlined"
                                        type='time'
                                        required
                                        value={form.startTime}
                                        onChange={(event) => {
                                        setForm({...form, startTime: event.target.value });
                                        alert(event.target.value )
                                        }}
                                    />
                                </Grid>
                                {/* 
                                    // TODO Update text field to much better component
                                */}
                                <Grid item md={6} sm={12}>
                                    <TextField
                                        fullWidth
                                        id="endTime"
                                        label="End Time"
                                        variant="outlined"
                                        type='time'
                                        required
                                        value={form.endTime}
                                        onChange={(event) => {
                                        setForm({...form, endTime: event.target.value });
                                        }}
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
                </Grid>
            
            </Grid>
        </Container>
    </>
}

export default School