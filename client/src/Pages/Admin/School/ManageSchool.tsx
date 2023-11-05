
import React from 'react'
// * MUI Imports
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import { Box, Grid } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// * Components
import CourseCard from '../../../Components/CourseCard'

// * Pages
import Requests from './Requests';

function ManageSchool() {
    
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return <>
        <div style={{ background: '#DEDEDE',width:"100vw",margin:'auto',padding:"1em 1em 0"}}>
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
                <Tabs value={value} onChange={handleChange} >
                    <Tab label="Home" />
                    <Tab label="Appointments" />
                    <Tab label="Courses" />
                    <Tab label="Requests" />
                    <Tab label="Students" />
                    <Tab label="Instructors" />
                </Tabs>
            </Container>
        </div>
        <Container maxWidth="lg" sx={{padding: "2em 1em "}}>
            <Grid container spacing={2}>
                {value===0?
                    <Grid item xs={8} sx={{padding:"40px"}}>
                        <Typography variant="h6" color="primary" mb={1}>About Us</Typography>
                        <Typography variant="body2" align='justify'>SMART Driving is the best choice for your quality driving lessons. The company is already trusted by reputable companies to provide road safety education and assessment to their employees, SMART is also conferred by various award-giving bodies in training and services. For more than 20 years in the industry, we have honed our curriculum to make it suitable for all kinds of learners that we will encounter. Together with all the members of SMART Driving School, we will make your driving training a truly worthwhile experience.</Typography>
                        <Typography variant="h6" color="primary" mt={2} mb={1}>Courses</Typography>
                        <Box sx={{display:'flex', gap:"25px",flexWrap:"wrap"}}>
                            <CourseCard variant={"theoretical"} title={"Theoretical Driving"} /> 
                            <CourseCard variant={"practical"} title={"Practical Driving"} /> 
                        </Box>
                    </Grid>
                :""}
                {value===3?
                    <Requests/>
                :""}
            </Grid>
        </Container>
    </>
}

export default ManageSchool