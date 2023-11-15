import React, {useState} from 'react'
import axios from './useAxios'
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

interface Data {
  chats: any;
  loading: boolean;
  error: Error | null;
  sendChat: (data: SendChatData) => void;
  getChat: () => void;
}

interface SendChatData {
  sender: { userId: string; role: string };
  receiver: { userId: string; role: string };
  message: string;
}

function useChat(): Data {
  const [chats, setChats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const sendChat = (data: SendChatData) => {
    const chatData = {
      sender: data.sender,
      receiver: data.receiver,
      message: data.message,
    };
    console.log(chatData);
    socket.emit('chat', chatData);
  };

  const getChat = async () => {
    try {
      await axios
      .get('/chats')
      .then((response:any)=>{
        console.log(response.data);
        setChats(response.data);
      });
    } catch (error: any) {
      console.log(error);
    } 
  };

  return {
    chats,
    loading,
    error,
    sendChat,
    getChat
  }
}

export default useChat;