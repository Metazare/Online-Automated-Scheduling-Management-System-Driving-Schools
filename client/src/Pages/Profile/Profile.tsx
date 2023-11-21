import React,{useState, useEffect} from 'react'
import { Box,Avatar,Typography,Container, Grid,Modal , TextField ,Button } from '@mui/material'
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CakeIcon from '@mui/icons-material/Cake';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PlaceIcon from '@mui/icons-material/Place';

import useReqStudent from '../../Hooks/useReqStudent';
import useReqInstructor from '../../Hooks/useReqInstructor';
import useFirebase from '../../Hooks/useFirebase';
import {useAuth} from '../../Hooks/useAuth';

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
function Profile() {
  // * Modal Open
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

  const {getUser, User} = useAuth();
  const {instructors, loading: loadingInstructor, error: errorInstructor, getInstructor, editProfile} = useReqInstructor();
  const {downloadURL, uploading, uploadFile} = useFirebase();
  const {students, loading, error, getStudent, updateStudentProfile} = useReqStudent();
  const [instructor, setInstructor] = useState<any>(null);
  const [form, setForm] = useState<any>({
    studentId: "",
    instructorId: "",
    email: "",
    contact: "",
    address: "",
    sex: "",
    birthday: "",
    profile: "",
    password: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(getUser()==='student'){
          await getStudent({
            studentId: null,
          });
        }
        else{
          await getInstructor({
            instructorId: null,
          });
        }
        
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching student data: ', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    if (students) {
      setForm({
        studentId: students.studentId || "",
        email: students.email || "",
        contact: students.contact || "",
        address: students.address || "",
        sex: students.sex || "",
        birthday: students.birthday || "",
        profile: students.profile || "",
        password: students.password || "",
      });
    }
    if (instructors?.length > 0) {
      setInstructor(filterByInstructorId(instructors, User().instructorId)[0]);
      let instructor = filterByInstructorId(instructors, User().instructorId)[0];
      console.log(filterByInstructorId(instructors, User().instructorId)[0])
      setForm({
        instructorId: instructor.instructorId || "",
        email: instructor.email || "",
        contact: instructor.contact || "",
        address: instructor.address || "",
        profile: instructor.profile || "",
        password: instructor.password || "",
      });
    }
  }, [students, instructors]);

  function filterByInstructorId(data, targetInstructorId) {
    return data.filter((item) => item.instructorId === targetInstructorId);
  }

  async function uploadProfile(file) {
    const url = await uploadFile(file, 'oasms');
    setForm({
      ...form,
      profile: url
    })
    console.log( url)
  }

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    setOpen("");
    
    if(getUser()==='student'){
      updateStudentProfile(form);
    }
    else{
      editProfile(form);
    }
    // window.location.reload();
    
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return <>
    <div style={{ background: '#DEDEDE',width:"100vw",margin:'auto',padding:"1em 1em 0"}}>
      <Container maxWidth="lg">
          <div style={{padding:"3.8rem 0",}}>
              <Box
                  sx={{
                  display: 'flex',
                  gap:"25px",
                  alignItems:"center",
                  }}
              >
                  <Avatar
                  // alt={data?.name}
                  src={ getUser() === "student" ? students?.profile : instructor?.profile}
                  sx={{ width: 80, height: 80 }}
                  />
                  <div style={{flexGrow:"1"}}>
                    <Typography variant="h4" fontWeight={500} color="initial">
                      
                      {getUser() === "student" ? 
                        <>{students?.name?.first} {students?.name?.middle} {students?.name?.last} {students?.name?.suffix}</>
                      : 
                        <>{instructor?.name?.first} {instructor?.name?.middle} {instructor?.name?.last} {instructor?.name?.suffix}</>
                      }

                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap:"10px",
                        opacity:".7",
                        flexWrap:"wrap"
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems:"center",
                          gap:"5px",
                        }}
                      >
                        <CallIcon/> 
                        <Typography variant="body1" fontWeight={500}>
                          {getUser() === "student" ? <>{students?.contact}</> : <>{instructor?.contact}</>}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems:"center",
                          gap:"5px"
                        }}
                      >
                        <EmailIcon/> 
                        <Typography variant="body1" fontWeight={500}>
                          {/* {students?.email} */}
                          {getUser() === "student" ? <>{students?.email}</> : <>{instructor?.email}</>}
                          </Typography>
                      </Box>

                      {getUser() === "student" ?
                      <>
                        <Box  
                          sx={{
                            display: 'flex',
                            alignItems:"center",
                            gap:"5px"
                          }}
                        >
                          <CakeIcon/> 
                          <Typography variant="body1" fontWeight={500}>
                            {getUser() === "student" ? <>{students?.birthday}</> : <></>}
                          </Typography>
                        </Box>

                        <Box  
                          sx={{
                            display: 'flex',
                            alignItems:"center",
                            gap:"5px"
                          }}
                        >
                          {students?.sex==='male'?<MaleIcon/> :<FemaleIcon/> }
                          <Typography variant="body1" fontWeight={500}>{students?.sex}</Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems:"center",
                            gap:"5px",
                          }}
                        >
                          <PlaceIcon/> 
                          <Typography variant="body1" fontWeight={500}>{students?.address}</Typography>
                        </Box>
                      </>
                      :<></>}
                    </Box>
                  </div>
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
              </Box>
          </div>
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
                    <Grid container spacing={1} mt={2}>
                      <Grid item xs={12}>
                        <TextField
                          id="location"
                          label="Location"
                          fullWidth
                          value={form?.address}
                          onChange={(e)=>{setForm({...form, address: e.target.value})}}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="email"
                          label="Email"
                          fullWidth
                          value={form?.email}
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
                          value={form?.contact}
                          onChange={(e)=>{setForm({...form, contact: e.target.value})}}
                        />
                      </Grid>
                      {getUser() === "student" ? <>
                        <Grid item xs={6} >
                          <TextField
                          sx={{paddingTop:"8px"}}
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label="Sex"
                            required
                            name="sex"
                            defaultValue={form?.sex}
                            onChange={(e)=>{setForm({...form, sex: e.target.value})}}
                            // value={form.sex}
                            // onChange={handleChange}
                          >
                            <MenuItem  value={"male"}>
                              Male
                            </MenuItem>
                            <MenuItem  value={"female"}>
                              Female
                            </MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                              <DatePicker
                                slotProps={{ textField: { fullWidth: true } }}
                                label="Birthday"
                                value={dayjs(form?.birthday)}
                                // onChange={handleChangeBirthday}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </Grid>
                      </> : <></>}
                      <Grid item xs={12}>
                        <Typography variant="body1" color="initial" mb={"5px"}>Profile Picture</Typography>
                        <TextField
                          id="contact"
                          fullWidth
                          type='file'
                          onChange={(e:any)=>{uploadProfile(e.target.files[0])}}
                        />
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
    </div>
  </>
}

export default Profile