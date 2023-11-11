import React, {useState, useEffect} from 'react'


// * MUI Imports
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material';

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

  const courseTypes = [
    'TDC Face to Face',
    'PDC Automatic Motorcycle',
    'PDC Manual Motorcycle',
    'PDC Automatic Car',
    'PDC Manual Car'
  ]

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
  
  return (
    <Grid item xs={12} sx={{padding:"40px"}}>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {data ? <>
          {courseTypes.map((course)=>(
            <>
              {findCourse(course) ? (
                <CourseAccordion 
                  variant='manage' 
                  title= {findCourse(course).type}
                  courseId= {findCourse(course).courseId}
                />
              ) : <Button onClick={() => createCourse(course)}> Create {course} Course </Button> }
            </>
          ))}
        </>
        : ''}
      </div>
    </Grid>
  )
  
}

export default Courses

