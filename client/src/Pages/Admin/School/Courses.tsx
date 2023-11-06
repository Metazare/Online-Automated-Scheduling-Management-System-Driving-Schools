import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CourseAccordion from '../../../Components/CourseAccordion'
function Cources() {
  return (
    <Grid item xs={12} sx={{padding:"40px"}}>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <CourseAccordion/>
        <CourseAccordion/>
      </div>
    </Grid>
  )
}

export default Cources