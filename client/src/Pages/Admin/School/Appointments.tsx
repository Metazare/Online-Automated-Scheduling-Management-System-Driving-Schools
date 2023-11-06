import React,{useState} from 'react'
import Typography from '@mui/material/Typography'
import { Grid,Button, Paper , Modal,Box, TextField,IconButton } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';



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

function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}
function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
        const timeout = setTimeout(() => {
        const daysInMonth = date.daysInMonth();
        const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));
            resolve({ daysToHighlight });
        }, 500);
        signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
        };
    });
}
const initialValue = dayjs('2022-04-17');
function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? '🌚' : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}
function Appointments() {

    // Calendar Controlled Value
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-01-13'));
    // * Reason Value 
    const [reason,setReason] = useState("")

    const [form,setForm] = useState({
        student:"",
        instructor:"",
        vehicle:"",
        dateNtime:""
    })

    const requestAbortController = React.useRef<AbortController | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

    const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fakeFetch(date, {
        signal: controller.signal,
    })
    .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
    })
    .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
        throw error;
        }
    });
        requestAbortController.current = controller;
    };
    React.useEffect(() => {
        fetchHighlightedDays(initialValue);
      // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, []);
    const handleMonthChange = (date: Dayjs) => {
        if (requestAbortController.current) {
            // make sure that you are aborting useless requests
            // because it is possible to switch between months pretty quickly
            requestAbortController.current.abort();
        }
    
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
};

    const [open, setOpen] = useState("");

    return <>
        {/* // * Appointment body  */}
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
                    <AppointmentCard/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <AppointmentCard/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={4} sx={{padding:"40px"}}>
            <Paper variant="elevation" elevation={3} sx={{padding:"1em"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        defaultValue={initialValue}
                        loading={isLoading}
                        onMonthChange={handleMonthChange}
                        renderLoading={() => <DayCalendarSkeleton />}
                        slots={{
                            day: ServerDay,
                        }}
                        slotProps={{
                            day: {
                                highlightedDays,
                            } as any,
                        }}
                        value={value} 
                        onChange={(newValue) => setValue(newValue)}
                    />
                </LocalizationProvider>
            </Paper>
        </Grid>
        <div>
            <Modal
                open={open.length > 0}
                onClose={()=>{setOpen("")}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {open === "add"?<>
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
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    label="Vehicle (Optional)"
                                    value={form.vehicle}
                                    onChange={(event) => {
                                        setForm({...form, vehicle: event.target.value });
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    id="startTime"
                                    label="Start Time"
                                    variant="outlined"
                                    type='datetime-local'
                                    required
                                    value={form.dateNtime}
                                    onChange={(event) => {
                                        setForm({...form, dateNtime: event.target.value });
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
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </>:""}
                </Box>
            </Modal>
        </div>
    </>
    
}

export default Appointments