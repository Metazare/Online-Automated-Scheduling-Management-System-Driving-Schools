
import React, {useEffect,useState} from 'react'
// * MUI Imports
import { Box,Avatar,Typography,Container, Grid,Modal , TextField ,Button } from '@mui/material'
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// * Tabs
import Home from './Home'
import Requests from './Requests';
import Appointments from './Appointments';
import Courses from './Courses';
import Students from './Students';
import Instructors from './Instructors';

import useReqSchool from '../../../Hooks/useReqSchool';
import useFirebase from '../../../Hooks/useFirebase';
import { useAuth } from '../../../Hooks/useAuth';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius:'8px',
  boxShadow: 24,
  p: 4,
};
function ManageSchool() {
  const [open, setOpen] = useState("");
  // * Menu 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const {getUser} = useAuth();
  const {uploadFile} = useFirebase();
  const {data, loading, getSchool, error, editSchool} = useReqSchool();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [form, setForm] = useState<any>({
    schoolId: '',
    name: '',
    email: '',
    about: '',
    address: '',
    contact: '',
    profile: '',
    schedules: [{
      name: "Morning",
      from: 0,
      to: 0
    }, {
      name: "Afternoon",
      from: 0,
      to: 0
    }]
  })

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        await getSchool({
          schoolId: null,
        });
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching school data: ', error);
      }
    };
  
    fetchSchoolData();
  }, []);
  
  useEffect(() => {
    if (data) {
      setForm({
        schoolId: data.schoolId || "",
        name: data.name || "",
        email: data.email || "",
        about: data.about || "",
        address: data.address || "",
        contact: data.contact || "",
        profile: data.profile || "",
        schedules: data.schedules || [{name: "Morning", from: 0, to: 0}, {name: "Afternoon", from: 0, to: 0}]
      });
    }
  }, [data]);

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form)
    editSchool(form);
    window.location.reload();
  }
  
  async function uploadProfile(file) {
    const url = await uploadFile(file, 'oasms');
    setForm({
      ...form,
      profile: url
    })
    console.log( url)
  }

  if (loading) {
      return <div>Loading...</div>
  }

  return <>
    <div style={{ background: '#DEDEDE',width:"100vw",margin:'auto',padding:"1em 1em 0"}}>
        <Container maxWidth="lg">
            <div style={{padding:"3.8rem 0",}}>
                {/* <a href="/" style={{display:"flex", gap:"5px",alignItems:"center", marginBottom:"30px"}}>  
                    <ArrowBackIcon/>
                    <Typography variant="subtitle1" color="initial"> Go Back</Typography>
                </a> */}
                <Box
                    sx={{
                    display: 'flex',
                    gap:"25px",
                    alignItems:"center"
                    }}
                >
                    <Avatar
                    alt={data?.name}
                    src={data?.profile}
                    sx={{ width: 80, height: 80 }}
                    />
                    <div style={{flexGrow:"1"}}>
                    <Typography variant="h4" fontWeight={500} color="initial">{data?.name}</Typography>
                    <Box
                        sx={{
                        display: 'flex',
                        gap:"10px"
                        }}
                    >
                        <Box
                        sx={{
                        display: 'flex',
                        gap:"5px"
                        }}
                        >
                        <CallIcon/> 
                        <Typography variant="body1" fontWeight={500}>{data?.contact}</Typography>
                        </Box>
                        <Box
                        sx={{
                        display: 'flex',
                        gap:"5px"
                        }}
                        >
                        <EmailIcon/> 
                        <Typography variant="body1" fontWeight={500}>{data?.email}</Typography>
                        </Box>
                    </Box>
                    </div>
                    {getUser()==="admin"?
                    <>
                      <IconButton aria-label="" onClick={handleClick}>
                        <MoreVertIcon/>
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={()=>{handleClose(); setOpen("infoUpdate")}}>Update Information</MenuItem>
                      </Menu>
                    </>
                    :""}
                    
                </Box>
            </div>
            
              {getUser()==="admin"?

                <Tabs value={value} onChange={handleChange} >
                  <Tab label="Home" />
                  <Tab label="Appointments" />
                  <Tab label="Courses" />
                  <Tab label="Requests" />
                  <Tab label="Students" />
                  <Tab label="Instructors" />
                </Tabs>

              :
                <Tabs value={value} onChange={handleChange} >
                  <Tab label="Home" />
                  <Tab label="Appointments" />
                  <Tab label="Courses" />
                  <Tab label="Students" />
                </Tabs>
              }
                
            
        </Container>
    </div>
    <Container maxWidth="lg" sx={{padding: "2em 1em "}}>
        <Grid container spacing={2}>
          {getUser()==="admin"?<>
            {value===0?
              <Home/>
            :""}
            {value===1?
              <Appointments/>
            :""}
            {value===2?
              <Courses/>
            :""}
            {value===3?
              <Requests/>
            :""}
            {value===4?
              <Students/>
            :""}
            {value===5?
              <Instructors/>
            :""}
          </>:<>
            {value===0?
              <Home/>
            :""}
            {value===1?
              <Appointments/>
            :""}
            {value===2?
              <Courses/>
            :""}
            {value===3?
              <Students/>
            :""}
          </>
          }
          
        </Grid>
    </Container>
    <Modal
          open={open.length > 0}
          onClose={()=>{setOpen("")}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
              {/* Enrollment Request  */}
              {(open === "infoUpdate")?<>
                  <form onSubmit={updateProfile}>
                    <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                      Update Profile
                    </Typography>
                    <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                      Input you want to udpate
                    </Typography>
                    <Grid container spacing={2} mt={2}>
                      <Grid item xs={12}>
                        <TextField
                          id="About"
                          label="About"
                          fullWidth
                          multiline
                          defaultValue={data?.about}
                          onChange={(e)=>{setForm({...form, about: e.target.value})}}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="email"
                          label="Email"
                          fullWidth
                          defaultValue={data?.email}
                          onChange={(e)=>{setForm({...form, email: e.target.value})}}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="contact"
                          label="Contact"
                          fullWidth
                          type=''
                          inputProps={{
                            maxLength: 10,
                            pattern: '[0-9]*', // Allow only digits
                          }}
                          defaultValue={data?.contact}
                          onChange={(e)=>{setForm({...form, contact: e.target.value})}}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" color="initial" mb={"5px"}>Profile Picture</Typography>
                        <TextField
                          id="contact"
                          fullWidth
                          type='file'
                          onChange={(e:any)=>{uploadProfile(e.target.files[0])}}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" color="primary" mb={"5px"}>Morning</Typography>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Typography variant="body1" mb={"5px"}>From</Typography>
                        {data?.schedules?.find(schedule => schedule.name === "Morning")?.from === undefined? "undefined":<>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker 
                                sx={{ width: '100%' }} 
                                defaultValue={
                                  dayjs().hour(data?.schedules?.find(schedule => schedule.name === "Morning")?.from ).minute(0)
                                }
                                onChange={(newValue) => {
                                  const morningSchedule = form.schedules.find(schedule => schedule.name === "Morning") || { name: "Morning", from: 0, to: 0 };
                                  setForm({
                                    ...form,
                                    schedules: [
                                      ...form.schedules.filter(schedule => schedule.name !== "Morning"),
                                      { ...morningSchedule, from: parseInt(dayjs(newValue).format(`HH`), 10) },
                                    ],
                                  });
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </>}

                        
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Typography variant="body1" color="initial" mb={"5px"}>To</Typography>
                        {data?.schedules?.find(schedule => schedule.name === "Morning")?.to === undefined? "undefined":<>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker 
                                sx={{ width: '100%' }} 
                                defaultValue={
                                  dayjs().hour(data?.schedules?.find(schedule => schedule.name === "Morning")?.to).minute(0)
                                }
                                onChange={(newValue) => {
                                  const morningSchedule = form.schedules.find(schedule => schedule.name === "Morning") || { name: "Morning", from: 0, to: 0 };
                                  setForm({
                                    ...form,
                                    schedules: [
                                      ...form.schedules.filter(schedule => schedule.name !== "Morning"),
                                      { ...morningSchedule, to: parseInt(dayjs(newValue).format(`HH`), 10) },
                                    ],
                                  });
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </>}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" color="primary"  mb={"5px"}>Afternoon</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body1" color="initial" mb={"5px"}>From</Typography>
                        {data?.schedules?.find(schedule => schedule.name === "Afternoon")?.from === undefined? "undefined":<>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker 
                                sx={{ width: '100%' }} 
                                defaultValue={
                                  dayjs().hour(data?.schedules?.find(schedule => schedule.name === "Afternoon")?.from).minute(0)
                                }
                                onChange={(newValue) => {
                                  const morningSchedule = form.schedules.find(schedule => schedule.name === "Afternoon") || { name: "Afternoon", from: 0, to: 0 };
                                  setForm({
                                    ...form,
                                    schedules: [
                                      ...form.schedules.filter(schedule => schedule.name !== "Afternoon"),
                                      { ...morningSchedule, from: parseInt(dayjs(newValue).format(`HH`), 10) },
                                    ],
                                  });
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </>}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body1" color="initial" mb={"5px"}>To</Typography>
                        {data?.schedules?.find(schedule => schedule.name === "Afternoon")?.to === undefined? "undefined":<>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                              <TimePicker 
                                sx={{ width: '100%' }} 
                                defaultValue={
                                  dayjs().hour(data?.schedules?.find(schedule => schedule.name === "Afternoon")?.to).minute(0)
                                }
                                onChange={(newValue) => {
                                  const morningSchedule = form.schedules.find(schedule => schedule.name === "Afternoon") || { name: "Afternoon", from: 0, to: 0 };
                                  setForm({
                                    ...form,
                                    schedules: [
                                      ...form.schedules.filter(schedule => schedule.name !== "Afternoon"),
                                      { ...morningSchedule, to: parseInt(dayjs(newValue).format(`HH`), 10) },
                                    ],
                                  });
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </>}
                      </Grid>
                      <Grid item xs={12} mt={2}>
                      </Grid>
                      <Grid item sm={4} xs={12}>
                          <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                              cancel
                          </Button>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                          <Button variant="contained" fullWidth color="primary"
                            type='submit'
                          >
                            Update
                          </Button>
                      </Grid>
                    </Grid>
                  </form>
              </>:""}
          </Box>
      </Modal>
  </>
}

export default ManageSchool