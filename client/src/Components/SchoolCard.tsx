import React from 'react'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useNavigate } from 'react-router-dom';

type Props = {
    schoolName: String,
    about: String,
    schoolId: String,
    variant:"enrolled" | ""
}

function SchoolCard({schoolName,about, schoolId, variant}:Props) {
  const navigate = useNavigate();
    return (
        <div >
            {variant === "enrolled"?
                <a href="/">
                    <Paper variant="elevation" elevation={3} style={{padding:"1em 1em 3em",marginBottom:"-2.5em",background:"#2F2E5A"}}>
                        <Typography variant="subtitle2" color="#ffffff">2 Active Courses</Typography>
                    </Paper>
                </a>
            :""}
            <Paper variant="elevation" elevation={3} sx={{padding:"3em 1em 1em"}}>
                <Avatar
                    alt={"Remy Sharp"}
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 86, height: 86,margin:"auto" }}
                />
                <Typography variant="h6" mt={4} color="initial" >{schoolName}</Typography>
                <Typography variant="body2" mt={1} color="initial">{about}</Typography>

                <Button variant="contained" sx={{mt:"30px",width:"100%"}} color="primary" onClick={()=>navigate(`/school/${schoolId}`)}>
                    view
                </Button>
            </Paper>
        </div>
    )
}

export default SchoolCard