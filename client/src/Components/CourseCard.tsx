import React from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TheoreticalIllus from '../Images/Resources/theoreticalDrivingIllustrator.png';
import PracticalIllus from '../Images/Resources/practicalDrivingIllustrator.png';
import Typography from '@mui/material/Typography';

type Props = {
  variant:String,
  title:String,


  // for Landing page
  display?:false|true,
  description?:String,
}
function CourseCard({variant,title,display,description}:Props) {
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

        {display?<>
          <Typography variant="body2" color="initial"  textAlign={"justify"}>
            {description}
          </Typography>
          </>:<>
            <Typography variant="body2" fontWeight={600} color="initial" width={"100%"}>
              Lessons Covered:  
            </Typography>
            <ul style={{width:"100%", padding:".5em 1em",display:"flex",flexDirection:'column', gap:"5px"}}>
              <li>
                <Typography variant="subtitle2" color="initial" width={"100%"}>
                  Lessons #  1
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle2" color="initial" width={"100%"}>
                  Lessons #  2
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle2" color="initial" width={"100%"}>
                  Lessons #  3
                </Typography>
              </li>
              <li>
                <Typography variant="subtitle2" color="initial" width={"100%"}>
                  Lessons #  4
                </Typography>
              </li>
            </ul>
        </>}
      </Box>
    </Paper>
  )
}

export default CourseCard