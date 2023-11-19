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
import useReqEnroll from '../../../Hooks/useReqEnroll';
import useReqSchool from '../../../Hooks/useReqSchool';
import { useAuth } from '../../../Hooks/useAuth';


function LessonView() {
    const [feedback,setFeedback] = useState(false);
    const {cid, lid} = useParams();
    const {datum, loading, getLesson} = useReqLesson();
    const {data: enrolls, getEnrollments} = useReqEnroll();
    const {getUser} = useAuth();
    const [lesson, setLesson] = useState<any>()
    const {data: school, loading: schoolLoading, error: errorSchool, getSchool} = useReqSchool();

    useEffect(()=>{
      if (getUser()!=='student') {
        getLesson({
          courseId: cid,
          lessonId: lid
        })
        getSchool({
          schoolId: null
        })
      }
      else {
        getEnrollments({
          courseId: cid,
          lessonView: true,
          // enrollmentId: lid
        })
        // setLesson(enrolls?.progress.find((lesson) => lesson.lessonId === lid))
        // console.log(enrolls?.progress.find((lesson) => lesson.lessonId === lid))
      }
    }, [])

    function getData(array){
      console.log(array)
      if (array) {
        console.log(array.filter(lesson => lesson.lesson.lessonId === lid)[0])
        return array.filter(lesson => lesson.lesson.lessonId === lid)[0]
      }
    }

    if(loading){
      return <div>Loading...</div>
    }

    return <>
        <div style={{ background: '#DEDEDE',width:"100vw",margin:'auto',padding:"1em"}}>
            <Container maxWidth="lg">
                <div style={{padding:"3.8rem 0",}}>
                    <a href={getUser()!=='student' ? 'dashboard' : `/course/${enrolls?.school?.schoolId}`} style={{display:"flex", gap:"5px",alignItems:"center", marginBottom:"30px"}}>  
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
                        <Typography variant="h4" fontWeight={500} color="initial">{getUser()!=='student' ? school?.name : enrolls?.school?.name}</Typography>
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
                            <Typography variant="body1" fontWeight={500}>{getUser()!=='student' ? school?.contact :  enrolls?.school?.contact}</Typography>
                            </Box>
                            <Box
                            sx={{
                            display: 'flex',
                            gap:"5px"
                            }}
                            >
                            <EmailIcon/> 
                            <Typography variant="body1" fontWeight={500}>{getUser()!=='student' ?  school?.email :  enrolls?.school?.email}</Typography>
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
                            <Typography variant="h6" color="primary">{getUser()!=='student' ? datum?.title : getData(enrolls?.progress)?.lesson.title}</Typography>
                            <Typography variant="body2" mt={"-5px"} color="initial">{getUser()!=='student' ? datum?.description : getData(enrolls?.progress)?.lesson.description}</Typography>
                        </div>
                    </div>
                    <div style={{width:"100%",borderRadius:"8px",minHeight:"400px",marginTop:"25px", background:"#D0D0D0"}}>
                      <iframe
                        title="PDF Viewer" 
                        src={getUser()!=='student' ? datum?.file : getData(enrolls?.progress)?.lesson.file}
                        width="100%"
                        height="500px" // You can adjust the height based on your preference
                        frameBorder="0"
                      />
                    </div>
                </Grid>
                {getUser()==='student' && getData(enrolls?.progress)?.feedback ?
                    <Grid item md={4} xs={12}>
                        <Paper variant="elevation" elevation={3} sx={{padding:"4.5em 1em 1em"}}>

                            <div style={{width:"146px",height:"146px",background:"#E24B5B",borderRadius:"100px",margin:"auto",display:'flex',alignItems:'center',justifyContent:"center"}}>
                                <ThumbUpAltIcon sx={{fill:"#ffffff", fontSize:"60px"}}/>
                            </div>

                            <Typography variant="h5"  color="primary" textAlign={"center"} fontWeight={500} mt={3}>Feedback</Typography>
                            {/* <div style={{margin:" 35px 0 15px",display:"flex",gap:'10px', alignItems:"center"}}>
                                <Avatar variant="circular"  alt="Harold James Castillo" sx={{ width: '40px', height: '40px' }} />
                                <div>
                                    <Typography variant="subtitle1" color="initial" fontWeight={500} >Dianne Chrystalin Brandez</Typography>
                                    <Typography variant="body1"  mt={"-5px"} color="initial" >Instructor</Typography>
                                </div>
                            </div> */}
                            <Typography variant="body1" color="initial"  textAlign={"justify"}>
                                {JSON.stringify(getData(enrolls?.progress)?.feedback)}
                            </Typography>
                        </Paper>
                    </Grid>
                :""} 
            </Grid>
        </Container>
    </>
    
}

export default LessonView