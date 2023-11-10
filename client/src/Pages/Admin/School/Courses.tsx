import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CourseAccordion from '../../../Components/CourseAccordion'
function Courses() {
  return (
    <Grid item xs={12} sx={{padding:"40px"}}>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <CourseAccordion variant='manage' title='Theoretical Driving Face to Face'/>
        <CourseAccordion variant='manage' title='Practical Driving Automatic Motorcycle'/>
        <CourseAccordion variant='manage' title='Practical Driving Automatic Car'/>
        <CourseAccordion variant='manage' title='Practical Driving Manual Motorcycle'/>
        <CourseAccordion variant='manage' title='Practical Driving Manual Car'/>
      </div>
    </Grid>
  )
}

export default Courses