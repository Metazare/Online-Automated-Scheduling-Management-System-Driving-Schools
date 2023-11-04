import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <TextField
        required
        label="Name"
        name="name"
        value={form.name}
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
        label="Contact"
        name="contact"
        value={form.contact}
        onChange={handleChange}
        fullWidth
        type="number"
      />
      <TextField
        required
        label="About"
        name="about"
        value={form.about}
        onChange={handleChange}
        fullWidth
        type="text"
      />
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
      <TextField
        required
        label="Role"
        name="role"
        value={form.role}
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