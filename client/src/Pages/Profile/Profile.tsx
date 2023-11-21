import React,{useState} from 'react'
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
                  alignItems:"center",
                  }}
              >
                  <Avatar
                  // alt={data?.name}
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 80, height: 80 }}
                  />
                  <div style={{flexGrow:"1"}}>
                    <Typography variant="h4" fontWeight={500} color="initial">Dianne Chrystalin Castillo</Typography>
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
                        <Typography variant="body1" fontWeight={500}>0915-666-6147</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems:"center",
                          gap:"5px"
                        }}
                      >
                        <EmailIcon/> 
                        <Typography variant="body1" fontWeight={500}>chrystarin@gmail.com</Typography>
                      </Box>
                      <Box  
                        sx={{
                          display: 'flex',
                          alignItems:"center",
                          gap:"5px"
                        }}
                      >
                        <CakeIcon/> 
                        <Typography variant="body1" fontWeight={500}>Nov 25, 1999</Typography>
                      </Box>
                      <Box  
                        sx={{
                          display: 'flex',
                          alignItems:"center",
                          gap:"5px"
                        }}
                      >
                        {true?<MaleIcon/> :<FemaleIcon/> }
                        <Typography variant="body1" fontWeight={500}>Female</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems:"center",
                          gap:"5px",
                        }}
                      >
                        <PlaceIcon/> 
                        <Typography variant="body1" fontWeight={500}>San Mateo Abuab</Typography>
                      </Box>
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
                    <MenuItem onClick={()=>{handleClose(); setOpen("passUpdate")}}>Update Password</MenuItem>
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
                          id="location"
                          label="Location"
                          fullWidth
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
                      
                      <Grid item xs={6} >
                        <TextField
                        sx={{paddingTop:"8px"}}
                          fullWidth
                          id="outlined-select-currency"
                          select
                          label="Sex"
                          required
                          name="sex"
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
                              // value={dayjs(form.birthday)}
                              // onChange={handleChangeBirthday}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
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
              {(open === "passUpdate")?<>
                  <form action="">
                    <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                      Update Password
                    </Typography>
                    <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                      Change your password  
                    </Typography>
                    <Grid container spacing={1} mt={2}>
                      <Grid item xs={12}>
                        <TextField
                          id="currentPass"
                          label="Current Password"
                          fullWidth
                          type='password'
                          required
                          // value={}
                          // onChange={}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="newPass"
                          label="New Password"
                          fullWidth
                          type='password'
                          required
                          // value={}
                          // onChange={}
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
    </div>
  </>
}

export default Profile