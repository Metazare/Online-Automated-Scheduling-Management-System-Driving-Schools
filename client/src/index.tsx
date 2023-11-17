import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Hooks/useAuth';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

import './Styles/main.scss';
import SnackbarComponent from './Components/SnackbarComponent';
import {SnackbarContext} from './Context/SnackbarContext'
const Root = () => {
  const [openSnackBar, setOpenSnackBar] = useState<{
    severity: AlertColor;
    note: string;
  }>({
    severity: 'info',
    note: '',
  });
  
  return (
    <React.StrictMode>
      <BrowserRouter>
        <SnackbarContext.Provider value={{openSnackBar,setOpenSnackBar}}>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App/>} />
            </Routes>
          </AuthProvider>
          <SnackbarComponent openSnackbar={openSnackBar} setOpenSnackbar={setOpenSnackBar} />
        </SnackbarContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
