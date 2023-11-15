import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography'

import { Link } from 'react-router-dom';

import useNotif from '../Hooks/useNotif';

type Props ={

}

// Setting up the badge content number
// but based the number of content if the data is viewed or not (enrollment(approved/declined), appointment, reschedule)


function NotificationDropdown({}:Props) {
    const [badgeNotif ,setBadgeNotif] = useState(2);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    // const { notifications, loading, error, sendNotification, getNotification } = useNotif();


    return <>
        <React.Fragment>
            <IconButton  sx={{ p: "0", display: { md:'flex', xs:'none', sm:'flex'} }} onClick={handleClick}>
                <Badge badgeContent={badgeNotif} color="info">
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
                    <Box display={"flex"} flexDirection={"column"} padding={"10px 0"}  sx={{maxHeight:"80vh",overflowY:"scroll"}}>
                        <Box display={"flex"} padding={".5em"} component={Link} to={"/"}
                            sx={{
                                "&:hover": {
                                backgroundColor: "#d9d9d9", // Change this to the background color you desire on hover
                                },
                                borderRadius:"8px"
                            }}
                        > 
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                            <Box display="" >
                                <Typography variant="subtitle2" color="initial" fontSize={"11px"}><span>Harold James H. Castillo </span>  to Dianne Chrystalin Brandez</Typography>
                                <Typography variant="body2" color="initial"  fontSize={"10px"}>I love you so so much, Can we go out in a date?</Typography>
                            </Box>
                            
                        </Box>
                        <Box display={"flex"} padding={".5em"} component={Link} to={"/"}
                            sx={{
                                "&:hover": {
                                backgroundColor: "#d9d9d9", // Change this to the background color you desire on hover
                                },
                                borderRadius:"8px"
                            }}
                        > 
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                            <Box display="" >
                                <Typography variant="subtitle2" color="initial" fontSize={"11px"}><span>Harold James H. Castillo </span>  to Dianne Chrystalin Brandez</Typography>
                                <Typography variant="body2" color="initial"  fontSize={"10px"}>I love you so so much, Can we go out in a date?</Typography>
                            </Box>
                            
                        </Box>
                        <Box display={"flex"} padding={".5em"} component={Link} to={"/"}
                            sx={{
                                "&:hover": {
                                backgroundColor: "#d9d9d9", // Change this to the background color you desire on hover
                                },
                                borderRadius:"8px"
                            }}
                        > 
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                            <Box display="" >
                                <Typography variant="subtitle2" color="initial" fontSize={"11px"}><span>Harold James H. Castillo </span>  to Dianne Chrystalin Brandez</Typography>
                                <Typography variant="body2" color="initial"  fontSize={"10px"}>I love you so so much, Can we go out in a date?</Typography>
                            </Box>
                            
                        </Box>
                        <Box display={"flex"} padding={".5em"} component={Link} to={"/"}
                            sx={{
                                "&:hover": {
                                backgroundColor: "#d9d9d9", // Change this to the background color you desire on hover
                                },
                                borderRadius:"8px"
                            }}
                        > 
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                            <Box display="" >
                                <Typography variant="subtitle2" color="initial" fontSize={"11px"}><span>Harold James H. Castillo </span>  to Dianne Chrystalin Brandez</Typography>
                                <Typography variant="body2" color="initial"  fontSize={"10px"}>I love you so so much, Can we go out in a date?</Typography>
                            </Box>
                            
                        </Box>
                        <Box display={"flex"} padding={".5em"} component={Link} to={"/"}
                            sx={{
                                "&:hover": {
                                backgroundColor: "#d9d9d9", // Change this to the background color you desire on hover
                                },
                                borderRadius:"8px"
                            }}
                        > 
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                            <Box display="" >
                                <Typography variant="subtitle2" color="initial" fontSize={"11px"}><span>Harold James H. Castillo </span>  to Dianne Chrystalin Brandez</Typography>
                                <Typography variant="body2" color="initial"  fontSize={"10px"}>I love you so so much, Can we go out in a date?</Typography>
                            </Box>
                            
                        </Box>
                        <Box display={"flex"} padding={".5em"} component={Link} to={"/"}
                            sx={{
                                "&:hover": {
                                backgroundColor: "#d9d9d9", // Change this to the background color you desire on hover
                                },
                                borderRadius:"8px"
                            }}
                        > 
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                            <Box display="" >
                                <Typography variant="subtitle2" color="initial" fontSize={"11px"}><span>Harold James H. Castillo </span>  to Dianne Chrystalin Brandez</Typography>
                                <Typography variant="body2" color="initial"  fontSize={"10px"}>I love you so so much, Can we go out in a date?</Typography>
                            </Box>
                            
                        </Box>
                        <Box display={"flex"} padding={".5em"} component={Link} to={"/"}
                            sx={{
                                "&:hover": {
                                backgroundColor: "#d9d9d9", // Change this to the background color you desire on hover
                                },
                                borderRadius:"8px"
                            }}
                        > 
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                            <Box display="" >
                                <Typography variant="subtitle2" color="initial" fontSize={"11px"}><span>Harold James H. Castillo </span>  to Dianne Chrystalin Brandez</Typography>
                                <Typography variant="body2" color="initial"  fontSize={"10px"}>I love you so so much, Can we go out in a date?</Typography>
                            </Box>
                            
                        </Box>
                        <Box display={"flex"} padding={".5em"} component={Link} to={"/"}
                            sx={{
                                "&:hover": {
                                backgroundColor: "#d9d9d9", // Change this to the background color you desire on hover
                                },
                                borderRadius:"8px"
                            }}
                        > 
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                            <Box display="" >
                                <Typography variant="subtitle2" color="initial" fontSize={"11px"}><span>Harold James H. Castillo </span>  to Dianne Chrystalin Brandez</Typography>
                                <Typography variant="body2" color="initial"  fontSize={"10px"}>I love you so so much, Can we go out in a date?</Typography>
                            </Box>
                            
                        </Box>
                        <Box display={"flex"} padding={".5em"} component={Link} to={"/"}
                            sx={{
                                "&:hover": {
                                backgroundColor: "#d9d9d9", // Change this to the background color you desire on hover
                                },
                                borderRadius:"8px"
                            }}
                        > 
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 24, height: 24 }}
                            />
                            <Box display="" >
                                <Typography variant="subtitle2" color="initial" fontSize={"11px"}><span>Harold James H. Castillo </span>  to Dianne Chrystalin Brandez</Typography>
                                <Typography variant="body2" color="initial"  fontSize={"10px"}>I love you so so much, Can we go out in a date?</Typography>
                            </Box>
                            
                        </Box>
                        
                    </Box>
                </Box>
            </Menu>
        </React.Fragment>
    </>
    
}

export default NotificationDropdown