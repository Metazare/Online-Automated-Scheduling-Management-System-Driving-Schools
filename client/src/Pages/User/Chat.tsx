import React, {useState, useEffect} from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import useChat from '../../Hooks/useChat'
import { useAuth } from '../../Hooks/useAuth'

function Chat({socket}) {
  const { chats, loading, error, sendChat, getChat } = useChat();
  const { User, getUser } = useAuth();
  const [selectedChat, setSelectedChat] = useState<any>();
  const [message, setMessage] = useState<string>('');


  useEffect(() => {
    // Connect to the socket.io server
    socket.connect();

    if(!chats){
      getChat()
    }

    socket.on('chat', (data) => {
      getChat()
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Run only once on component mount


  function getIdType(){
    switch(getUser()){
      case "admin":
        return "schoolId";
      case "student":
        return "studentId";
      case "instructor":
        return "instructorId";
      default:
        return "studentId"
    }
  }

  function getConversationPartner(data, userId) {
    console.log(data.filter(item => item.user !== userId))
    return data.filter(item => item.user !== userId)[0];
  }

  function findConversation(data, chatId) {
    console.log(data.filter(item => item.chatId !== chatId)[0])
    return data.filter(item => item.chatId !== chatId)[0];
  }

  return <>
    <Box sx={{background:"white",position:"fixed",top:"66px",left:"0",height:"100%",width:"100%",display:"flex"}}>
      <Box width={"300px"} height={"100%"} sx={{borderRight:"1px solid #cbcbcb",padding:"1em"}}>
        <Typography variant="h5" color="primary" fontWeight={600}>Messages</Typography>
        <Box display="flex" flexDirection={"column"}  width={"100%"} mt={"10px"}>

          {chats && chats?.map((chat: any) => (
            <Box display="flex" alignItems={"center"} gap={"10px"} width={"100%"} sx={{'&:hover': {backgroundColor: '#e0e0e0', cursor: 'pointer',}, padding:"1em"}} 
              onClick={() => {
                setSelectedChat(chat);
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 40, height: 40 }}
              />
              <Box width={"100%"}>
                <Typography variant="subtitle2" color="initial">{chat?.chatId}</Typography>
                <Typography
                  variant="body2"
                  color="initial"
                  mt="-5px"
                  sx={{
                    width: '80%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {chat?.messages[chat.messages.length - 1]?.message}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box flexGrow={1} sx={{background:"",height:"95%",padding:"1em"}} display={"flex"} flexDirection={"column"}>
        <Typography variant="h5" color="primary">
          {selectedChat && selectedChat?.members && getConversationPartner(selectedChat?.members, User()[getIdType()]).user}
        </Typography>
        <Box display="flex" flexDirection={"column"} sx={{padding:"1em",overflowY:"scroll",minHeight:"400px"}} flexGrow={"1"} justifyContent={"end"} gap="15px">
          {selectedChat && selectedChat?.messages && selectedChat?.messages.map((chat: any) => (<>
            {(chat?.user === User()[getIdType()]) ? 
              <Box display="flex" justifyContent={"end"}>
                <Paper elevation={3}  sx={{background:"#E24B5B",borderRadius:"8px",padding:"1em",maxWidth:"60%"}} >
                  <Typography variant="body1" color="#F5F5F5">{chat?.message}</Typography>
                </Paper>
              </Box>
              :
              <Box display="flex" justifyContent={"start"}>
                <Paper elevation={3}  sx={{background:"#CBCBCB",borderRadius:"8px",padding:"1em",maxWidth:"60%"}} >
                  <Typography variant="body1" color="initial" >{chat?.message}</Typography>
                </Paper>
              </Box>
            }
          </>))}
        </Box>
        <Box display="flex" height={"100px"} gap={"10px"} alignItems={"center"}>
          <TextField
            id="message"
            fullWidth
            label="Message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            sx={{height:"4em",width:"150px"}}
            onClick={() => {
              
              console.log("SENDER")
              console.log(User()[getIdType()])
              console.log(getUser())

              console.log("RECEIVER")
              console.log(selectedChat && selectedChat.members && getConversationPartner(selectedChat?.members, User()[getIdType()]).user)
              console.log(selectedChat && selectedChat.members && getConversationPartner(selectedChat?.members, User()[getIdType()]).role)

              sendChat({
                sender: { 
                  userId: User()[getIdType()],
                  role: getUser(),
                },
                receiver: { 
                  userId: selectedChat && selectedChat.members && getConversationPartner(selectedChat?.members, User()[getIdType()]).user,
                  role: selectedChat && selectedChat.members && getConversationPartner(selectedChat?.members, User()[getIdType()]).role,
                },
                message: message,
              });
              setMessage("");
              getChat();
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  </>
}

export default Chat