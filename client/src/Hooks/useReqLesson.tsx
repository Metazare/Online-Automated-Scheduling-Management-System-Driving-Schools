import {useState} from 'react'
import axios from './useAxios'

interface Data {
  data: any;
  loading: boolean;
  error: Error | null;
  createLesson: (data: CreateLessonData) => void;
  getLessons: (data: GetLessonData ) => void,
  updateLesson: (data: UpdateLessonData ) => void;
  deleteLesson: (data: DeleteLessonData ) => void;
  updateProgress: (data: UpdateProgressData ) => void
}

interface CreateLessonData {
  courseId: string;
  title: string;
  description: string;
  file?: string | null;
}

interface GetLessonData {
  courseId: string;
}

interface UpdateLessonData {
  lessonId: string;
  title?: string;
  description?: string;
  file?: string;
}

interface DeleteLessonData {
  lessonId: string;
}

interface UpdateProgressData {
  enrollmentId: string;
  lessonId: string;
  status: string;
}

function useReqLesson(): Data {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createLesson = async (data:CreateLessonData) => {
    setLoading(true);
    try {
      await axios
      .post('/lessons', {
        courseId: data.courseId,
        title: data.title,
        description: data.description,
        file: data.file,
      })
      .then((response:any)=>{
        console.log(response.data);
        alert("Lesson created!");
      });
    } catch (error: any) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getLessons = async (data: GetLessonData) => {
    setLoading(true);
    try {
      const params = {
        courseId: data.courseId
      };
      await axios
      .get('/lessons', {
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
  }

  const updateLesson = async (data: UpdateLessonData) => {
    setLoading(true);
    try {
      await axios
      .patch('/lessons', {
        lessonId: data.lessonId,
        title: data.title,
        description: data.description,
        file: data.file
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

  const deleteLesson = async (data: DeleteLessonData) => {
    setLoading(true);
    try {
      await axios
      .patch('/lessons', {
        lessonId: data.lessonId
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

  const updateProgress = async (data: UpdateProgressData) => {
    setLoading(true);
    try {
      await axios
      .patch('/lessons', {
        enrollmentId: data.enrollmentId,
        lessonId: data.lessonId,
        status: data.status,
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
    data,
    loading,
    error,
    createLesson,
    getLessons,
    updateLesson,
    deleteLesson,
    updateProgress
  }
}

export default useReqLesson;