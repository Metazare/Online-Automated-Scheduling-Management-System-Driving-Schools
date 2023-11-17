import React,{useState,useContext} from 'react'

// mui utilities
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

// image
import patternImg from '../../Images/Resources/Pattern.jpg';
import studentImg from '../../Images/Resources/student.png';
import schoolImg from '../../Images/Resources/school.png';


// Hooks
import { useAuth } from '../../Hooks/useAuth';
import { SnackbarContext } from '../../Context/SnackbarContext';

function Index() {
  const{setOpenSnackBar} = useContext(SnackbarContext)

  const { register } = useAuth();

  const styleContainer = {
    minHeight:"100vh",
    display:"grid",
    gridTemplateColumns:".4fr .6fr"

  };


  


  const [role, setRole] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [form, setForm] = useState({
    name: '',
    first: '',
    middle: '',
    last: '',
    extension: '',
    sex: '',
    birthday: new Date(),
    address: '',
    contact: '',
    about: '',
    email: '',
    password: '',
    role: '',
  });
  
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

  return (
    <div style={styleContainer}>
      <div style={{backgroundColor:"#2F2E5A",minHeight:"100%", display:"flex",alignItems:"end", justifyContent:"start",padding:"4% 5%", position:"relative",overflow:"hidden"}}>
        <img style={{position:"absolute", height:"120%", top:"0",left:"0",opacity:".03"}} src={patternImg} alt="" />
        <svg width="40%" viewBox="0 0 573 147" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_278_99)"><path d="M110.744 73.0909C110.744 85.0665 108.474 95.2547 103.934 103.656C99.4301 112.056 93.2814 118.473 85.4883 122.906C77.731 127.303 69.0085 129.501 59.3207 129.501C49.5615 129.501 40.8032 127.285 33.0459 122.852C25.2885 118.42 19.1577 112.003 14.6535 103.602C10.1492 95.2011 7.89706 85.0308 7.89706 73.0909C7.89706 61.1153 10.1492 50.9271 14.6535 42.5263C19.1577 34.1255 25.2885 27.7266 33.0459 23.3295C40.8032 18.8968 49.5615 16.6804 59.3207 16.6804C69.0085 16.6804 77.731 18.8968 85.4883 23.3295C93.2814 27.7266 99.4301 34.1255 103.934 42.5263C108.474 50.9271 110.744 61.1153 110.744 73.0909ZM87.2042 73.0909C87.2042 65.3336 86.0424 58.7917 83.7188 53.4652C81.4309 48.1387 78.1957 44.0992 74.0132 41.3466C69.8307 38.594 64.9332 37.2177 59.3207 37.2177C53.7083 37.2177 48.8108 38.594 44.6282 41.3466C40.4457 44.0992 37.1926 48.1387 34.869 53.4652C32.5811 58.7917 31.4372 65.3336 31.4372 73.0909C31.4372 80.8482 32.5811 87.3901 34.869 92.7166C37.1926 98.0431 40.4457 102.083 44.6282 104.835C48.8108 107.588 53.7083 108.964 59.3207 108.964C64.9332 108.964 69.8307 107.588 74.0132 104.835C78.1957 102.083 81.4309 98.0431 83.7188 92.7166C86.0424 87.3901 87.2042 80.8482 87.2042 73.0909ZM140.679 128H115.798L153.709 18.1818H183.63L221.488 128H196.607L169.099 43.277H168.241L140.679 128ZM139.124 84.8342H197.894V102.958H139.124V84.8342ZM291.773 49.7653C291.344 45.4397 289.503 42.0794 286.25 39.6843C282.997 37.2892 278.582 36.0916 273.005 36.0916C269.216 36.0916 266.016 36.6278 263.407 37.7003C260.797 38.737 258.795 40.1848 257.401 42.0437C256.043 43.9026 255.363 46.0117 255.363 48.3711C255.292 50.3372 255.703 52.0531 256.597 53.5188C257.526 54.9845 258.795 56.2536 260.404 57.326C262.012 58.3627 263.871 59.2743 265.981 60.0607C268.09 60.8114 270.342 61.4549 272.737 61.9911L282.603 64.3505C287.394 65.4229 291.791 66.8529 295.794 68.6403C299.798 70.4277 303.266 72.6262 306.197 75.2358C309.128 77.8454 311.398 80.9197 313.007 84.4588C314.652 87.9979 315.492 92.0553 315.527 96.631C315.492 103.352 313.776 109.179 310.38 114.112C307.019 119.009 302.158 122.817 295.794 125.533C289.467 128.214 281.835 129.555 272.898 129.555C264.032 129.555 256.311 128.197 249.733 125.48C243.191 122.763 238.079 118.741 234.397 113.415C230.751 108.053 228.838 101.421 228.659 93.521H251.127C251.377 97.203 252.432 100.277 254.291 102.744C256.186 105.175 258.706 107.016 261.852 108.267C265.033 109.482 268.626 110.09 272.63 110.09C276.562 110.09 279.976 109.518 282.871 108.374C285.803 107.23 288.073 105.64 289.682 103.602C291.29 101.564 292.095 99.2228 292.095 96.5774C292.095 94.1108 291.362 92.0374 289.896 90.3572C288.466 88.6771 286.357 87.2472 283.569 86.0675C280.816 84.8878 277.438 83.8153 273.434 82.8501L261.476 79.8473C252.217 77.5952 244.907 74.074 239.545 69.2837C234.183 64.4935 231.519 58.041 231.555 49.9261C231.519 43.277 233.289 37.4679 236.864 32.4989C240.474 27.5299 245.425 23.6513 251.717 20.8629C258.009 18.0746 265.158 16.6804 273.166 16.6804C281.316 16.6804 288.43 18.0746 294.508 20.8629C300.62 23.6513 305.375 27.5299 308.771 32.4989C312.167 37.4679 313.919 43.2234 314.026 49.7653H291.773ZM331.145 18.1818H359.779L390.022 91.9659H391.309L421.552 18.1818H450.186V128H427.665V56.5217H426.753L398.333 127.464H382.997L354.578 56.2535H353.666V128H331.145V18.1818ZM528.89 49.7653C528.461 45.4397 526.62 42.0794 523.367 39.6843C520.114 37.2892 515.699 36.0916 510.122 36.0916C506.333 36.0916 503.133 36.6278 500.524 37.7003C497.914 38.737 495.912 40.1848 494.518 42.0437C493.16 43.9026 492.481 46.0117 492.481 48.3711C492.409 50.3372 492.82 52.0531 493.714 53.5188C494.643 54.9845 495.912 56.2536 497.521 57.326C499.13 58.3627 500.989 59.2743 503.098 60.0607C505.207 60.8114 507.459 61.4549 509.854 61.9911L519.721 64.3505C524.511 65.4229 528.908 66.8529 532.912 68.6403C536.915 70.4277 540.383 72.6262 543.314 75.2358C546.246 77.8454 548.516 80.9197 550.124 84.4588C551.769 87.9979 552.609 92.0553 552.645 96.631C552.609 103.352 550.893 109.179 547.497 114.112C544.137 119.009 539.275 122.817 532.912 125.533C526.584 128.214 518.952 129.555 510.015 129.555C501.149 129.555 493.428 128.197 486.85 125.48C480.308 122.763 475.196 118.741 471.514 113.415C467.868 108.053 465.955 101.421 465.777 93.521H488.244C488.495 97.203 489.549 100.277 491.408 102.744C493.303 105.175 495.823 107.016 498.969 108.267C502.15 109.482 505.743 110.09 509.747 110.09C513.679 110.09 517.093 109.518 519.989 108.374C522.92 107.23 525.19 105.64 526.799 103.602C528.407 101.564 529.212 99.2228 529.212 96.5774C529.212 94.1108 528.479 92.0374 527.013 90.3572C525.583 88.6771 523.474 87.2472 520.686 86.0675C517.933 84.8878 514.555 83.8153 510.551 82.8501L498.593 79.8473C489.335 77.5952 482.024 74.074 476.662 69.2837C471.3 64.4935 468.637 58.041 468.672 49.9261C468.637 43.277 470.406 37.4679 473.981 32.4989C477.591 27.5299 482.543 23.6513 488.834 20.8629C495.126 18.0746 502.275 16.6804 510.283 16.6804C518.434 16.6804 525.548 18.0746 531.625 20.8629C537.738 23.6513 542.492 27.5299 545.888 32.4989C549.284 37.4679 551.036 43.2234 551.143 49.7653H528.89Z" fill="#E24B5B"/></g><defs><clipPath id="clip0_278_99"><rect width="573" height="147" fill="white"/></clipPath></defs></svg>
      </div>
      
      

      <div style={{minHeight:"100%",maxWidth:"1200px", display:"flex",alignItems:"center",padding:"50px 0 50px 4em"}}>
        <div style={{width:"90%"} }>
          {(!role)?
          <>
            <Typography variant="h4" textAlign={"center"} gutterBottom color="primary.main">
              Select a Role
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
            <form onSubmit={submit}>
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
                    id="email"
                    label="Email"
                    variant="outlined"
                    required
                    name="email"
                    value={form.email}
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
              
              <Button fullWidth variant="contained" color="primary" type="submit">
                Sign Up
              </Button>
              <Button href='login' fullWidth variant="text" color="primary" style={{marginTop:"10px"}}>
                Login
              </Button>
            </form>
          :""}

          {/* Student Register Form */}

          {(role === "student")? 
            <form onSubmit={submit}>
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
                    type='password'
                    fullWidth
                    id="password"
                    label="Password"
                    variant="outlined"
                    required
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
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
            
              <Button fullWidth variant="contained" color="primary" type="submit">
                Sign Up
              </Button>
              <Button href='login' fullWidth variant="text" color="primary" style={{marginTop:"10px"}}>
                Login
              </Button>
            
            </form>
          :""}
          
        </div>
      </div>
    </div>
  )
}

export default Index