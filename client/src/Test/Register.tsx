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

  const [form, setForm] = useState({
    name: '', 
    first: '',
    middle: '',
    last: '',
    extension: '',
    sex: '',
    birthday: new Date(),
    address: '',
    contact: '',
    email: '', 
    password: '',
    role: '',
  });

 

  const clear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm({
      name: '', 
      first: '',
      middle: '',
      last: '',
      extension: '',
      sex: '',
      birthday: new Date(),
      address: '',
      contact: '',
      email: '', 
      password: '',
      role: '',
    });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  async function submit(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    console.log(form)
    register(
      form.name,
      form.first,
      form.middle,
      form.last,
      form.extension,
      form.sex,
      form.birthday,
      form.address,
      form.contact,
      form.email, 
      form.password,
      form.role
    )
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
          <Button variant="contained" color="primary" onClick={submit}>
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={clear}>
            Clear
          </Button>
        </Grid>
      </Grid>
      <h1>Admin</h1>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            label="Name"
            name="name"
            value={form.name}
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
            label="Contact"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            type="email"
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
            type="password"
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