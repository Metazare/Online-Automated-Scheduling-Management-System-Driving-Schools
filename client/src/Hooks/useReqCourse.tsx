import {useState,useContext} from 'react'
import axios from './useAxios'
import { SnackbarContext } from '../Context/SnackbarContext';
interface Data {
  data: any;
  loading: boolean;
  error: Error | null;
  postCourse: (data: CourseData) => void;
}

interface CourseData {
  type: string;
}

function useReqCourse(): Data {
  const{setOpenSnackBar} = useContext(SnackbarContext)

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postCourse = async (data:CourseData) => {
    setLoading(true);
    try {
      await axios
      .post('/courses', {
        type: data.type
      })
      .then((response:any)=>{
        setData(response.data);
        setOpenSnackBar(openSnackBar => ({
          ...openSnackBar,
          severity:'info',
          note:response.data,
        })); 
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
    postCourse
  }
}

export default useReqCourse;