import React, { createContext, useState, useEffect, useContext } from 'react';
import {useNavigate, Outlet, Navigate} from 'react-router-dom';
import axios from './useAxios';
import { SnackbarContext } from '../Context/SnackbarContext';

interface AuthContextState {
    user: any;
    login: (data: LoginData) => void;
    logout: () => void;
    register: (data: RegisterData) => void;
    isAuth: (id: any) => boolean;
    getUser: () => any;
    User: () => any,
}

interface Schedule {
    name: string,
    from: number,
    to: number
}

interface RegisterData {
    name?: string;
    first?: string;
    middle?: string;
    last?: string;
    extension?: string;
    sex?: string;
    birthday?: Date;
    address?: string;
    contact?: string;
    about?: string;
    email?: string;
    password?: string;
    role?: string;
    accreditation?: string,
    schedules?: Schedule[];
  }

interface LoginData {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextState>({
    user: null,
    login: () => {},
    logout: () => {},
    register: () => {},
    isAuth: () => false,
    getUser: () => {},
    User: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<any>(null);
    const{setOpenSnackBar} = useContext(SnackbarContext)
    const login = async (data: LoginData) => {
        const { email, password} = data;
        try{
          await axios
          .post(`/auth/login`,{
              "email" : email,
              "password" : password
          })
          .then((response: any) => {
              console.log(response.data)
              setUser(response.data);

              if (response.data.schoolId) {
                navigate("/dashboard")  
              }
              else if (response.data.studentId) {
                navigate("/home")  
              }
              else if (response.data.instructorId) {
                navigate("/dashboard")  
              }

              localStorage.setItem('user', JSON.stringify(response.data))
          });
      }
      catch (error: any){
        console.log(error);
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'error',
          note:error.response.data.message,
        })); 
      }
    };

    const register = async (data: RegisterData) => {
      const { name, first, middle, last, extension, sex, birthday, address, contact, about, email, password, role, schedules, accreditation } = data;

      try{
          await axios
          .post(`/auth/register`,{
              name: name,
              firstName: first,
              middleName: middle,
              lastName: last,
              extensionName: extension,
              sex: sex,
              birthday: birthday?.getTime(),
              address: address || ' ',
              contact: contact || ' ',
              about: about || ' ',
              email: email,
              password: password,
              role: role,
              schedules: schedules,
              accreditation: accreditation
          })
          .then((response: any) => {
              console.log(response.data)
              setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                severity:'success',
                note:"Account created!",
              })); 
              navigate("/login")
          });
      }
      catch (error: any){
        console.log(error);
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'error',
          note:error.message,
        })); 
      }
    };

    const logout = async () => {
      try{
        await axios.post(`/auth/logout`)
      } 
      catch(error) {
        console.log(error)
      } 
      finally {
        localStorage.clear();
        navigate("/");
      }
    };



    const isAuth = (id:any) => {
      if (!user) {
        // User is not logged in, so they are not authorized
        return false;
      }

      // User is logged in and authorized
      return true;
    };

    const getUser = () => {
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';

      if (user.studentId) {
        return 'student';
      } else if (user.schoolId) {
        return 'admin';
      } else if (user.instructorId) {
        return 'instructor';
      }
    }

    const User = () => {
      return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';
    }

    useEffect(() => {
        // Check if user is already logged in on first mount
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register, isAuth, getUser, User }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  // Gets locally stored user
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';
  
  function role(): "student" | "admin" | "instructor" {
    if (user.studentId) {
      return 'student';
    } else if (user.schoolId) {
      return 'admin';
    } else if (user.instructorId) {
      return 'instructor';
    }
    // handle the case when user has no roles
    return 'student'; // or 'admin' or 'instructor', depending on your logic
  }

  return (
    // Checks if user exists, if yes proceeds to page, if not proceeds to login
    user
    ? allowedRoles 
        ? allowedRoles?.includes(role())
            ? <Outlet/>
            : <Navigate to="/"/>
        : <Outlet/>   
    : <Navigate to="/"/>
  );
};