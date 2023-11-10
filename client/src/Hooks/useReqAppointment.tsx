import {useState} from 'react'
import axios from './useAxios'

interface Data {
  appointments: any;
  loading: boolean;
  error: Error | null;
  createAppointment: (data: CreateAppointmentData) => void;
  getAppointments: (data: GetAppointmentData) => void,
  updateAppointment: (data: UpdateAppointmentData) => void
}

interface CreateAppointmentData {
  enrollmentId: string;
  instructorId: string;
  vehicle: string;
  schedule: Date;
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
  schedule?: string;
}

function useReqAppointment(): Data {
  const [appointments, setAppointments] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createAppointment = async (data:CreateAppointmentData) => {
    console.log(data)
    setLoading(true);
    try {
      await axios
      .post('/appointments', {
        enrollmentId: data.enrollmentId,
        instructorId: data.instructorId,
        vehicle: data.vehicle,
        schedule: data.schedule.getTime()
      })
      .then((response:any)=>{
        console.log(response.data);
        alert("Appointment set!");
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
    appointments,
    loading,
    error,
    createAppointment,
    getAppointments,
    updateAppointment
  }
}

export default useReqAppointment;