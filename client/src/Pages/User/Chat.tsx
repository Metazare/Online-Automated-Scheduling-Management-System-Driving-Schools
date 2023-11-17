import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
import useReqSchool from '../../Hooks/useReqSchool'
import useReqStudent from '../../Hooks/useReqStudent'

function Chat({socket}) {
  const navigate = useNavigate();
  const { id, type } = useParams();

  const { data: school, getSchool,  } = useReqSchool();
  const {data:schools, getSchool: getSchools} = useReqSchool();
  const {students:student, getStudent: getStudent} = useReqStudent();
  const {students:students, getStudent: getStudents} = useReqStudent();

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
      console.log(data)
      getChat()
    });

    if (getUser()==="student"){
      getSchool({
        schoolId: id
      })
    } else{
      getStudent({
        studentId: id
      })
    }

    getSchools({
      schoolId: null
    })
    getStudents({
      studentId: null
    })

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
    return data.filter(item => item.user !== userId)[0];
  }

  function appendSchoolDataToChat(chatData, schoolData) {
    // Iterate through school data
    schoolData.forEach(school => {
        // Find the chat associated with the school
        const associatedChat = chatData.find(chat =>
            chat.members.some(member => member.user === school.schoolId)
        );

        if (associatedChat) {
            // Append school data to the chat object
            associatedChat.schoolData = school;
        }
    });

    console.log(chatData)
    return chatData;
  }

  function appendStudentDataToChat(chatData, studentData) {
    // Iterate through school data
      studentData.forEach(student => {
        const associatedChat = chatData.find(chat =>
            chat.members.some(member => member.user === student.studentId)
        );

        if (associatedChat) {
            associatedChat.studentData = student;
        }
    });

    console.log(chatData)
    return chatData;
  }


  if (getUser()==="student"){
    if (!schools || loading) {
      return <div>Loading...</div>;
    }
  } else{
    if (!student || !students || loading) {
      return <div>Loading...</div>;
    }
  }

  return <>
    <Box sx={{background:"white",position:"fixed",top:"66px",left:"0",height:"100%",width:"100%",display:"flex"}}>
      {/* {JSON.stringify(chats?.filter(item => item.chatId === "VAYEsdyuyT_J7LPlnPlyWcf13yx7dtrZBH")[0])} */}
      <Box width={"300px"} height={"100%"} sx={{borderRight:"1px solid #cbcbcb",padding:"1em"}}>
        <Typography variant="h5" color="primary" fontWeight={600}>Messages</Typography>
        <Box display="flex" flexDirection={"column"}  width={"100%"} mt={"10px"}>

        {/* {JSON.stringify(appendSchoolDataToChat(chats, schools))} */}

{getUser() === "student" ? <>
{chats && appendSchoolDataToChat(chats, schools)?.map((chat: any) => (
            <Box display="flex" alignItems={"center"} gap={"10px"} width={"100%"} sx={{'&:hover': {backgroundColor: '#e0e0e0', cursor: 'pointer',}, padding:"1em"}} 
              onClick={() => {
                window.location.href = `/chat/${chat?.members.filter(item => item.user !== User()[getIdType()])[0].role}/${chat?.members.filter(item => item.user !== User()[getIdType()])[0].user}`;
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 40, height: 40 }}
              />
              <Box width={"100%"}>
                <Typography variant="subtitle2" color="initial">{chat?.schoolData?.name}</Typography>
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
</> : <>

{chats && appendStudentDataToChat(chats, students)?.map((chat: any) => (
            <Box display="flex" alignItems={"center"} gap={"10px"} width={"100%"} sx={{'&:hover': {backgroundColor: '#e0e0e0', cursor: 'pointer',}, padding:"1em"}} 
              onClick={() => {
                window.location.href = `/chat/${chat?.members.filter(item => item.user !== User()[getIdType()])[0].role}/${chat?.members.filter(item => item.user !== User()[getIdType()])[0].user}`;
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 40, height: 40 }}
              />
              <Box width={"100%"}>
                <Typography variant="subtitle2" color="initial">
                  
                  {chat?.studentData?.name.first} {chat?.studentData?.name.last}
                  
                  </Typography>
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

</>}
          
        </Box>
      </Box>

      <Box flexGrow={1} sx={{background:"",height:"95%",padding:"1em"}} display={"flex"} flexDirection={"column"}>
        <Typography variant="h5" color="primary">
          {/* {selectedChat && selectedChat?.members && getConversationPartner(selectedChat?.members, User()[getIdType()]).user} */}
          {/* {id || <>Select a Conversation Partner</>} */}
          {getUser() === "student" ? <>
            { selectedChat && getConversationPartner(selectedChat?.members, User()[getIdType()]).user 
            ? <>{school?.name}</> 
            : <>{school?.name}</>
            }
          </> : <>
            Student
          </>
          }
        </Typography>
        <Box display="flex" flexDirection={"column"} sx={{padding:"1em",overflowY:"scroll",minHeight:"400px"}} flexGrow={"1"} justifyContent={"end"} gap="15px">
          {/* {chats && chats?.filter(item => item.members === selectedChat?.chatId)[0]?.messages.map((chat: any) => (<>
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
          </>))} */}

          
          {chats && chats?.filter((chat) => chat.members.map((member) => member.user).includes(id))[0]?.messages?.map((chat: any) => (<>
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
            disabled={id ? false : true}
          />
          <Button 
            variant="contained" 
            color="primary" 
            sx={{height:"4em",width:"150px"}}
            disabled={id ? false : true}
            onClick={() => {
              sendChat({
                sender: { 
                  userId: User()[getIdType()],
                  role: getUser(),
                },
                receiver: { 
                  userId: id || selectedChat && selectedChat.members && getConversationPartner(selectedChat?.members, User()[getIdType()]).user,
                  role: type ? type : selectedChat && selectedChat.members && getConversationPartner(selectedChat?.members, User()[getIdType()]).role,
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