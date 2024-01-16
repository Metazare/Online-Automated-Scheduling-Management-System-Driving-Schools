import {useState,useContext} from 'react'
import axios from './useAxios'

import { useAuth } from './useAuth';
import useNotif from './useNotif'
import { SnackbarContext } from '../Context/SnackbarContext';
import moment from 'moment';
interface Data {
  appointments: any;
  loading: boolean;
  error: Error | null;
  createAppointment: (data: CreateAppointmentData) => void;
  getAppointments: (data: GetAppointmentData) => void,
  updateAppointment: (data: UpdateAppointmentData) => void
}

interface Schedule {
    days: string[],
    from: Date,
    to: Date
}

interface CreateAppointmentData {
  enrollmentId: string;
  instructorId: string;
  vehicle: string;
  studentId: string;
  days: string[],
  from: Date,
  to: Date
}

interface GetAppointmentData {
  appointmentId?: string | null;
  studentId?: string | null;
  instructorId?: string | null;
  status?: string | null;
}

interface UpdateAppointmentData {
  appointmentId: string;
  status?: string;
  schedule: Date;
}

function useReqAppointment(): Data {
  const{setOpenSnackBar} = useContext(SnackbarContext)

  const [appointments, setAppointments] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const {User} = useAuth();
  const {sendNotification} = useNotif();

  const createAppointment = async (data:CreateAppointmentData) => {
    console.log(data)
    setLoading(true);
    try {
      await axios
      .post('/appointments', {
        enrollmentId: data.enrollmentId,
        instructorId: data.instructorId,
        vehicle: data.vehicle,
        schedule: {
            days: data.days,
            from: data.from,
            to: data.to
        }
      })
      .then((response:any)=>{
        console.log(response.data);

        sendNotification({
          sender: User().schoolId,
          targets: [
            {
              user: data.instructorId,
              role: 'instructor'
            },
            {
              user: data.studentId,
              role: 'student'
            }
          ],
          content: 'New schedule is set ' + ' by ' + User().name
        })
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'success',
          note:"Schedule set!",
        }));
      });
    } catch (error: any) {
      setError(error);
      console.log(error);
      setOpenSnackBar(openSnackBar => ({
        ...openSnackBar,
        severity:'warning',
        note:"Set schedule is not aligned to the availability of the student!",
      }));
    } finally {
      setLoading(false);
    }
  };

  const getAppointments = async (data: GetAppointmentData) => {
    setLoading(true);
    try {
      const params = {
        appointmentId: data.appointmentId,
        studentId: data.studentId,
        instructorId: data.instructorId,
        status: data.status
      };
      await axios
      .get('/appointments', {
        params: params
      })
      .then((response:any)=>{
        setAppointments(response.data);
        console.log(response.data);
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const updateAppointment = async (data: UpdateAppointmentData) => {
    setLoading(true);
    console.log(data.schedule);
    try {
      await axios
      .patch('/appointments', {
        appointmentId: data.appointmentId,
        status: data.status,
        date: data.schedule.getTime(),
        schedule: data.schedule
      })
      .then((response:any)=>{
        console.log(response.data);
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'info',
          note:response.data,
        })); 
      });
    } catch (error: any) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
    
  return {
    appointments,
    loading,
    error,
    createAppointment,
    getAppointments,
    updateAppointment
  }
}

export default useReqAppointment;