import React, {useState, useEffect} from 'react'


// * MUI Imports
import Grid from '@mui/material/Grid'
import { Button, Box, Paper, Typography, Chip } from '@mui/material';

import CourseAccordion from '../../../Components/CourseAccordion'
import useReqSchool from '../../../Hooks/useReqSchool';
import useReqCourse from '../../../Hooks/useReqCourse';
import useReqLesson from '../../../Hooks/useReqLesson';

type Props = {}

// Define a generic type for your state
type YourStateType<T> = T | undefined;

function Courses({}: Props)  {

  const {data, loading, getSchool} = useReqSchool();
  const {postCourse} = useReqCourse();
  const {getLessons} = useReqLesson();
  const courseTypesTDC = [
    'TDC Face to Face'
  ]
  const courseTypesPDC = [
    'PDC Automatic Motorcycle',
    'PDC Manual Motorcycle',
    'PDC Automatic Car',
    'PDC Manual Car'
  ]
  const [viewCourses,setViewCourses] = useState(courseTypesPDC);

  function findCourse(valueToFind) {
    for (let i = 0; i < data.courses.length; i++) {
      const course = data.courses[i];
      if (course.hasOwnProperty('type') && course.type === valueToFind) {
        return course;
      }
    }
    return false;
  }

  async function createCourse(course: string){
    postCourse({type: course});
    getSchool({schoolId: null});
    getSchool({schoolId: null});
  };

  useEffect(()=>{
    getSchool({
      schoolId: null
    });
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  return <>
    <Grid item xs={12} sx={{padding:"40px"}}>
      <Box display="flex" mt={3} gap={3} flexWrap={"wrap"} mb={3}>
        <Paper variant="elevation" elevation={2} sx={{padding:"1em 3em 1em 1em",borderRadius:"8px",minWidth:'300px'}}>
          <Typography variant="body1" color="primary" fontWeight={700}>PRACTICAL DRIVING COURSES</Typography>
          <Typography variant="subtitle2" color="initial">Courses</Typography>
          <Button sx={{marginTop:"25px"}} variant="contained" onClick={()=>{setViewCourses(courseTypesPDC)}}>
            View
          </Button>
        </Paper>
        <Paper variant="elevation" elevation={2} sx={{padding:"1em 3em 1em 1em",borderRadius:"8px",minWidth:'300px'}}>
          <Typography variant="body1" color="primary" fontWeight={700}>THEORETICAL DRIVING COURSES</Typography>
          <Typography variant="subtitle2" color="initial">Courses</Typography>
          <Button sx={{marginTop:"25px"}} variant="contained" 
            onClick={()=>{setViewCourses(courseTypesTDC)}}>
            View
          </Button>
        </Paper>
        
      </Box>
      <Box display="flex" mb={3} gap={3}>
        {data ? <>
          {viewCourses.map((course)=>(
            <>
              {findCourse(course) ? (
                ''
              ) :  <Chip variant="outlined" label={`Create ${course}`}  onClick={() => createCourse(course)}/> }
            </>
          ))}
        </>
        : ''}
      </Box>
      <Box display="flex" flexDirection={"column"} gap={1} >
        {data ? <>
          {viewCourses.map((course)=>(
              <>
                {findCourse(course) ? (
                  <CourseAccordion 
                    variant='manage' 
                    title= {findCourse(course).type}
                    courseId= {findCourse(course).courseId}
                  />
                ) : '' }
              </>
            ))}
          </>
        : ''}
      </Box>
    </Grid>
    
  </> 
  // return (
  //   <Grid item xs={12} sx={{padding:"40px"}}>
  //     <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
  //       {data ? <>
  //         {courseTypes.map((course)=>(
  //           <>
  //             {findCourse(course) ? (
  //               <CourseAccordion 
  //                 variant='manage' 
  //                 title= {findCourse(course).type}
  //                 courseId= {findCourse(course).courseId}
  //               />
  //             ) : '' }
  //           </>
  //         ))}
  //       </>
  //       : ''}

        // {data ? <>
        //   {courseTypes.map((course)=>(
        //     <>
        //       {findCourse(course) ? (
        //         ''
        //       ) : <Button onClick={() => createCourse(course)}> Create {course} Course </Button> }
        //     </>
        //   ))}
        // </>
        // : ''}
  //     </div>
  //   </Grid>
  // )
  
}

export default Courses

