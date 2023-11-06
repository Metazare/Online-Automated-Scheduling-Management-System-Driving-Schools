import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Course</InputLabel>
          <Select
            name="type"
            value={form.type}
            label="Course"
            onChange={handleChange}
          >
            <MenuItem value={"TDC Face to Face"}>TDC Face to Face</MenuItem>
            <MenuItem value={"PDC Automatic Motorcycle"}>PDC Automatic Motorcycle</MenuItem>
            <MenuItem value={"PDC Manual Motorcycle"}>PDC Manual Motorcycle</MenuItem>
            <MenuItem value={"PDC Automatic Car"}>PDC Automatic Car</MenuItem>
            <MenuItem value={"PDC Manual Car"}>PDC Manual Car</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" color="primary" onClick={submit} fullWidth>
        Add Course
      </Button>
    </div>
  )
}