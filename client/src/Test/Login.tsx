import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../Hooks/useAuth';

type Props = {}

// eslint-disable-next-line
export default function Login({}: Props) {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '', 
    password: '',
    role: ''
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
    login(form)
  };

  return (
    <div>
       <Grid container spacing={2}>
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