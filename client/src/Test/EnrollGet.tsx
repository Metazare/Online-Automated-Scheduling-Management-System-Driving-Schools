import React, {useState} from 'react'
import useReqEnroll from '../Hooks/useReqEnroll'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function EnrollGet() {
  const { data, getEnrollments } = useReqEnroll();

  const [form, setForm] = useState({
    enrollmentId: null,
    courseId: null,
    status: null,
    courseType: null,
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  async function submit(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    getEnrollments(form)
  };

  return (
    <div>
      <TextField
        required
        label="Enrollment ID"
        name="enrollmentId"
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Course ID"
        name="courseId"
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Status"
        name="status"
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Course Type"
        name="courseType"
        onChange={handleChange}
        fullWidth
        type="text"
      />

      <Button onClick={submit}>Submit</Button>
    </div>
  );
}