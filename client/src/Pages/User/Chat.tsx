import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'


function Chat() {
  return <>
    <Box sx={{background:"white",position:"fixed",top:"66px",left:"0",height:"100%",width:"100%",display:"flex"}}>
      <Box width={"300px"} height={"100%"} sx={{borderRight:"1px solid #cbcbcb",padding:"1em"}}>
        <Typography variant="h5" color="primary" fontWeight={600}>Messages</Typography>
        <Box display="flex" flexDirection={"column"}  width={"100%"} mt={"10px"}>
          {/* Add People List Here */}
          <Box display="flex" alignItems={"center"} gap={"10px"} width={"100%"} sx={{'&:hover': {backgroundColor: '#e0e0e0', cursor: 'pointer',}, padding:"1em"}} component={Link} to={"/"}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 40, height: 40 }}
            />
            <Box width={"100%"}>
              <Typography variant="subtitle2" color="initial">Harold James H. Castillo</Typography>
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
                Hi I love you so much my wife qweqwe qweqe qwe qwe qqwe qweqw qw e
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems={"center"} gap={"10px"} width={"100%"} sx={{'&:hover': {backgroundColor: '#e0e0e0', cursor: 'pointer',}, padding:"1em"}} component={Link} to={"/"}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 40, height: 40 }}
            />
            <Box width={"100%"}>
              <Typography variant="subtitle2" color="initial">Harold James H. Castillo</Typography>
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
                Hi I love you so much my wife qweqwe qweqe qwe qwe qqwe qweqw qw e
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flexGrow={1} sx={{background:"",height:"95%",padding:"1em"}} display={"flex"} flexDirection={"column"}>
        <Typography variant="h5" color="primary">Harold James H. Castillo</Typography>
        <Box display="flex" flexDirection={"column"} sx={{padding:"1em",overflowY:"scroll",minHeight:"400px"}} flexGrow={"1"} justifyContent={"end"} gap="15px">

          {/* Add Messages Here */}
          {/* Message for the other user */}
          <Box display="flex" justifyContent={"start"}>
            <Paper elevation={3}  sx={{background:"#CBCBCB",borderRadius:"8px",padding:"1em",maxWidth:"60%"}} >
              <Typography variant="body1" color="initial" >Hi, I love you so much my wife</Typography>
            </Paper>
          </Box>

          {/* Message for user who is using this*/}
          <Box display="flex" justifyContent={"end"}>
            <Paper elevation={3}  sx={{background:"#E24B5B",borderRadius:"8px",padding:"1em",maxWidth:"60%"}} >
              <Typography variant="body1" color="#F5F5F5">Aww Cute naman I love you more </Typography>
            </Paper>
          </Box>


        </Box>
        <Box display="flex" height={"100px"} gap={"10px"} alignItems={"center"}>
          <TextField
            id="message"
            fullWidth
          />
          <Button variant="contained" color="primary" sx={{height:"4em",width:"150px"}}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  
  </>
}

export default Chat