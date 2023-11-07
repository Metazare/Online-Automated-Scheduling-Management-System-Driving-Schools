import {useState} from 'react'
import axios from './useAxios'

interface Data {
  data: any;
  loading: boolean;
  error: Error | null;
  getStudent: (data: StudentData) => void;
}

interface StudentData {
  studentId?: string | null;
  courseType?: string | null;
}

function useReqStudent(): Data {
  const [data, setData] = useState<any>(null);
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
        setData(response.data);
        console.log(response.data);
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getStudent
  }
}

export default useReqStudent;