import React from 'react'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { io } from 'socket.io-client'

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

type Props = {}
let badgeContentNumber = 0
const socket = io('http://localhost:5000')


export default function Header({}: Props) {

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };


  // Recieve the notification from the server
  socket.on('recieve_notification', (studentName, appointmentDate, course) => {
    console.log(studentName, appointmentDate, course)
    
    if (studentName === '' || appointmentDate === '' || course === '') return
    badgeContentNumber = badgeContentNumber += 1
    
    console.log(badgeContentNumber)
  })

  return (
    <Badge badgeContent={badgeContentNumber} color="primary">
      <MailIcon color="action" />
    </Badge>
  )
}