import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import io from 'socket.io-client';
import axios from './../Hooks/useAxios'

// const socket = io('http://your-backend-server-url'); // Replace with your backend server URL

const TestChat = ({socket}) => {

  useEffect(() => {
    // Connect to the socket.io server
    socket.connect();

    // Listen for 'notification' events
    socket.on('chat', (data) => {
      console.log('New Chat:', data);
      // Handle the notification on the client side
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
      console.log("called");
    };
  }, []); // Run only once on component mount

  const sendChat = () => {
    const chatData = {
      sender: { userId : 'hulCsqKTmTFhvJrvfSs8hhyyVyAA5K0g6-', role: 'admin' },
      receiver: { userId : 'RBcIsCYNVTFj7VzSb07XzEMZiUQ1j9x1dd', role: 'student' },
      message: 'Message Content',
    };

    socket.emit('chat', chatData);
  };
  

  const getChat = async () => {
    try {
      await axios
      .get('/chats')
      .then((response:any)=>{
        console.log(response.data);
      });
    } catch (error: any) {
      console.log(error);
    } 
  };

  return (
    <div>
      <Button onClick={sendChat}>Test Send Chat</Button>
      <Button onClick={getChat}>Test Get Chat</Button>
    </div>
  );
};

export default TestChat;