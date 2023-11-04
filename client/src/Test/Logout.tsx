import Button from '@mui/material/Button';
import { useAuth } from '../Hooks/useAuth';

export default function Login() {
  const { logout } = useAuth();
  
  return (
    <div>
      <Button variant="contained" color="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}