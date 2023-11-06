import React,{useState} from 'react'
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
function Intructors() {
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
        lastName:"",
        contactNo:"",
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
                    <TableRow  hover role="checkbox" >
                        <TableCell component="th" scope="row" sx={{display:"flex",alignItems:"center",gap:"10px"}} >
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <div>
                                <Typography variant="subtitle1" color="initial">Harold James Castillo</Typography>
                                <Typography variant="body2" color="initial" sx={{marginTop:"-8px"}}>Sent 5mins ago</Typography>
                            </div>
                        </TableCell>
                        <TableCell >0908-666-2321</TableCell>
                        <TableCell >
                            haroldcastillo@gmail.com
                        </TableCell>
                        <TableCell align="right">
                            <IconButton 
                                aria-label=""  
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                >
                                <MoreVertIcon/>
                            </IconButton>
                            
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openAnchor}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Delete</MenuItem>
                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                            </Menu>
                        </TableCell>
                    </TableRow>
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
                                    <Grid item  xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="contactNo"
                                            label="Contact Number"
                                            value={form.contactNo}
                                            onChange={(event)=>{ setForm({...form, contactNo: event.target.value });}}
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
                                        <Button variant="contained" fullWidth color="primary" onClick={()=>{setOpen("Credential")}}>
                                            Create
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>:""}

                        {open === "Credential"?<>
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
                                                value={credential.email}
                                                disabled
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>{}}
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
                                                value={credential.email}
                                                disabled
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={()=>{}}
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
                                        <Button variant="contained" fullWidth color="primary" onClick={()=>{setOpen("Credential")}}>
                                            Done
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

export default Intructors