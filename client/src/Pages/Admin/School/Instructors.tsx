import React,{useState, useEffect} from 'react'
import {  Grid, IconButton, Typography, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useReqInstructor from '../../../Hooks/useReqInstructor';


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
function Instructors() {

    const {instructors, loading, credentials, getInstructor, createInstructor, updateInstructor} = useReqInstructor();

    // TODO Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // TODO End of Pagination
    // * Modal Open
    const [open, setOpen] = useState("");

    const [credential,setCredential] = useState({
        email:"",
        password:"wewe"
    })

    const[form,setForm] = useState({
        firstName:"",
        middleName:"",
        lastName:"",
        suffix:"",
        address:"",
        contact:"",
        email:"",
    })


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openAnchor = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const[instructorinstructors,setInstructorinstructors] = useState({
      instructorId: null,
      status: "active",
    })

    const[selected, setSelected] = useState()

    useEffect(()=>{
      getInstructor(instructorinstructors);
    }, [])

    return (
        <Grid item xs={12} sx={{padding:"40px"}}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  
                    <TableRow>
                        <TableCell >
                            Name
                        </TableCell>
                        <TableCell >
                            Contact Number
                        </TableCell>
                        <TableCell >
                            Email
                        </TableCell>
                        <TableCell  align='right'>
                            <Button variant="text" color="primary" sx={{background:"white",boxShadow:5}} startIcon={<AddIcon/>} onClick={()=>{setOpen("addInstuctor")}}>
                                add
                            </Button>
                        </TableCell>
                    </TableRow>
                  
                </TableHead>
                <TableBody>
                  {instructors?.map((instructor) => ( 
                    <TableRow  hover role="checkbox" >
                        <TableCell component="th" scope="row" sx={{display:"flex",alignItems:"center",gap:"10px"}} >
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <div>
                                <Typography variant="subtitle1" color="initial">{instructor.name.first} {instructor.name.middle} {instructor.name.last}</Typography>
                                <Typography variant="body2" color="initial" sx={{marginTop:"-8px"}}>{instructor.createdAt}</Typography>
                            </div>
                        </TableCell>
                        <TableCell >{instructor.contact}</TableCell>
                        <TableCell >
                          {instructor.email}
                        </TableCell>
                        <TableCell align="right">
                            {/* <IconButton aria-label=""  onClick={()=>{setSelected(instructor.instructorId);setOpen("edit")}}>
                                <EditIcon/>
                            </IconButton> */}
                            <IconButton aria-label="" onClick={()=>{setSelected(instructor.instructorId);setOpen("delete")}}>
                                <DeleteIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={5}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div>
                <Modal
                    open={open.length > 0}
                    onClose={()=>{setOpen("")}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {open === "addInstuctor"?<>
                            <form action="">
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Add New Instructor
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                                    Fill up the details of the instructor
                                </Typography>
                                <Grid container spacing={2} mt={3}>
                                    <Grid item md={6}  xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="firstName"
                                            label="First Name"
                                            value={form.firstName}
                                            onChange={(event)=>{ setForm({...form, firstName: event.target.value });}}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="lastName"
                                            label="Last Name"
                                            value={form.lastName}
                                            onChange={(event)=>{ setForm({...form, lastName: event.target.value });}}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="middle"
                                            label="Middle Name"
                                            value={form.middleName}
                                            onChange={(event)=>{ setForm({...form, middleName: event.target.value });}}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="suffix"
                                            label="Suffix"
                                            value={form.suffix}
                                            onChange={(event)=>{ setForm({...form, suffix: event.target.value });}}
                                        />
                                    </Grid>

                                    <Grid item  xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="address"
                                            label="Address"
                                            value={form.address}
                                            onChange={(event)=>{ setForm({...form, address: event.target.value });}}
                                        />
                                    </Grid>

                                    <Grid item  xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="contact"
                                            label="Contact Number"
                                            value={form.contact}
                                            onChange={(event)=>{ setForm({...form, contact: event.target.value });}}
                                        />
                                    </Grid>
                                    
                                    <Grid item  xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="email"
                                            label="Email"
                                            value={form.email}
                                            onChange={(event)=>{ setForm({...form, email: event.target.value });}}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} mt={4}>
                                    <Grid item sm={4} xs={12}>
                                        <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                            cancel
                                        </Button>
                                    </Grid>
                                    <Grid item sm={8} xs={12}>
                                        <Button 
                                          variant="contained" 
                                          fullWidth 
                                          color="primary" 
                                          onClick={()=>{
                                            setOpen("credential");
                                            createInstructor(form);
                                          }}

                                        >
                                            Create
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>:""}

                        {open === "credential"?<>
                            <form action="">
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Add New Instructor
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                                    Give the credential to the new instructor
                                </Typography>
                                <Grid container spacing={2} mt={3}>
                                    <Grid item  xs={12}>
                                        <FormControl sx={{ width: '100%' }} variant="outlined">
                                            <InputLabel  htmlFor="outlined-adornment-password">Email</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={"text"}
                                                value={credentials?.email}
                                                disabled
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>{
                                                      navigator.clipboard.writeText(credentials?.email);
                                                      alert("Email Copied!")
                                                    }}
                                                    edge="end"
                                                    >
                                                        <ContentCopyIcon /> 
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                label="Email"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item  xs={12}>
                                        <FormControl sx={{ width: '100%' }} variant="outlined">
                                            <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={"text"}
                                                value={credentials?.password}
                                                disabled
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>{
                                                      navigator.clipboard.writeText(credentials?.password);
                                                      alert("Password Copied!")
                                                    }}
                                                    edge="end"
                                                    >
                                                        <ContentCopyIcon /> 
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} mt={4}>
                                    <Grid item sm={4} xs={12}>
                                        <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                            cancel
                                        </Button>
                                    </Grid>
                                    <Grid item sm={8} xs={12}>
                                        <Button variant="contained" fullWidth color="primary" onClick={()=>{setOpen("")}}>
                                            Done
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>:""}

                        {open === "edit"?<>
                            <form action="">
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Edit info Instructor
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                                    Fill up the details of the instructor
                                </Typography>
                                <Grid container spacing={2} mt={3}>
                                    <Grid item md={6}  xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="firstName"
                                            label="First Name"
                                            value={form.firstName}
                                            onChange={(event)=>{ setForm({...form, firstName: event.target.value });}}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="lastName"
                                            label="Last Name"
                                            value={form.lastName}
                                            onChange={(event)=>{ setForm({...form, lastName: event.target.value });}}
                                        />
                                    </Grid>
                                    <Grid item  xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="contact"
                                            label="Contact Number"
                                            value={form.contact}
                                            onChange={(event)=>{ setForm({...form, contact: event.target.value });}}
                                        />
                                    </Grid>
                                    <Grid item  xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="email"
                                            label="Email"
                                            value={form.email}
                                            onChange={(event)=>{ setForm({...form, email: event.target.value });}}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} mt={4}>
                                    <Grid item sm={4} xs={12}>
                                        <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                            cancel
                                        </Button>
                                    </Grid>
                                    <Grid item sm={8} xs={12}>
                                        <Button variant="contained" fullWidth color="primary" onClick={()=>{setOpen("credential")}}>
                                            Update
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>:""}
                        {open === "delete"?<>
                            <form action="">
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Delete Instructor
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                                    Are you sure you want to delete this instructor?
                                </Typography>
                                <Grid container spacing={1} mt={4}>
                                    <Grid item sm={4} xs={12}>
                                        <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                            cancel
                                        </Button>
                                    </Grid>
                                    <Grid item sm={8} xs={12}>
                                        <Button 
                                          variant="contained" 
                                          fullWidth 
                                          color="primary" 
                                          onClick={()=>{
                                            setOpen("");
                                            console.log(selected);
                                            updateInstructor({
                                              instructorId: selected,
                                              status: "inactive"
                                            });
                                            getInstructor(instructorinstructors);
                                            getInstructor(instructorinstructors);
                                          }}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>:""}
                    </Box>
                </Modal>
            </div>
        </Grid>
    )
}

export default Instructors