import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[] | any;
}

const ProtectedRoute = ({allowedRoles}) => {

    //Gets locally stored user
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';

    return(
        // Checks if user exists, if yes proceeds to page, if not proceeds to login
        user
            ? <Outlet/>   
            : <Navigate to="/"/>
    );
}

export default ProtectedRoute;