import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography'

import useNotif from '../Hooks/useNotif';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

type Props ={

}

// Setting up the badge content number
// but based the number of content if the data is viewed or not (enrollment(approved/declined), appointment, reschedule)


function NotificationDropdown({socket}) {
    const navigate = useNavigate();
    const {getUser} = useAuth();
    const [badgeNotif ,setBadgeNotif] = useState(2);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const { notifications, loading, error, sendNotification, getNotification, readNotification } = useNotif();

     useEffect(() => {
      // Connect to the socket.io server
      socket.connect();

      if(!notifications){
        getNotification()
      }

      // Listen for 'notification' events
      socket.on('notification', (data) => {
        getNotification()
      });

      // Clean up the socket connection on component unmount
      return () => {
        socket.disconnect();
      };
    }, []); // Run only once on component mount'

    function getUnreadCount(value) {
      // Filter notifications with status "unread"
      const unreadNotifications = value.filter(notification => notification.status === "unread");

      // Get the number of unread notifications
      return unreadNotifications.length;
    }

    return <>
        <React.Fragment>
            <IconButton  sx={{ p: "0", display: { md:'flex', xs:'none', sm:'flex'} }} onClick={handleClick}>
                <Badge badgeContent={notifications ? getUnreadCount(notifications) : 0} color="info">
                    <NotificationsIcon style={{fill:"#E8E8E8"}}/>
                </Badge>
            </IconButton>
            <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{padding:".5em 1em .5em"}} width={"300px"}>
                    <Typography variant="h6"  color={"primary"}>Notification</Typography>
                    <hr />
                    <Box display={"flex"} flexDirection={"column"} padding={"10px 0"}  sx={{maxHeight:"80vh",overflowY:"scroll",gap:".5em"}}>

                      {loading ? <p>Loading...</p> : error ? <p>{error.message}</p> : <>
                        {notifications && notifications.map((notification: any) => (
                            <Box
                            display="flex"
                            padding=".5em"
                            sx={{
                              "&:hover": {
                                backgroundColor: "#2795D4",
                                color:"white",cursor:"pointer"
                              },
                              borderRadius: "8px",
                              backgroundColor: notification?.status === "unread" ? "#d7d7d7" : "transparent",
                            }}
                            key={notification.id}
                            onClick={() => {
                              readNotification({ notificationId: notification.notificationId });
                              getNotification();
                              getNotification();
                              getNotification();
                              getNotification();

                              console.log(notification)
                              // if (getUser()==="student") {
                              //   navigate(`/course/${notification.sender}`);
                              // }
                            }}
                          >
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
                            <Box display="">
                              {/* <Typography variant="subtitle2" color="initial" fontSize="11px">
                                <span>Harold James H. Castillo </span> to Dianne Chrystalin Brandez
                              </Typography> */}
                              <Typography variant="body2" color="inherit" fontSize="10px">
                                {notification.content}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </>}
                    </Box>
                </Box>
            </Menu>
        </React.Fragment>
    </>
    
}

export default NotificationDropdown