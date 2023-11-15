import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import imageIcon from '../Images/Resources/Error.png'
function Error() {
    return<>
      <Box display="flex" justifyContent={"center"} alignItems={"center"} flexDirection={"column"} height={"100vh"} >
        <img width={"20%"} src={imageIcon} alt="" />
        <Typography textAlign={"center"} variant="h4" fontWeight={600} color="primary" mt={"20px"}>We Encounter Some Error</Typography>
        <Typography variant="body1" color="initial">sorry, try another way</Typography>
      </Box>
    </>
}

export default Error