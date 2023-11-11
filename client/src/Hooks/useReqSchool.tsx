import {useState} from 'react'
import axios from './useAxios'

interface Data {
  data: any;
  loading: boolean;
  error: Error | null;
  getSchool: (data: GetSchoolData) => void;
}

interface GetSchoolData {
  schoolId?: string | null;
}

function useReqSchool(): Data {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getSchool = async (data: GetSchoolData) => {
    setLoading(true);
    try {
      const params = {
        schoolId: data.schoolId
      };
      await axios
      .get('/schools', {
        params: params
      })
      .then((response:any)=>{
        if (data.schoolId){
          console.log(response.data[0]);
          setData(response.data[0]);
        }
        else{
          console.log(response.data);
          setData(response.data);
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