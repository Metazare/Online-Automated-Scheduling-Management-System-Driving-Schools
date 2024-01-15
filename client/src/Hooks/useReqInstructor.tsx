import {useState,useContext} from 'react'
import axios from './useAxios'
import { SnackbarContext } from '../Context/SnackbarContext';

interface Data {
  instructors: any;
  loading: boolean;
  error: Error | null;
  credentials: any;
  createInstructor: (data: CreateInstructorData) => void;
  getInstructor: (data: GetInstructorData) => void;
  updateInstructor: (data: UpdateInstructorData) => void;
  editProfile: (data: EditInstructorData) => void;
}

interface ScheduleInstructor {
    days: number[],
    from: number,
    to: number
}
interface CreateInstructorData {
  firstName: string,
  middleName?: string | null,
  lastName: string,
  suffix?: string | null,
  accreditation?: string | null,
  address: string,
  contact: string,
  email: string
}

interface EditInstructorData{
  instructorId: string,
  firstName: string,
  middleName?: string | null,
  lastName: string,
  suffix?: string | null,
  accreditation?: string | null,
  address: string,
  contact: string,
  email: string,
  profile: string
}

interface GetInstructorData {
  instructorId?: string | null;
  status?: string | null;
}

interface UpdateInstructorData {
  instructorId?: string;
  status?: string;
}

function useReqInstructor(): Data {
  const{setOpenSnackBar} = useContext(SnackbarContext)

  const [instructors, setInstructors] = useState<any>(null);
  const [credentials, setCredentials] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createInstructor = async (data:CreateInstructorData) => {
    console.log(data)
    setLoading(true);
    try {
      await axios
      .post('/instructors', {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        suffix: data.suffix,
        accreditation: data.accreditation,
        address: data.address,
        contact: data.contact,
        email: data.email
      })
      .then((response:any)=>{
        setCredentials(response.data);
        console.log(response.data);
      });
    } catch (error: any) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getInstructor = async (data: GetInstructorData) => {
    setLoading(true);
    try {
      const params = {
        instructorId: data.instructorId,
        status: data.status
      };
      await axios
      .get('/instructors', {
        params: params
      })
      .then((response:any)=>{
        setInstructors(response.data);
        console.log(response.data);
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const updateInstructor = async (data: UpdateInstructorData) => {
    setLoading(true);
    console.log(data);
    try {
      await axios
      .patch('/instructors', {
        instructorId: data.instructorId,
        status: data.status
      })
      .then((response:any)=>{
        console.log(response.data);
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'error',
          note:"Instructor Deleted!",
        })); 
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const editProfile = async (data: EditInstructorData) => {
    setLoading(true);
    console.log(data);
    try {
      await axios
      .patch('/instructors/profile', {
        instructorId: data.instructorId,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        suffix: data.suffix,
        accreditation: data.accreditation,
        address: data.address,
        contact: data.contact,
        email: data.email,
        profile: data.profile
      })
      .then((response:any)=>{
        console.log(response.data);
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'success',
          note:"Profile Updated!",
        })); 
      });
    } catch (error: any) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    instructors,
    loading,
    error,
    credentials,
    createInstructor,
    getInstructor,
    updateInstructor,
    editProfile
  }
}

export default useReqInstructor;