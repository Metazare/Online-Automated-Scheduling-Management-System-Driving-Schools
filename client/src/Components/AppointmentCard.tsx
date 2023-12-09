import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import Avatar from '@mui/material/Avatar'
import ChatIcon from '@mui/icons-material/Chat';
import moment from 'moment';

type Props= {
    modalOpen : React.Dispatch<React.SetStateAction<string>>
    studentName: string,
    instructorName: string,
    instructorID: string,
    courseName: string,
    schedule: string,
    appointmentId?: string
    selectAppointment?: React.Dispatch<React.SetStateAction<any>>,
    formResched?: any
}

function AppointmentCard(props:Props) {
  const {modalOpen, studentName, instructorName, courseName, schedule,instructorID, appointmentId, selectAppointment, formResched} = props
  console.log(appointmentId)
    return (
        <Paper variant="elevation" elevation={1} sx={{padding:"1em"}}>
            <div style={{display:"flex"}}>
                <div style={{flexGrow:'1'}}>
                    <Typography variant="h6" fontWeight={600} color="primary" >{courseName}</Typography>
                    <Typography variant="body2" mt={"-5px"} color="initial" >{moment(schedule).format('lll')}</Typography>
                </div>
                {!!studentName?<>
                  <IconButton aria-label="resched" size="large" onClick={()=>{
                      modalOpen("resched");
                      if (selectAppointment && formResched) {
                        selectAppointment({...formResched, appointmentId: appointmentId});
                      }
                    }}>
                    <EventRepeatIcon fontSize="inherit" />
                  </IconButton>
                </>:""}
                
            </div>
            {!!studentName?<>
              <div style={{margin:" 5px 0",display:"flex",gap:'10px', alignItems:"center"}}>
                <Avatar variant="circular"  alt={studentName} sx={{ width: '30px', height: '30px' }} />
                <div>
                  <Typography variant="subtitle2" color="initial" >{studentName}</Typography>
                  <Typography variant="body2"  mt={"-5px"} color="initial" >Student</Typography>
                </div>
              </div>
              </>:""}
            <div style={{margin:" 15px 0 0",display:"flex",gap:'10px', alignItems:"center",padding:".5em", background:"#D9D9D9", borderRadius:"8px"}}>
              <Avatar variant="circular"  alt={instructorName} sx={{ width: '40px', height: '40px' }} />
              <div style={{flexGrow:"1"}}>
                <Typography variant="subtitle1" color="initial" fontWeight={500} >{instructorName}</Typography>
                <Typography variant="body1"  mt={"-5px"} color="initial" >Instructor</Typography>
              </div>
              {!!studentName?"":
                <IconButton aria-label="" href={`/chat/instructor/${instructorID}`}>
                  <ChatIcon/>
                </IconButton>
              }
            </div>

        </Paper>
    )
}

export default AppointmentCard