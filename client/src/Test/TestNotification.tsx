import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import io from 'socket.io-client';
import axios from './../Hooks/useAxios'

// const socket = io('http://your-backend-server-url'); // Replace with your backend server URL

import useNotif from '../Hooks/useNotif';
import { useAuth } from '../Hooks/useAuth';
import { map } from '@firebase/util';

const TestNotification = ({socket}) => {
  const { notifications, loading, error, sendNotification, getNotification } = useNotif();
  const { getUser } = useAuth();

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';

  useEffect(() => {
    // Connect to the socket.io server
    socket.connect();

    // Listen for 'notification' events
    socket.on('notification', (data) => {
      getNotification()
      console.log(notifications)
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
      console.log("called");
    };
  }, []); // Run only once on component mount

  async function submit(e: any){
    e.preventDefault();
    sendNotification({
      sender: 'hulCsqKTmTFhvJrvfSs8hhyyVyAA5K0g6-',
      targets: [{ user : 'RBcIsCYNVTFj7VzSb07XzEMZiUQ1j9x1dd', role: 'student' }],
      content: 'Notification content',
    })
  };

  return (
    <div>
      <Button onClick={submit}>Test Send Notification</Button>

      {notifications && notifications.map((notification: any) => (
        <div key={notification.id}>
          <p>{notification.content}</p>
        </div>
      ))}

    </div>
  );
};

export default TestNotification;
