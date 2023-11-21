
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
import { useAuth } from '../../../Hooks/useAuth';


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

  const {data, loading, getSchool} = useReqSchool();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect (()=> {
    getSchool({
        schoolId: null
    })
  },[])

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
                    src="/static/images/avatar/1.jpg"
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
                  <form action="">
                    <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                      Update Profile
                    </Typography>
                    <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                      Input you want to udpate
                    </Typography>
                    <Grid container spacing={1} mt={2}>
                      <Grid item xs={12}>
                        <TextField
                          id="About"
                          label="About"
                          fullWidth
                          multiline
                          // value={}
                          // onChange={}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="email"
                          label="Email"
                          fullWidth
                          // value={}
                          // onChange={}
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
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" color="initial" mb={"5px"}>Profile Picture</Typography>
                        <TextField
                          id="contact"
                          fullWidth
                          type='file'
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
                            onClick={() => {
                            }}
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