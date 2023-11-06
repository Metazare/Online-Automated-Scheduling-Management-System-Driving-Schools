import React,{useState} from 'react'
import {  Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import CircularProgress, {CircularProgressProps,} from '@mui/material/CircularProgress';
    

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
                        <TableCell align="center">
                            <CircularProgressWithLabel defaultValue={0} value={60} />
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
        </Grid>
    )
}

export default Students