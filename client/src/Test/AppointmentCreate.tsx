import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useReqAppointment from '../Hooks/useReqAppointment';

export default function AppointmentCreate() {
  const { createAppointment } = useReqAppointment();

  const [form, setForm] = useState({
    studentId: '',
    instructorId: '',
    vehicle: '',
    schedule: new Date().toString()
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
    createAppointment(form)
  };

  return (
    <div>
      <TextField
        required
        label="Student Id"
        name="studentId"
        value={form.studentId}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Instructor Id"
        name="instructorId"
        value={form.instructorId}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Vehicle"
        name="vehicle"
        value={form.vehicle}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Schedule"
        name="schedule"
        value={form.schedule}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <Button variant="contained" color="primary" onClick={submit}>
        Submit
      </Button>
    </div>
  )
}