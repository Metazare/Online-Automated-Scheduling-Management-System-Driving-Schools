import React from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { type } from 'os';


type Props={
  openSnackbar: {
    severity: string ;
    note: string;
  } 
  setOpenSnackbar:React.Dispatch<React.SetStateAction<{
      severity: string;
      note: string;
  }>>
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function SnackbarComponent({openSnackbar,setOpenSnackbar}:Props) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(openSnackBar => ({
      ...openSnackBar,
      severity:'info',
      note:"",
    }));
  };
  return<>
    
    <Snackbar open={!!openSnackbar.note} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        {openSnackbar.note}
      </Alert>
    </Snackbar>
  </>
}

export default SnackbarComponent