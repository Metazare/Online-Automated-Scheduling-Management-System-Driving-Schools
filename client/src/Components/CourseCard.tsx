import React, {useEffect} from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TheoreticalIllus from '../Images/Resources/theoreticalDrivingIllustrator.png';
import PracticalIllus from '../Images/Resources/practicalDrivingIllustrator.png';
import Typography from '@mui/material/Typography';

import useReqLesson from '../Hooks/useReqLesson';

type Props = {
  variant:String,
  title:String,
  type?: String,
  courseId?: string,

  // for Landing page
  display?:false|true,
  description?:String,
}
function CourseCard({variant,title,type,display,description,courseId}:Props) {
  const {data, loading, getLessons} = useReqLesson();

  useEffect(()=>{
    if (courseId) {
      getLessons({courseId:courseId})
      console.log(data)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Paper elevation={3} sx={{width:"100%",minWidth:"250px", maxWidth:"300px"}}>
      <Box sx={{display:'flex', flexDirection:"column", alignItems:"center", padding:"4em 1em 1em"}}>
        
        
        {(variant === "theoretical")? <>
          <img style={{width:"60%",height:"100px",marginBottom:"2em"}} src={TheoreticalIllus} alt="" />

          <Typography variant="h6" color="primary" width={"100%"}>
            {title}
          </Typography>
        </>:""}
        {(variant === "practical")? <>
          <img style={{width:"55%",height:"100px",marginBottom:"2em"}} src={PracticalIllus} alt="" />

          <Typography variant="h6" color="primary" width={"100%"}>
            {title} 
          </Typography>
        </>:""}
        {/* <div>{JSON.stringify(data)}</div> */}
        {display?<>
          <Typography variant="body2" color="initial"  textAlign={"justify"}>
            {description}
          </Typography>
          </>:<>

            {type=='student'?<></>:
            <Typography variant="body2" fontWeight={600} color="initial" width={"100%"}>
              Lessons Covered:  
            </Typography>
            }
            
            <ul style={{width:"100%", padding:".5em 1em",display:"flex",flexDirection:'column', gap:"5px"}}>
              {data?.map((lesson:any)=>(
                <li>
                  <Typography variant="subtitle2" color="initial" width={"100%"}>
                    {lesson?.title}
                  </Typography>
                </li>
              ))}
            </ul>
        </>}
      </Box>
    </Paper>
  )
}

export default CourseCard