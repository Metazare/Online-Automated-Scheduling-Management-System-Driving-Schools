import {useState} from 'react'
import axios from './useAxios'

interface Data {
  data: any;
  loading: boolean;
  error: Error | null;
  getSchool: (data: GetSchoolData) => void;
  editSchool: (data: EditSchoolData) => void;
}

interface GetSchoolData {
  schoolId?: string | null;
}

interface Schedule {
  name: string,
  from: number,
  to: number
}

interface EditSchoolData {
  schoolId: string;
  name: string;
  address: string;
  contact: string;
  email: string;
  profile: string;
  about: string;
  accreditation?: string | null,
  schedules: Schedule[];
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

  const editSchool = async (data: EditSchoolData) => {
    setLoading(true);
    try {
      await axios.patch(`/schools`, {
        schoolId: data.schoolId,
        name: data.name,
        about: data.about,
        address: data.address,
        contact: data.contact,
        email: data.email,
        profile: data.profile,
        schedules: data.schedules
      })
      .then((response:any)=>{
        console.log(response.data)
      });
    } catch (error: any) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  };
    
  return {
    data,
    loading,
    error,
    getSchool,
    editSchool
  }
}

export default useReqSchool;