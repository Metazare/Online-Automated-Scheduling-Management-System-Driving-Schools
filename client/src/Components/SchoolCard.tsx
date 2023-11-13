import React from 'react'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useNavigate } from 'react-router-dom';

type Props = {
    schoolName: string,
    about: string,
    schoolId?: string,
    courseId?: string,
    courses?: any,
    variant:"enrolled" | ""
}

function SchoolCard({schoolName,about, schoolId, courses, variant, courseId}:Props) {
  const navigate = useNavigate();
    return (
        <div >
              {/* {variant === "enrolled"?
                <Paper variant="elevation" elevation={3} style={{padding:"1em 1em 3em",marginBottom:"-2.5em",background:"#2F2E5A"}}>
                    <Typography variant="subtitle2" color="#ffffff">{courses?.length} Courses</Typography>
                </Paper>
              :""} */}
            <Paper variant="elevation" elevation={3} sx={{padding:"3em 1em 1em"}}>
                <Avatar
                    alt={schoolName}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 86, height: 86,margin:"auto" }}
                />
                <Typography variant="h6" mt={4} color="initial" >{schoolName}</Typography>
                <Typography variant="body2" mt={1} color="initial">{about}</Typography>
                {variant === "enrolled" ?
                  <Button variant="contained" sx={{mt:"30px",width:"100%"}} color="primary" onClick={()=>navigate(`/course/${courseId}`)}>
                      view
                  </Button>
                :
                  <Button variant="contained" sx={{mt:"30px",width:"100%"}} color="primary" onClick={()=>navigate(`/school/${schoolId}`)}>
                      view
                  </Button>
                }
            </Paper>
        </div>
    )
}

export default SchoolCard