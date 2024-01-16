import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';



type Props = {
  course:string,
  time:string,
  student?:string,
  instructor?:string,
  vehicle?:string,
}

function ScheduleCard({course,time,student,instructor,vehicle}:Props) {
  return (
    <Paper variant="elevation" elevation={2} sx={{borderRadius:"7",width:'100%'}}>
      <Box sx={{padding:".5em .5em 0"}}>
        <Typography variant="subtitle2" color="primary">{course}</Typography>
        <Box display="flex" gap={".2em"} 
          sx={{
            marginTop:"5px",
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              width: "0.1em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
            scrollbarWidth: "thin", // Firefox
            msOverflowStyle: "none", // Internet Explorer
          }}
        >
          <Chip variant="outlined" icon={<AccessTimeFilledIcon/>} label={time}/>
          {
            vehicle !== null || vehicle !==""?<Chip variant="outlined" icon={<DirectionsCarIcon/>} label={vehicle} />:""
          }
        </Box>        
      </Box>
      {
        student !== undefined?
        <Box sx={{width:"100%",padding:".5em",background:"#D6D6D6"}}>
          <Typography variant="body2" color="initial" fontSize={"12px"}>{student}</Typography>
          <Typography variant="subtitle2" fontSize={"10px"} color="initial" sx={{textTransform:"upperCase",opacity:".8"}}>Student</Typography>
        </Box>
        :""
      }
      {
        instructor !== undefined?
          <Box sx={{padding:".5em"}}>
            <Typography variant="body2" color="initial" fontSize={"12px"}>{instructor}</Typography>
            <Typography variant="subtitle2" fontSize={"10px"} color="initial" sx={{textTransform:"upperCase",opacity:".8"}}>Teacher</Typography>
          </Box>
        :""
      }
    </Paper>
  )
}

export default ScheduleCard