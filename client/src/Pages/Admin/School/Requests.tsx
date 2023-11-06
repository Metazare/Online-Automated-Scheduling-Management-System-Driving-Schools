import React, { useState } from 'react'
import {  Grid, IconButton, Typography,Modal , TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

function Requests() {
    // * Modal Open
    const [open, setOpen] = useState("");
    // * Reason Value 
    const [reason,setReason] = useState("")
    // * Reason Value 
    const [requestType, setRequestType] = React.useState('Enrollment');

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

    return (
        <Grid item xs={12} sx={{padding:"40px"}}>
            <FormControl fullWidth sx={{minWidth:"200px",maxWidth:"30%",marginBottom:"25px"}}>
                <Select
                    sx={{background:"#363636",color:"white",fill:"white", 
                        '& .MuiSelect-icon': {color: 'white'},
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={requestType}
                    onChange={(event: SelectChangeEvent)=>{setRequestType(event.target.value as string);}}
                >
                    <MenuItem value={"Enrollment"}>Enrollment Requests</MenuItem>
                    <MenuItem value={"Reschedule"}>Reschedule Requests</MenuItem>
                </Select>
            </FormControl>
            
            {(requestType === "Enrollment")? <>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell >
                                Name
                            </TableCell>
                            <TableCell >
                                Course
                            </TableCell>
                            <TableCell >
                                Available Schedule
                            </TableCell>
                            <TableCell >
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
                            <TableCell >Theoretical Driving</TableCell>
                            <TableCell >
                                Monday, Tuesday, Saturday at 1 to 10:30 am
                            </TableCell>
                            <TableCell align="right">
                                <IconButton aria-label=""  onClick={()=>{setOpen("DeclineEnrollment")}}>
                                    <ClearIcon/>
                                </IconButton>
                                <IconButton aria-label="" onClick={()=>{setOpen("AcceptEnrollment")}}>
                                    <CheckIcon/>
                                </IconButton>
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
            </>:""}

            {(requestType === "Reschedule")? <>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell >
                                Name
                            </TableCell>
                            <TableCell >
                                Course
                            </TableCell>
                            <TableCell >
                                Set Scheduled
                            </TableCell>
                            <TableCell >
                                Request to Change
                            </TableCell>
                            <TableCell >
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
                            <TableCell >Theoretical Driving</TableCell>
                            <TableCell >
                                Oct 5 at 1 pm 
                            </TableCell>
                            <TableCell >
                                Oct 6 at 5pm
                            </TableCell>
                            <TableCell align="right">
                                <IconButton aria-label=""  onClick={()=>{setOpen("DeclineReschedule")}}>
                                    <ClearIcon/>
                                </IconButton>
                                <IconButton aria-label="" onClick={()=>{setOpen("AcceptReschedule")}}>
                                    <CheckIcon/>
                                </IconButton>
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
            </>:""}
            

            <div>
                <Modal
                    open={open.length > 0}
                    onClose={()=>{setOpen("")}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {/* //* Enrollment Request */}
                        {open === "AcceptEnrollment"?<>
                            <form action="">
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Admit Student
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                                    Are you sure you want enroll this student?
                                </Typography>


                                <Grid container spacing={1} mt={3}>
                                    <Grid item sm={4} xs={12}>
                                        <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                            cancel
                                        </Button>
                                    </Grid>
                                    <Grid item sm={8} xs={12}>
                                        <Button variant="contained" fullWidth color="primary">
                                            Admit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>:""}
                        {open === "DeclineEnrollment"?<>
                            <form action="">
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Decline Student
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                                    Are you sure you want decline this student? 
                                </Typography>

                                <TextField
                                    fullWidth
                                    required
                                    id="reason"
                                    label="Reason"
                                    value={reason}
                                    onChange={(event)=>{setReason(event.target.value)}}
                                />

                                <Grid container spacing={1} mt={3}>
                                    <Grid item sm={4} xs={12}>
                                        <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                            cancel
                                        </Button>
                                    </Grid>
                                    <Grid item sm={8} xs={12}>
                                        <Button variant="contained" fullWidth color="primary">
                                            Decline
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>:""}

                        {open === "AcceptReschedule"?<>
                            <form action="">
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Accept Reschedule
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                                    This will update the set schedule to this appointment
                                </Typography>


                                <Grid container spacing={1} mt={3}>
                                    <Grid item sm={4} xs={12}>
                                        <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                            cancel
                                        </Button>
                                    </Grid>
                                    <Grid item sm={8} xs={12}>
                                        <Button variant="contained" fullWidth color="primary">
                                            Proceed
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </>:""}
                        {open === "DeclineReschedule"?<>
                            <form action="">
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Decline Reschedule 
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2" mb={3}>
                                    Are you sure you want decline this Reschedule Request? 
                                </Typography>

                                <TextField
                                    fullWidth
                                    required
                                    id="reason"
                                    label="Reason"
                                    value={reason}
                                    onChange={(event)=>{setReason(event.target.value)}}
                                />

                                <Grid container spacing={1} mt={3}>
                                    <Grid item sm={4} xs={12}>
                                        <Button variant="text" fullWidth color='secondary' onClick={()=>{setOpen("")}}>
                                            cancel
                                        </Button>
                                    </Grid>
                                    <Grid item sm={8} xs={12}>
                                        <Button variant="contained" fullWidth color="primary">
                                            Decline
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

export default Requests