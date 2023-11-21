import {useState} from 'react'
import axios from './useAxios'

interface Data {
  students: any;
  loading: boolean;
  error: Error | null;
  getStudent: (data: StudentData) => void;
  updateStudentProfile: (data: UpdateStudentData) => void;
}

interface StudentData {
  studentId?: string | null;
  courseType?: string | null;
}

interface UpdateStudentData {
  studentId?: string;
  email?: string;
  contact?: string;
  address?: string;
  sex?: string;
  birthday?: string;
  profile?: string;
  password?: string;
}

function useReqStudent(): Data {
  const [students, setStudents] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getStudent = async (data:StudentData) => {
    setLoading(true);
    try {
      const params = {
        studentId: data.studentId,
        courseType: data.courseType
      };

      await axios
      .get('/students', {
        params: params
      })
      .then((response:any)=>{
        setStudents(response.data);
        console.log(response.data);
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStudentProfile = async (data: UpdateStudentData) => {
    setLoading(true);
    try {
      await axios
      .patch('/students', {
        studentId: data.studentId,
        email: data.email,
        contact: data.contact,
        address: data.address,
        sex: data.sex,
        birthday: data.birthday,
        profile: data.profile
      })
      .then((response:any)=>{
        console.log(response.data);
      });
    } catch (error: any) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    students,
    loading,
    error,
    getStudent,
    updateStudentProfile
  }
}



export default useReqStudent;