import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import useReqEnroll from '../Hooks/useReqEnroll'

export default function EnrollGet() {
  const { data, getEnrollments, updateEnrollments } = useReqEnroll();
  const [reason, setReason] = useState('');
  const [form, setForm] = useState({
    enrollmentId: null,
    courseId: null,
    status: null,
    courseType: null,
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
    getEnrollments(form)
    console.log(data)
  };

  return (
    <div>
      <div>
        <TextField
          required
          label="Enrollment ID"
          name="enrollmentId"
          onChange={handleChange}
          fullWidth
          type="text"
        />
        <TextField
          required
          label="Course ID"
          name="courseId"
          onChange={handleChange}
          fullWidth
          type="text"
        />
        <TextField
          required
          label="Status"
          name="status"
          onChange={handleChange}
          fullWidth
          type="text"
        />
        <TextField
          required
          label="Course Type"
          name="courseType"
          onChange={handleChange}
          fullWidth
          type="text"
        />
        <Button onClick={submit}>Submit</Button>
      </div>
      <div>
        {data?.map((item: any) => (
          <Card key={item.enrollmentId} sx={{ minWidth: 275 }} variant="outlined">
            {/* <p>{JSON.stringify(item)}</p> */}
            <CardContent>
              <Typography variant="body2">{item.student.name.first} {item.student.name.last}</Typography>
              <Typography variant="body2">{item.course.type}</Typography>
              <Typography variant="body2">{item.status}</Typography>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                color="success" 
                onClick={() => updateEnrollments({
                  enrollmentId: item.enrollmentId, status: 'accepted', reason: null
                })}
              >
                Accept
                </Button>
              <Button 
                variant="contained" 
                color="error"
                onClick={() => updateEnrollments({
                  enrollmentId: item.enrollmentId, status: 'declined', reason: reason
                })}
              >
                Decline
              </Button>
              <TextField
                variant="standard"
                label="Reason"
                name="courseType"
                onChange={(e)=> setReason(e.target.value)}
                type="text"
              />
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}