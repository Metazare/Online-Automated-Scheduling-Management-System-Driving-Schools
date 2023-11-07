import React,{useState} from 'react'
import Typography from '@mui/material/Typography'
import { Grid,Button, Paper , Modal,Box, TextField,IconButton } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import TESTCalendar from '../../../Components/TESTCalendar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// TODO Calendar and resched Modal

// Components
import AppointmentCard from '../../../Components/AppointmentCard';

// Style for Modal
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius:'8px',
    boxShadow: 24,
    p: 4,
}; 

function Appointments() {

    // * Reason Value 
    const [reason,setReason] = useState("")

    // * Declaration for adding new appointments form
    const [form,setForm] = useState({
        student:"",
        instructor:"",
        vehicle:"",
        dateTime: dayjs('2022-04-17T15:30')
    })
    const [formResched,setFormResched] = useState({
        reschedDateTime:dayjs('2022-04-17T15:30'),
        reason:"",
    })
    // * Open Modal 
    const [open, setOpen] = useState("");

    return <>
        {/* // * Appointment body Container  */}
        <Grid item xs={8} sx={{padding:"40px"}}>
            <div style={{display:"flex", alignItems:"center"}}>
                <div style={{flexGrow:"1"}}>
                    <Typography variant="h6" color="primary" >My Appointments</Typography>
                    <Typography variant="body2" color="initial" >4 Results</Typography>
                </div>
                <Button variant="text" color="primary" sx={{background:"white",boxShadow:5}} startIcon={<AddIcon/>} onClick={()=>{setOpen("add")}}>
                    add
                </Button>
            </div>

            <Grid container spacing={2} mt={1}>
                <Grid item md={6} xs={12}>
                    <AppointmentCard modalOpen={setOpen}/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard modalOpen={setOpen}/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard modalOpen={setOpen}/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard modalOpen={setOpen}/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard modalOpen={setOpen}/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard modalOpen={setOpen}/>
                </Grid>
            </Grid>
        </Grid>
        {/* //* Calendar  Container */}
        <Grid item xs={4} sx={{padding:"40px"}}>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em"}}>
                <TESTCalendar/>
            </Paper>
        </Grid>

        {/* //* Modal  Container */}
        <Modal
            open={open.length > 0}
            onClose={()=>{setOpen("")}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {open === "add"?<>
                    <form action="">
                        <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                            Add Appointment
                        </Typography>
                        <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                            Please fill up appointment form 
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-select-currency"
                                    select
                                    label="Student"
                                    required
                                    value={form.student}
                                    onChange={(event) => {
                                        setForm({...form, student: event.target.value });
                                    }}
                                >
                                    <MenuItem  value={"1"}>
                                        Student # 1
                                    </MenuItem>
                                    <MenuItem  value={"2"}>
                                        Student # 2
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="outlined-select-currency"
                                    select
                                    label="instructor"
                                    required
                                    value={form.instructor}
                                    onChange={(event) => {
                                        setForm({...form, instructor: event.target.value });
                                    }}
                                >
                                    <MenuItem  value={"1"}>
                                        instructor # 1
                                    </MenuItem>
                                    <MenuItem  value={"2"}>
                                        instructor # 2
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Vehicle (Optional)"
                                    value={form.vehicle}
                                    onChange={(event) => {
                                        setForm({...form, vehicle: event.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker label="Date and Time" 
                                            slotProps={{ textField: { fullWidth: true } }}
                                            value={form.dateTime}
                                            onChange={(newValue) => {
                                                setForm({...form, dateTime: dayjs(newValue)});
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item  xs={12} mt={"4"} height={"40px"}>
                                
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                    cancel
                                </Button>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Button variant="contained" fullWidth color="primary">
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>:""}
                {open === "resched"?<>
                    <form action="">
                        <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                            Reschedule Appointment
                        </Typography>
                        <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                            Please input your desired date
                        </Typography>

                        <Grid container spacing={2}>
                            
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DateTimePicker']}>
                                        <DateTimePicker label="Date and Time" 
                                            slotProps={{ textField: { fullWidth: true } }}
                                            value={form.dateTime}
                                            onChange={(newValue) => {
                                                setForm({...form, dateTime: dayjs(newValue)});
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="reason"
                                    label="Reason of Resched"
                                    value={formResched.reason}
                                    onChange={(event) => {
                                        setFormResched({...formResched, reason: event.target.value});
                                    }}
                                />
                            </Grid>
                            <Grid item  xs={12} mt={"4"} height={"40px"}>
                                
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                    cancel
                                </Button>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Button variant="contained" fullWidth color="primary">
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>:""}
            </Box>
        </Modal>
    </>
    
}

export default Appointments