import React, {useState} from 'react'
import axios from './useAxios'
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

interface Data {
  notifications: any;
  loading: boolean;
  error: Error | null;
  sendNotification: (data: SendNotificationData) => void;
  getNotification: () => void;
}

interface SendNotificationData {
  sender: string;
  targets: { user: string; role: string }[];
  content: string;
}

function useNotif(): Data {
  const [notifications, setNotifications] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendNotification = (data: SendNotificationData) => {
    const notificationData = {
      sender: data.sender,
      targets: data.targets,
      content: data.content,
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

  return {
    notifications,
    loading,
    error,
    sendNotification,
    getNotification
  }
}

export default useNotif;