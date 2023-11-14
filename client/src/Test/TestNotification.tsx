import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import io from 'socket.io-client';
import axios from './../Hooks/useAxios'

// const socket = io('http://your-backend-server-url'); // Replace with your backend server URL

const TestNotification = ({socket}) => {

  useEffect(() => {
    // Connect to the socket.io server
    socket.connect();

    // Listen for 'notification' events
    socket.on('notification', (data) => {
      console.log('New Notification:', data);
      // Handle the notification on the client side
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
      console.log("called");
    };
  }, []); // Run only once on component mount

  const sendNotification = () => {
    const notificationData = {
      sender: 'hulCsqKTmTFhvJrvfSs8hhyyVyAA5K0g6-',
      targets: [{ user : 'RBcIsCYNVTFj7VzSb07XzEMZiUQ1j9x1dd', role: 'student' }],
      content: 'Notification content',
    };

    // Emit a 'notification' event to the server
    socket.emit('notification', notificationData);
  };

  const getNotification = async () => {

    try {
      await axios
      .get('/notifications')
      .then((response:any)=>{
        console.log(response.data);
      });
    } catch (error: any) {
      console.log(error);
    } 
  };

  return (
    <div>
      <Button onClick={sendNotification}>Test Send Notification</Button>
      <Button onClick={getNotification}>Test Get Notification</Button>
    </div>
  );
};

export default TestNotification;
