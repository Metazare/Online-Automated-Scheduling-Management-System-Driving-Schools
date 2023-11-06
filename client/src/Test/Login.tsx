import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../Hooks/useAuth';

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '', 
    password: ''
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
      <TextField
        required
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        type="email"
      />
      <TextField
        required
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        type="password"
      />
      <Button variant="contained" color="primary" onClick={submit}>
        Submit
      </Button>
    </div>
  )
}