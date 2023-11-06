
import React from 'react'
// * MUI Imports
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import { Box, Grid } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



// * Tabs
import Home from './Home'
import Requests from './Requests';
import Appointments from './Appointments';
import Courses from './Courses';
import Students from './Students';
import Intructors from './Intructors';


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
                        <IconButton aria-label="" onClick={()=>alert}>
                        <MoreVertIcon/>
                        </IconButton>
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
                    <Home/>
                :""}
                {value===1?
                    <Appointments/>
                :""}
                {value===2?
                    <Courses/>
                :""}
                {value===3?
                    <Requests/>
                :""}
                {value===4?
                    <Students/>
                :""}
                {value===5?
                    <Intructors/>
                :""}
            </Grid>
        </Container>
    </>
}

export default ManageSchool