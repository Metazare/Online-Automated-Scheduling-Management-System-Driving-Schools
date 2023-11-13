import {useState} from 'react'
import axios from './useAxios'

interface Data {
  data: any;
  datum: any;
  loading: boolean;
  error: Error | null;
  createLesson: (value: CreateLessonData) => void;
  getLessons: (value: GetLessonsData ) => void,
  getLesson: (value: GetLessonData ) => void,
  updateLesson: (value: UpdateLessonData ) => void;
  deleteLesson: (value: DeleteLessonData ) => void;
  updateProgress: (value: UpdateProgressData ) => void
}

interface CreateLessonData {
  courseId: string;
  title: string;
  description: string;
  file?: string | null;
}

interface GetLessonsData {
  courseId: string;
}

interface GetLessonData {
  courseId: string | undefined;
  lessonId: string | undefined;
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
  const [datum, setDatum] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createLesson = async (value:CreateLessonData) => {
    console.log(data)
    setLoading(true);
    try {
      await axios
      .post('/lessons', {
        courseId: value.courseId,
        title: value.title,
        description: value.description,
        file: value.file,
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

  const getLessons = async (value: GetLessonsData) => {
    setLoading(true);
    try {
      const params = {
        courseId: value.courseId
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
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const getLesson = async (value: GetLessonData) => {
    setLoading(true);
    console.log(value)
    try {
      const params = {
        courseId: value.courseId
      };
      await axios
      .get('/lessons', {
        params: params
      })
      .then((response:any)=>{
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
          const lesson = response.data[i];
          console.log(lesson)
          if (lesson.hasOwnProperty('lessonId') && lesson.lessonId === value.lessonId) {
            setDatum(lesson)
            console.log(lesson)
          }
        }
      });
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const updateLesson = async (value: UpdateLessonData) => {
    setLoading(true);
    try {
      await axios
      .patch('/lessons', {
        lessonId: value.lessonId,
        title: value.title,
        description: value.description,
        file: value.file
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

  const deleteLesson = async (value: DeleteLessonData) => {
    setLoading(true);
    try {
      await axios
      .delete('/lessons',  {
        data: { lessonId: value.lessonId } // Place the data within the 'data' key
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

  const updateProgress = async (value: UpdateProgressData) => {
    setLoading(true);
    try {
      await axios
      .patch('/lessons/progress', {
        enrollmentId: value.enrollmentId,
        lessonId: value.lessonId,
        status: value.status,
      })
      .then((response:any)=>{
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

  return {
    data,
    datum,
    loading,
    error,
    createLesson,
    getLessons,
    getLesson,
    updateLesson,
    deleteLesson,
    updateProgress
  }
}

export default useReqLesson;