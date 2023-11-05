import React from 'react'
import {  Grid, IconButton, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
// * Components
function Requests() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                            <IconButton aria-label="" onClick={()=>{}}>
                                <ClearIcon/>
                            </IconButton>
                            <IconButton aria-label="" onClick={()=>{}}>
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
        </Grid>
    )
}

export default Requests