import React,{useState,useContext, useEffect} from 'react'

// mui utilities
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {  Grid, Typography,Modal , TextField, IconButton } from '@mui/material';
// image
import patternImg from '../../Images/Resources/Pattern.jpg';
import studentImg from '../../Images/Resources/student.png';
import schoolImg from '../../Images/Resources/school.png';


// Hooks
import { useAuth } from '../../Hooks/useAuth';
import { SnackbarContext } from '../../Context/SnackbarContext';
import useEmail from '../../Hooks/useEmail';
import useCounter from '../../Hooks/useCounter';
import CircleIcon from '@mui/icons-material/Circle';
import CourseCard from '../../Components/CourseCard';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius:'8px',
  boxShadow: 24,
  p: 4,
};



function Index() {
  // * Modal Open
  const [open, setOpen] = useState("");

  const{setOpenSnackBar} = useContext(SnackbarContext)

  const { register, checkEmail } = useAuth();
  const { sendEmail } = useEmail();
  const {timer,setTimer} = useCounter();
  const styleContainer = {
    minHeight:"100vh",
    display:"grid",
    gridTemplateColumns:{md:".4fr .6fr",sm:"1fr"},
  };

  let otp = '';

  const [role, setRole] = useState('')
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [form, setForm] = useState({
    name: '',
    first: '',
    middle: '',
    last: '',
    extension: '',
    sex: '',
    birthday: new Date(dayjs().subtract(15, 'year').toDate()),
    address: '',
    contact: '',
    about: '',
    email: '',
    password: '',
    role: '',
    accreditation:'',
    schedules: [{
      name: "Morning",
      from: 0,
      to: 12
    },{
      name: "Afternoon",
      from: 13,
      to: 23
    }]
  });

  const [passwordSeverity,setPasswordSeverity] = useState(false)
  const [verificationCode, setVerificationCode] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpExpiration, setOtpExpiration] = useState<Date | null>(null);

  const handleChangeVerify = (event) => {
    // Ensure that the entered value contains only numbers
    // const sanitizedValue = event.target.value.replace(/[^0-9]/g, '');

    // Set the value, considering the maximum length of 6
    setVerificationCode(event.target.value.substring(0, 6));
  };

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeBirthday = (date: any) => {
    setForm({
      ...form,
      birthday: date.toDate(),
    });
  };

  function generateOTP(){
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let otp = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters.charAt(randomIndex);
    }

    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);
    setOtpExpiration(expirationTime);
  
    return otp;
  }

  function checkOTPExpiration() {
    if (otpExpiration && new Date() > otpExpiration) {
      // OTP has expired, reset OTP and expiration time
      otp = generateOTP();
      setOtpCode(otp);
      // Optionally, you can notify the user that the OTP has expired
      setOpenSnackBar((openSnackBar) => ({
        ...openSnackBar,
        severity: 'warning',
        note: 'OTP has expired. Please request a new one.',
      }));
    }
  }
 
  async function submit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if (form.password === confirmPassword) {
      register(form);
    } 
    else {
      setOpenSnackBar(openSnackBar => ({
        ...openSnackBar,
        severity:'error',
        note:"Passwords do not match",
      })); 
    }
  };

  async function resendOTP() {
    otp = generateOTP();
    setOtpCode(otp);
    sendEmail({
      email: form.email,
      content: `Your One Time Password is: ${otp}`
    });
    setOpen("verify");
    setTimer({minutes:5,seconds:0})
  }
  async function submitRegister(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if(await checkEmail(form.email)){
      setOpenSnackBar(openSnackBar => ({
        ...openSnackBar,
        severity:'error',
        note:"Email is used already, Try other email!",
      })); 
    }else{
      if (form.password === confirmPassword) {
        otp = generateOTP();
        setOtpCode(otp);
        sendEmail({
          email: form.email,
          content: `Your One Time Password is: ${otp}`
        });
        setOpen("verify");
        setTimer({minutes:5,seconds:0})
      } 
      else {
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'error',
          note:"Passwords do not match",
        })); 
      }
    }
  };

  async function verifyOTP(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    if (otpCode === verificationCode) {
      setOpen("");
      register(form);
    } 
    else {
      setOpenSnackBar(openSnackBar => ({
        ...openSnackBar,
        severity:'error',
        note:"Invalid OTP",
      })); 
    }
  }

  function isStrongPassword(password) {
    // Check for at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(password);
  
    // Check for at least one lowercase letter
    const hasLowercase = /[a-z]/.test(password);
  
    // Check for at least one number
    const hasNumber = /\d/.test(password);
  
    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    // Check for minimum length of 8 characters
    const hasMinLength = password.length >= 8;
  
    // Combine all criteria
    const isStrong =
      hasUppercase && hasLowercase && hasNumber && hasSpecialChar && hasMinLength;
  
    return isStrong;
  }
  const [timerComplete, setTimerComplete] = useState(false);
  const [slider,setSlider] = useState(1);
  const handleTimerComplete = () => {
    setTimerComplete(true);
  };
  useEffect(()=>{
    if(form.password){
      setPasswordSeverity(isStrongPassword(form.password))
    }
  },[form.password])


  useEffect(() => {
    // Check OTP expiration every second
    const intervalId = setInterval(checkOTPExpiration, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [otpExpiration]);

  return (
    <Box sx={styleContainer}>
      <Box sx={{backgroundColor:"#2F2E5A",minHeight:"100%", display:{md:"flex",xs:"none"},alignItems:"end", justifyContent:"start",padding:"4% 5%", position:"relative",overflow:"hidden"}}>
        <img style={{position:"absolute", height:"120%", top:"0",left:"0",opacity:".03"}} src={patternImg} alt="" />
        <Box sx={{position:"absolute",top:"55%",left:"50%",transform:"translate(-50%,-50%)"}}>
          {slider === 1? <CourseCard variant={"theoretical"} title={"Theoretical Driving"} display={true} description={"A theoretical driving course imparts essential knowledge about traffic laws, road safety, and vehicle operation through classroom-based instruction. It is a prerequisite for obtaining a learner's permit and helps individuals understand the rules of the road."}/>:""}
          {slider === 2?<CourseCard variant={"practical"} title={"Practical Driving"} display={true} description={"A practical driving course provides hands-on, on-road experience with a certified instructor to develop driving skills and confidence. It's a crucial step in preparing for a driver's license, teaching students how to safely operate a vehicle in real-world traffic situations."}/>:""}

          <Box display="flex" marginTop={4} justifyContent={"center"} gap={2}>
            <IconButton aria-label="" onClick={()=>{setSlider(1)}}>
              <CircleIcon sx={slider !== 1?{transform:"scale(.8)",color:"white",transition:"all ease .3s"}:{transform:"scale(1.2)",color:"#E24B5B",transition:"all ease .3s"}}/>
            </IconButton>
            <IconButton aria-label="" onClick={()=>{setSlider(2)}}>
              <CircleIcon sx={slider !== 2?{transform:"scale(.8)",color:"white",transition:"all ease .3s"}:{transform:"scale(1.2)",color:"#E24B5B",transition:"all ease .3s"}}/>
            </IconButton>
          </Box>
        </Box>
      </Box>
      <div style={{minHeight:"100%",maxWidth:"1200px", display:"flex",alignItems:"center",padding:"50px 0 50px 4em"}}>
        <div style={{width:"90%"} }>
          {(!role)?
          <>
            <Typography variant="h4" textAlign={"center"} gutterBottom color="primary.main">
              I am a
            </Typography>
            
            <Grid container spacing={2} width={"100%"}  mt={"40px"}>
              <Grid item md={6} xs={12}>
                <Paper elevation={3} style={{padding:"1em"}}  sx={{boxShadow: 3,"&:hover": {boxShadow: 8,cursor:"pointer"},}} onClick={()=> {
                  setRole("student");
                  setForm({
                    ...form,
                    role: "student",
                  });
                }}>
                  <Box
                    sx={{
                      padding: "3em 0 2em",
                      display: 'flex',
                      justifyContent:'center',
                      width:'100%',
                    }}
                  >
                  <img width={"100px"} height={"100px"} src={studentImg} alt="" />
                  </Box>
                  <Typography variant="h6" textAlign={"center"} gutterBottom color="#00BBD3">
                    Student
                  </Typography>
                  <Typography variant="body2"  gutterBottom >
                    A student driver is an individual who is learning how to operate a motor vehicle. This person is typically a beginner and is in the process of obtaining a driver's license.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item md={6} xs={12}>
              <Paper elevation={3} style={{padding:"1em"}}  sx={{boxShadow: 3,"&:hover": {boxShadow: 8,cursor:"pointer"},}} onClick={()=> {
                  setRole("school");
                  setForm({
                    ...form,
                    role: "admin",
                  });
                }}>
                  <Box
                    sx={{
                      padding: "3em 0 2em",
                      display: 'flex',
                      justifyContent:'center',
                      width:'100%',
                    }}
                  >
                  <img width={"100px"} height={"100px"} src={schoolImg} alt="" />
                  </Box>
                  <Typography variant="h6" textAlign={"center"} gutterBottom color="#00BBD3">
                    Driving School
                  </Typography>
                  <Typography variant="body2"  gutterBottom >
                  A driving school is an educational institution that provides instruction and hands-on practice to individuals seeking to acquire the knowledge and skills necessary for safe and responsible driving.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </>
          :
            <Typography variant="h3" gutterBottom color="primary.main">
              REGISTER
            </Typography>
          }
          {/* School Register Form */}
          {(role === "school")? 
            <form onSubmit={submitRegister}>
              <Grid container spacing={2} width={"100%"} mt="20px" mb={"20px"}>
                <Grid item  xs={12}>
                  <TextField
                    fullWidth
                    id="schoolName"
                    label="School Name"
                    variant="outlined"
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item  xs={12}>
                  <TextField
                    fullWidth
                    id="address"
                    label="Address"
                    variant="outlined"
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item  xs={12}>
                  <TextField
                    fullWidth
                    id="accreditation"
                    label="Accreditation"
                    variant="outlined"
                    required
                    name="accreditation"
                    value={form.accreditation}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item  md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>
                {/* <Grid item  md={2} xs={3} >
                  <Button fullWidth variant="contained" sx={{background:"#414141",height:"100%"}} onClick={()=>{setOpen("verify"); verifyEmail()}}>verify</Button>
                </Grid> */}
                <Grid item  md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="contactNo"
                    label="Contact Number"
                    variant="outlined"
                    required
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                  />
                </Grid>
                
                <Grid item  md={6} xs={12}>
                  <TextField
                    fullWidth
                    type='password'
                    id="password"
                    label="Password"
                    variant="outlined"
                    required
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  {form.password && !passwordSeverity?<>
                    <Typography variant="subtitle1" color="error" mt={2}>Your password must have a:</Typography>
                    <Typography variant="body2" color="initial">- Number</Typography>
                    <Typography variant="body2" color="initial">- Uppercase and Lowercase Letter</Typography>
                    <Typography variant="body2" color="initial">- Special Character</Typography>
                    <Typography variant="body2" color="initial" mb={3}>- Minimum of 8 characters</Typography>
                    
                  </>:""}
                </Grid>
                <Grid item  md={6} xs={12}>
                  <TextField
                    fullWidth
                    type='password'
                    id="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </Grid>
                
              </Grid>
              
              <Button fullWidth variant="contained"  disabled={(!(passwordSeverity))?true:false}  color="primary" type="submit">
                Sign Up
              </Button>
              <Button href='login' fullWidth variant="text" color="primary" style={{marginTop:"10px"}}>
                Login
              </Button>
            </form>
          :""}

          {/* Student Register Form */}

          {(role === "student")? 
            <form onSubmit={submitRegister}>
              <Grid container spacing={2} width={"100%"} mt="20px" mb={"20px"}>
                <Grid item lg={4} md={8} xs={12}>
                  <TextField
                    fullWidth
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    required
                    name="first"
                    value={form.first}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={2}  md={4} xs={12}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Middle Name"
                    variant="outlined"
                    name="middle"
                    value={form.middle}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={4} md={8} xs={12}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    required
                    name="last"
                    value={form.last}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item lg={2} md={4} xs={12}>
                  <TextField
                    fullWidth
                    id="suffix"
                    label="Suffix"
                    variant="outlined"
                    name="extension"
                    value={form.extension}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item  md={6} xs={12} >
                  <TextField
                    style={{paddingTop:"9px"}}
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Sex"
                    required
                    name="sex"
                    value={form.sex}
                    onChange={handleChange}
                  >
                    <MenuItem  value={"male"}>
                      Male
                    </MenuItem>
                    <MenuItem  value={"female"}>
                      Female
                    </MenuItem>
                  </TextField>
                </Grid>
                
                <Grid item  md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                      <DatePicker
                        slotProps={{ textField: { fullWidth: true } }}
                        label="Birthday"
                        value={dayjs(form.birthday)}
                        onChange={handleChangeBirthday}
                        maxDate={ dayjs().subtract(15, 'year')}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>


                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    type='email'
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>


                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    type='password'
                    id="password"
                    label="Password"
                    variant="outlined"
                    required
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  {form.password && !passwordSeverity?<>
                    <Typography variant="subtitle1" color="error" mt={2}>Your password must have a:</Typography>
                    <Typography variant="body2" color="initial">- Number</Typography>
                    <Typography variant="body2" color="initial">- Uppercase and Lowercase Letter</Typography>
                    <Typography variant="body2" color="initial">- Special Character</Typography>
                    <Typography variant="body2" color="initial" mb={3}>- Minimum of 8 characters</Typography>
                    
                  </>:""}
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    type='password'
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            
              <Button fullWidth variant="contained" color="primary"  disabled={(!(passwordSeverity))?true:false} type="submit">
                Sign Up
              </Button>
              <Button href='login' fullWidth variant="text" color="primary" style={{marginTop:"10px"}}>
                Login
              </Button>
            
            </form>
          :""}
          
        </div>
      </div>
      <Modal
          open={open.length > 0}
          onClose={()=>{setOpen("")}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
              {/* Enrollment Request  */}
              {(open === "verify")?<>
                  <form onSubmit={verifyOTP}>
                    <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                      Email verification
                    </Typography>
                    <Typography id="modal-modal-title"  variant="body2" fontWeight={400} component="h2">
                      We emailed you a 6 digit code. Please check your email and enter the code to complete the registration.
                    </Typography>
                    <Grid container spacing={1} mt={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="verify"
                          onChange={handleChangeVerify}
                          inputProps={{
                            maxLength: 6 // Allow only numbers
                          }}
                        />
                        <Box display="flex"  gap={"4px"} alignItems={"center"} mt={1} >
                          <Typography variant="body2" color="initial" sx={{opacity:".6"}}>Cant received the OTP?</Typography> 
                          <Button
                            variant="text"
                            color="primary"
                            onClick={resendOTP}
                            disabled={timer.minutes !== 0 || timer.seconds !== 0}
                          >
                            Resend {timer.minutes !== 0 || timer.seconds !== 0?<>({timer.minutes} : {timer.seconds})</>:""} 
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={12} mt={1} mb={1}>
                      </Grid>
                      {/* <Grid item sm={4} xs={12}>
                          <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                              cancel
                          </Button>
                      </Grid> */}
                      <Grid item  xs={12}>
                          <Button variant="contained" fullWidth color="primary"
                            type='submit'
                          >
                              Verify
                          </Button>
                      </Grid>
                    </Grid>
                  </form>
              </>:""}
          </Box>
      </Modal>
    </Box>
  )
}

export default Index