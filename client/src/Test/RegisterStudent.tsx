import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';

import { useAuth } from '../Context/AuthContext';

type Props = {}

// eslint-disable-next-line
export default function Register({}: Props) {
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
    role: '',
  };

  const [form, setForm] = useState(initialFormState);

  const clear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm(initialFormState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  async function submit(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    register(form);
  };

  return (
    <div>
      <h1>Student</h1>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Contact Number"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Sex"
            name="sex"
            value={form.sex}
            onChange={handleChange}
            fullWidth
            type="text"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Birthday"
                value={dayjs(form.birthday)}
                onChange={(newDate) => {
                  if (newDate) {
                    setForm({
                      ...form,
                      birthday: newDate,
                    });
                  }
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={submit}>
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={clear}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}