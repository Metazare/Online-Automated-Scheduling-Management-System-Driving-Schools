import React, { useState,useContext } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

import { SnackbarContext } from '../Context/SnackbarContext';



// TODO STEP 1 : Import Utilities
// import React, { useState,useContext } from 'react';
// import { SnackbarContext } from '../../Context/SnackbarContext';


// TODO STEP 2 : Declare snackbar usestate using Context 
{/*
  const{setOpenSnackBar} = useContext(SnackbarContext)
*/}


// TODO STEP 3 : place the snackbar component somewhere in return of your function page
{/* 
  setOpenSnackBar(openSnackBar => ({
    ...openSnackBar,
    severity:'error',
    note:"sample snackbar",
  })); 
*/}


type Props = {
  openSnackbar: {
    severity: AlertColor;
    note: string;
  };
  setOpenSnackbar: React.Dispatch<React.SetStateAction<{
    severity: AlertColor;
    note: string;
  }>>;
};


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackbarComponent({ openSnackbar, setOpenSnackbar }: Props) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar((openSnackBar) => ({
      ...openSnackBar,
      severity: "info",
      note: '',
    }));
  };

  return (
    <Snackbar
      open={!!openSnackbar.note}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={openSnackbar.severity} sx={{ width: '100%' }}>
        {openSnackbar.note}
      </Alert>
    </Snackbar>
  );
}

// Example usage
function MyComponent() {
  const [openSnackBar, setOpenSnackBar] = useState<Props['openSnackbar']>({
    severity: 'info',
    note: '',
  });

  return (
    <SnackbarComponent
      openSnackbar={openSnackBar}
      setOpenSnackbar={setOpenSnackBar}
    />
  );
}

export default SnackbarComponent;
