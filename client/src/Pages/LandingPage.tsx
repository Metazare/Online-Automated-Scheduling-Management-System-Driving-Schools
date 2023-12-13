import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import landingpageImage from '../Images/Resources/landingpageImage.png'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import VerifiedIcon from '@mui/icons-material/Verified';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CourseCard from '../Components/CourseCard'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMore from '@mui/icons-material/ExpandMore'

import Footer from '../Layouts/Footer/Footer'

import {useAuth} from '../Hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const {getUser} = useAuth()
    const navigate = useNavigate()

    if (getUser() == 'student') {
      navigate('/home')
      return <div>Loading...</div>
    }
    else if (getUser() == 'admin' || getUser() == 'instructor') {
      navigate('/dashboard')
      return <div>Loading...</div>
    }

    return <>
        <div style={{ background: '#DEDEDE',width:"100%",margin:'auto',padding:"1em 1em 0"}}>
            <Container maxWidth="lg" sx={{minHeight:"500px",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Grid container spacing={0}>
                    <Grid item md={6} sm={12} sx={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
                        <Typography variant="h2" color="primary" fontWeight={700}>OASMS</Typography>
                        <Typography variant="h5" color="secondary.dark" fontWeight={600}>ONLINE AUTOMATED SCHEDULE MANAGEMENT SYSTEM</Typography>
                        <Typography variant="h6" color="primary" fontWeight={600}>For Driving School</Typography>
                    </Grid>
                    <Grid item md={6} sm={12} sx={{ display: { md: 'block', xs: 'none' } }}>
                        <img style={{ width: '100%' }} src={landingpageImage} alt="" />
                    </Grid>
                </Grid>
            </Container>
            <div style={{display:"flex", justifyContent:"center",gap:"25px",flexWrap:"wrap",transform:"translateY(30px)"}}>
                <Paper variant="elevation" elevation={3} sx={{borderRadius:'10px', padding:"1em",display:"flex",gap:"5px"}}>
                    <MenuBookIcon/>
                    <Typography variant="body1" color="initial">Learn to Drive</Typography>
                </Paper>
                <Paper variant="elevation" elevation={3} sx={{borderRadius:'10px', padding:"1em",display:"flex",gap:"5px"}}>
                    <VerifiedIcon/>
                    <Typography variant="body1" color="initial">Get Certified</Typography>
                </Paper>
                <Paper variant="elevation" elevation={3} sx={{borderRadius:'10px', padding:"1em",display:"flex",gap:"5px"}}>
                    <NotificationsActiveIcon/>
                    <Typography variant="body1" color="initial">Get Notified</Typography>
                </Paper>
                
            </div>
        </div>
        <Container maxWidth="lg" sx={{paddingTop:"8em"}} id='aboutUs' >
            <Typography  variant="h5" color="primary" textAlign={"center"} mb={"2rem"} fontWeight={600}>ABOUT US</Typography>
            <Typography variant="body1" color="initial" lineHeight={"2em"} sx={{textIndent:"5%"}} textAlign={"justify"}>   A driving school is an institution that provides driving lessons to individuals who want to learn how to drive. It is a place where students can learn the rules of the road, how to operate a vehicle, and how to be a safe and responsible driver. The curriculum typically includes both classroom instruction and practical driving experience, with the goal of preparing students to pass their driving test and obtain a driver's license.</Typography>
            <Typography  id="courses" variant="h5" color="primary" mt={"8rem"} textAlign={"center"} mb={"2rem"} fontWeight={600}>COURSES</Typography>
            <div  style={{display:"flex",gap:"25px",flexWrap:"wrap",justifyContent:"center"}}>
                <CourseCard variant={"theoretical"} title={"Theoretical Driving"} display={true} description={"A theoretical driving course imparts essential knowledge about traffic laws, road safety, and vehicle operation through classroom-based instruction. It is a prerequisite for obtaining a learner's permit and helps individuals understand the rules of the road."}/>
                <CourseCard variant={"practical"} title={"Practical Driving"} display={true} description={"A practical driving course provides hands-on, on-road experience with a certified instructor to develop driving skills and confidence. It's a crucial step in preparing for a driver's license, teaching students how to safely operate a vehicle in real-world traffic situations."}/>
            </div>
            <Typography id="faq" variant="h5" color="primary" mt={"8rem"} textAlign={"center"} mb={"2rem"} fontWeight={600}>FREQUENTLY ASK QUESTIONS</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-label="Expand"
                    aria-controls="-content"
                    id="-header"
                >
                    <Typography variant='h6'>What is the purpose of the online automated scheduling management system for driving schools?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body2' >The online automated scheduling management system for driving schools aims to streamline the scheduling process for driving lessons, enhancing efficiency for both instructors and students.</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-label="Expand"
                    aria-controls="-content"
                    id="-header"
                >
                    <Typography variant='h6'>Is the online scheduling system user-friendly for both driving instructors and students?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body2' >The system is designed to be user-friendly, with an intuitive interface for both instructors and students. This ensures that users can navigate the platform easily and efficiently manage their schedules.</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-label="Expand"
                    aria-controls="-content"
                    id="-header"
                >
                    <Typography variant='h6'>How does the system handle cancellations and rescheduling of driving lessons?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body2' >The system effectively manages cancellations and rescheduling of driving lessons, allowing instructors and students to make adjustments within a reasonable timeframe, minimizing disruptions and ensuring a smooth scheduling process.</Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-label="Expand"
                    aria-controls="-content"
                    id="-header"
                >
                    <Typography variant='h6'>Can students track their progress and access their lesson history through the system?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant='body2' >The system may enable students to track their progress, access lesson history, and receive feedback from instructors, providing a comprehensive overview of their learning journey.</Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    
        <Footer/>
    </>
}

export default LandingPage