import React,{useState, useEffect} from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import { Box, Grid, Button, Paper } from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CourseAccordion from '../../../Components/CourseAccordion';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useParams } from 'react-router-dom';
import useReqLesson from '../../../Hooks/useReqLesson';


function LessonView() {
    const [feedback,setFeedback] = useState(false);
    const {cid, lid} = useParams();
    const {datum, loading, getLesson} = useReqLesson();

    useEffect(()=>{
      getLesson({
        courseId: cid,
        lessonId: lid
      })
    }, [])

    if(loading){
      return <div>Loading...</div>
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
                <Grid item md={feedback ? 8 : 12} xs={12}>
                    <div style={{display:"flex", alignItems:"start"}}>
                        <div style={{flexGrow:"1"}}>
                            <Typography variant="h6" color="primary">{datum?.title}</Typography>
                            <Typography variant="body2" mt={"-5px"} color="initial">{datum?.description}</Typography>
                        </div>
                        <Button variant="contained" color="primary" sx={{marginTop:"5px"}}>
                            next
                        </Button>
                    </div>
                    <div style={{width:"100%",borderRadius:"8px",minHeight:"400px",marginTop:"25px", background:"#D0D0D0"}}>
                      {/* {datum?.file} */}
                      <iframe
                        title="PDF Viewer"
                        src={datum?.file}
                        width="100%"
                        height="500px" // You can adjust the height based on your preference
                        frameBorder="0"
                      />
                    </div>
                </Grid>
                {feedback?
                    <Grid item md={4} xs={12}>
                        <Paper variant="elevation" elevation={3} sx={{padding:"4.5em 1em 1em"}}>

                            <div style={{width:"146px",height:"146px",background:"#E24B5B",borderRadius:"100px",margin:"auto",display:'flex',alignItems:'center',justifyContent:"center"}}>
                                <ThumbUpAltIcon sx={{fill:"#ffffff", fontSize:"60px"}}/>
                            </div>

                            <Typography variant="h5"  color="primary" textAlign={"center"} fontWeight={500} mt={3}>Well Done</Typography>
                            <div style={{margin:" 35px 0 15px",display:"flex",gap:'10px', alignItems:"center"}}>
                                <Avatar variant="circular"  alt="Harold James Castillo" sx={{ width: '40px', height: '40px' }} />
                                <div>
                                    <Typography variant="subtitle1" color="initial" fontWeight={500} >Dianne Chrystalin Brandez</Typography>
                                    <Typography variant="body1"  mt={"-5px"} color="initial" >Instructor</Typography>
                                </div>
                            </div>
                            <Typography variant="body1" color="initial"  textAlign={"justify"}>
                                After reviewing [Student's Name]'s recent driving lesson, it's evident that they have made progress in terms of vehicle control, observations, and understanding traffic signals. Their confidence behind the wheel is growing, though I've identified areas for improvement, such as parallel parking, maintaining a consistent speed, and merging onto highways. Overall, their commitment to becoming a safe and confident driver is commendable, and with continued practice and focus on these specific areas, they are on track to achieve their goal.
                            </Typography>
                        </Paper>
                    </Grid>
                :""}
            </Grid>
        </Container>
  
    </>
    
}

export default LessonView