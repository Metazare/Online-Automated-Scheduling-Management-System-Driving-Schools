import {useState,useContext} from 'react'
import axios from './useAxios'
import {useNavigate} from 'react-router-dom';
import { useAuth } from './useAuth';
import useNotif from './useNotif';
import { SnackbarContext } from '../Context/SnackbarContext';
interface Data {
  data: any;
  loading: boolean;
  error: Error | null;
  enroll: (data: CreateEnrollmentData) => void;
  getEnrollments: (data: GetEnrollmentData) => void,
  updateEnrollments: (data: UpdateEnrollmentData) => void
}

interface CreateEnrollmentData {
  courseId: string;
  days?: number[];
  startTime?: Date;
  endTime?: Date;
  schoolId: string;
  schedules: any;
}

interface GetEnrollmentData {
  enrollmentId?: string | null;
  courseId?: string | null;
  status?: string | null;
  courseType?: string | null;
  lessonView?: boolean;
}

interface UpdateEnrollmentData {
  enrollmentId: string;
  status: string;
  reason: string | null;
  studentId: string;
}

function useReqEnroll(): Data {
  const{setOpenSnackBar} = useContext(SnackbarContext)
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const {User} = useAuth();
  const {sendNotification} = useNotif();

  const enroll = async (data:CreateEnrollmentData) => {
    console.log(data)
    setLoading(true);
      try {
        await axios
        .post('/enrollments', {
          courseId: data.courseId,
          schedule: data.schedules
        })
        .then((response:any)=>{
          console.log(response)
          console.log(response.data);
          setOpenSnackBar(openSnackBar => ({
            ...openSnackBar,
            severity:'success',
            note:"Enrollment Request Sent, Wait For School To Approve",
          })); 
          sendNotification({
            sender: User().studentId,
            targets: [
              {
                user: data.schoolId,
                role: 'admin'
              }
            ],
            content: 'New Enrollment Request!'
          })
          navigate("/home");
        });
      } catch (error: any) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
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
      })
      .then((response:any)=>{
        console.log(response);
        if (data.lessonView) {
          setData(response.data[0]);
          console.log(response.data[0]);
        }
        else{
          setData(response.data);
          console.log(response.data);
        }
        
      });
    } catch (error: any) {
      console.error(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const updateEnrollments = async (data: UpdateEnrollmentData) => {
    setLoading(true);
    console.log(data);
    try {
      await axios
      .patch('/enrollments', {
        enrollmentId: data.enrollmentId,
        status: data.status,
        reason: data.reason
      })
      .then((response:any)=>{
        console.log(response.data);
        sendNotification({
          sender: User().schoolId,
          targets: [
            {
              user: data.studentId,
              role: 'student'
            }
          ],
          content: 'Your enroll request is ' + data.status
        })
      });
    } catch (error: any) {
      console.log(error)
      setError(error);
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
    
  return {
    data,
    loading,
    error,
    enroll,
    getEnrollments,
    updateEnrollments
  }
}

export default useReqEnroll;