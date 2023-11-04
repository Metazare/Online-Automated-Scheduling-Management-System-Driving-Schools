import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useReqCourse from '../Hooks/useReqCourse';

export default function AddCourse() {
  const { postCourse } = useReqCourse();

  const [form, setForm] = useState({
    type: ''
  })

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  async function submit(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    postCourse(form)
  };

  return (
    <div>
      <Grid container spacing={2}>
       <Grid item xs={12}>
          <TextField
            required
            label="Course"
            name="type"
            value={form.type}
            onChange={handleChange}
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={submit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}