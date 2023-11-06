import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import Avatar from '@mui/material/Avatar'
function AppointmentCard() {
    return (
        <Paper variant="elevation" elevation={1} sx={{padding:"1em"}}>
            <div style={{display:"flex"}}>
                <div style={{flexGrow:'1'}}>
                    <Typography variant="h6" fontWeight={600} color="primary" >Practical Driving</Typography>
                    <Typography variant="body2" mt={"-5px"} color="initial" >Scheduled on Oct 25, 2023 at 1 pm</Typography>
                </div>
                <IconButton aria-label="resched" size="large">
                    <EventRepeatIcon fontSize="inherit" />
                </IconButton>
            </div>
            <div style={{margin:" 5px 0",display:"flex",gap:'10px', alignItems:"center"}}>
                <Avatar variant="circular"  alt="Harold James Castillo" sx={{ width: '30px', height: '30px' }} />
                <div>
                    <Typography variant="subtitle2" color="initial" >Harold James H. Castillo</Typography>
                    <Typography variant="body2"  mt={"-5px"} color="initial" >Student</Typography>
                </div>
            </div>
            <div style={{margin:" 15px 0 0",display:"flex",gap:'10px', alignItems:"center",padding:".5em", background:"#D9D9D9", borderRadius:"8px"}}>
                <Avatar variant="circular"  alt="Harold James Castillo" sx={{ width: '40px', height: '40px' }} />
                <div>
                    <Typography variant="subtitle1" color="initial" fontWeight={500} >Dianne Chrystalin Brandez</Typography>
                    <Typography variant="body1"  mt={"-5px"} color="initial" >Instructor</Typography>
                </div>
            </div>

        </Paper>
    )
}

export default AppointmentCard