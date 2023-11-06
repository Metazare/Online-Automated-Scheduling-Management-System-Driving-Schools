import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useAuth } from '../Hooks/useAuth';

export default function Register() {
  const { register } = useAuth();

  const initialFormState = {
    name: '',
    first: '',
    middle: '',
    last: '',
    extension: '',
    sex: '',
    birthday: new Date(),
    address: '',
    contact: '',
    about: '',
    email: '',
    password: '',
    role: 'student',
  };

  const [form, setForm] = useState(initialFormState);

  const clear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm(initialFormState);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeBirthday = (date: any) => {
    setForm({
      ...form,
      birthday: date,
    });
  };

  async function submit(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    register(form);
  };

  return (
    <div>
      <TextField
        required
        label="First Name"
        name="first"
        value={form.first}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Middle Name"
        name="middle"
        value={form.middle}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Last Name"
        name="last"
        value={form.last}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Extension Name"
        name="extension"
        value={form.extension}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Address"
        name="address"
        value={form.address}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Contact Number"
        name="contact"
        value={form.contact}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sex</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name="sex"
            value={form.sex}
            label="Sex"
            onChange={handleChange}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Birthday"
          value={dayjs(form.birthday)}
          onChange={handleChangeBirthday}
        />
      </LocalizationProvider>
      <TextField
        required
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <TextField
        required
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        type="text"
      />
      <Button variant="contained" color="primary" onClick={submit}>
        Submit
      </Button>
      <Button variant="contained" color="primary" onClick={clear}>
        Clear
      </Button>
    </div>
  );
}