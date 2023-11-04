import {useState} from 'react'
import axios from './useAxios'

interface Data {
  data: any;
  loading: boolean;
  error: Error | null;
  createAppointment: (data: CreateAppointmentData) => void;
  getAppointments: (data: GetAppointmentData) => void,
  updateAppointment: (data: UpdateAppointmentData) => void
}

interface CreateAppointmentData {
  studentId: string;
  instructorId: string;
  vehicle: string;
  schedule: string;
}

interface GetAppointmentData {
  appointmentId?: string;
  studentId?: string;
  instructorId?: string;
  status?: string;
}

interface UpdateAppointmentData {
  appointmentId: string;
  status?: string;
  schedule?: string;
}

function useReqAppointment(): Data {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createAppointment = async (data:CreateAppointmentData) => {
    setLoading(true);
    try {
      await axios
      .post('/appointments', {
        studentId: data.studentId,
        instructorId: data.instructorId,
        vehicle: data.vehicle,
        schedule: data.schedule
      })
      .then((response:any)=>{
        setData(response.data);
        console.log(response.data);
        alert(response.data);
      });
    } catch (error: any) {
      setError(error);
      console.log(error);
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
        setData(response.data);
        console.log(response.data);
        alert(response.data);
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const updateAppointment = async (data: UpdateAppointmentData) => {
    setLoading(true);
    console.log(data);
    try {
      await axios
      .patch('/appointments', {
        appointmentId: data.appointmentId,
        status: data.status,
        schedule: data.schedule
      })
      .then((response:any)=>{
        console.log(response.data);
        alert(response.data);
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
    
  return {
    data,
    loading,
    error,
    createAppointment,
    getAppointments,
    updateAppointment
  }
}

export default useReqAppointment;