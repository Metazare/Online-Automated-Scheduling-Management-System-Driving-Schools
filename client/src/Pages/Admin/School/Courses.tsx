import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CourseAccordion from '../../../Components/CourseAccordion'
function Courses() {
  return (
    <Grid item xs={12} sx={{padding:"40px"}}>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <CourseAccordion variant='manage' title='Theoretical Driving'/>
        <CourseAccordion variant='manage' title='Practical Driving'/>
      </div>
    </Grid>
  )
}

export default Courses