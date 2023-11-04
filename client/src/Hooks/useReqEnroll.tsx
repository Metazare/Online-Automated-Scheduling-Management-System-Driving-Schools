import {useState} from 'react'
import axios from './useAxios'
import { datePickerToolbarClasses } from '@mui/x-date-pickers';

interface Data {
  data: any;
  loading: boolean;
  error: Error | null;
  enroll: (data: CreateEnrollmentData) => void;
  getEnrollments: (data: GetEnrollmentData) => void
}

interface CreateEnrollmentData {
  courseId: string;
  days: number[];
  startTime: Date;
  endTime: Date;
}

interface GetEnrollmentData {
  enrollmentId: string | null;
  courseId: string | null;
  status?: string | null;
  courseType?: string | null;
}

function useReqEnroll(): Data {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const enroll = async (data:CreateEnrollmentData) => {
    setLoading(true);
    if (data.endTime && data.startTime) {
      try {
        await axios
        .post('/enrollments', {
          courseId: data.courseId,
          days: data.days,
          startTime: new Date(data.startTime).getHours(),
          endTime: new Date(data.endTime).getHours()
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
    }
  };

  const getEnrollments = async (data: GetEnrollmentData) => {
    setLoading(true);
    try {
      const params = {
        enrollmentId: data.enrollmentId,
        courseId: data.courseId,
        status: data.status,
        courseType: data.courseType,
      };

      await axios
      .get('/enrollments', {
        params: params
      }).then((response:any)=>{
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
    
  return {
    data,
    loading,
    error,
    enroll,
    getEnrollments
  }
}

export default useReqEnroll;