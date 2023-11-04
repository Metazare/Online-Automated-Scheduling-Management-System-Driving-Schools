import React, {useState} from 'react'
import axios from './useAxios'

interface UseRequestsResult {
  data: any;
  loading: boolean;
  error: Error | null;
  postCourse: () => void;
}

function useRequest(): UseRequestsResult {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postCourse = async () => {
    setLoading(true);
    try {
      await axios
      .post('/course', {

      })
      .then((response:any)=>{
        setData(response.data);
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