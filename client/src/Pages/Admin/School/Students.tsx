import React,{useState} from 'react'
import {  Grid, Typography, IconButton, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TaskIcon from '@mui/icons-material/Task';
import CircularProgress, {CircularProgressProps,} from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

function CircularProgressWithLabel(props: CircularProgressProps & { value: number },) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
function Students() {
    // * Modal Open
    const [open, setOpen] = useState("");
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
    // TODO End Pagination

    const [form, setForm] = useState({
        lesson:"",
        feedback:""
    })

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
                        <TableCell >
                            <CircularProgressWithLabel defaultValue={0} value={60} />
                        </TableCell>
                        <TableCell >
                            <IconButton aria-label="" onClick={()=>{setOpen("update")}}>
                                <TaskIcon/>
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
            <div>
                <Modal
                    open={open.length > 0}
                    onClose={()=>{setOpen("")}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    
                    <Box sx={style}>
                        {open === "update"?<>
                            <form action="">
                                <Typography id="modal-modal-title"  variant="h5" color={"primary"} fontWeight={600} component="h2">
                                    Add New Instructor
                                </Typography>
                                <Typography id="modal-modal-title"  variant="body2" fontWeight={500} component="h2">
                                    Fill up the details of the instructor
                                </Typography>
                                <Grid container spacing={2} mt={3}>
                                    <Grid item  xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Lesson</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Select Lesson"
                                            value={form.lesson}
                                            onChange={(event)=>{ setForm({...form, lesson: event.target.value });}}
                                            >
                                            <MenuItem value={"Lesson#1"}>Lesson #1</MenuItem>
                                            <MenuItem value={"Lesson#2"}>Lesson #2</MenuItem>
                                            <MenuItem value={"Lesson#3"}>Lesson #3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item  xs={12}>
                                        <TextField
                                            fullWidth
                                            required
                                            id="feedback"
                                            label="Feedback"
                                            value={form.feedback}
                                            onChange={(event)=>{ setForm({...form, feedback: event.target.value });}}
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
                    </Box>
                </Modal>
            </div>
        </Grid>
    )
}

export default Students