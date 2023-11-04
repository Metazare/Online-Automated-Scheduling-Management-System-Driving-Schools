import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../Hooks/useAuth';

export default function RegisterInstructor() {
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
    role: 'instructor',
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
  )
}