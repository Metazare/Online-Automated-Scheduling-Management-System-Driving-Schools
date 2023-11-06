import React, { useState } from 'react';
import useReqEnroll from '../Hooks/useReqEnroll';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function EnrollStudent() {
  const { enroll } = useReqEnroll();

  const [form, setForm] = useState({
    courseId: '',
    days: [] as number[],
    startTime: new Date(), 
    endTime: new Date()
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeStart = (time: any) => {
    setForm({
      ...form,
      startTime: time,
    });
  };

  const handleChangeEnd = (time: any) => {
    setForm({
      ...form,
      endTime: time,
    });
  };

  async function submit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(form);
    enroll(form);
  }

  const handleCheckboxChange = (e:any) => {
    let day: number[] = form.days;

    const dayMap: { [key: string]: number } = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const selectedDay = dayMap[e.target.id];

    if (selectedDay !== undefined) {
      if (day.includes(selectedDay)) {
        day = day.filter(dayValue => dayValue !== selectedDay);
      } else {
        day.push(selectedDay);
      }
    }

    setForm({ ...form, days: day});
  };

  return (
    <div>
      <TextField
        required
        label="Course"
        name="courseId"
        value={form.courseId}
        onChange={handleChange}
        fullWidth
        type="text"
      />

    <FormGroup>
      <FormControlLabel control={<Checkbox id="sunday" onChange={handleCheckboxChange}/>} label="Sunday" />
      <FormControlLabel control={<Checkbox id="monday" onChange={handleCheckboxChange}/>} label="Monday" />
      <FormControlLabel control={<Checkbox id="tuesday" onChange={handleCheckboxChange}/>} label="Tuesday" />
      <FormControlLabel control={<Checkbox id="wednesday" onChange={handleCheckboxChange}/>} label="Wednesday" />
      <FormControlLabel control={<Checkbox id="thursday" onChange={handleCheckboxChange}/>} label="Thursday" />
      <FormControlLabel control={<Checkbox id="friday" onChange={handleCheckboxChange}/>} label="Friday" />
      <FormControlLabel control={<Checkbox id="saturday" onChange={handleCheckboxChange}/>} label="Saturday" />
    </FormGroup>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Start Time"
          onChange={handleChangeStart}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="End Time"
          onChange={handleChangeEnd}
        />
      </LocalizationProvider>
      <Button onClick={submit}>Submit</Button>
    </div>
  );
}
