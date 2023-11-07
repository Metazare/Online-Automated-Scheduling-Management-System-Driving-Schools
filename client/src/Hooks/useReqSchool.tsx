import {useState} from 'react'
import axios from './useAxios'

interface Data {
  data: any;
  loading: boolean;
  error: Error | null;
  getSchool: (string) => void;
}

interface GetSchoolData {
  schoolId?: string | null;
}

function useReqSchool(): Data {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getSchool = async (data) => {
    setLoading(true);
    try {
      const params = {
        schoolId: data
      };
      await axios
      .get('/schools', {
        params: params
      })
      .then((response:any)=>{
        if (data){
          setData(response.data[0]);
          console.log(response.data[0]);
        }
        else{
          setData(response.data);
          console.log(response.data);
        }
        
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
    getSchool
  }
}

export default useReqSchool;