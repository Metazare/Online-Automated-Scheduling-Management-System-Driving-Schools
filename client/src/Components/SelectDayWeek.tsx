import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

type Props = {
  selectedDay: any,
  setSelectedDay: any


}

function SelectDayWeek({selectedDay,setSelectedDay}:Props) {
  const handleChange = (day: string) => {
    if (selectedDay.includes(day)) {
      setSelectedDay((prevSelectedDays) =>
        prevSelectedDays.filter((selected) => selected !== day)
      );
    } else {
      setSelectedDay((prevSelectedDays) => [...prevSelectedDays, day]);
    }
  };
  return <>
    <Box>
      {selectedDay}
      <Box display="flex"  gap={"5px"}>
        <Box flexGrow={1} display={"flex"} justifyContent={"center"}>
          <IconButton aria-label="" onClick={()=>{
            handleChange("sunday")
          }}>
            <Typography variant="subtitle2" color={selectedDay.includes("sunday")?"primary":"inital"}>Su</Typography>
          </IconButton>
        </Box>
        <Box flexGrow={1} display={"flex"} justifyContent={"center"}>
          <IconButton aria-label="" onClick={()=>{
            handleChange("monday")
          }}>
            <Typography variant="subtitle2" color={selectedDay.includes("monday")?"primary":"inital"}>Mo</Typography>
          </IconButton>
        </Box>
        <Box flexGrow={1} display={"flex"} justifyContent={"center"}>
          <IconButton aria-label="" onClick={()=>{
            handleChange("tuesday")
          }}>
            <Typography variant="subtitle2" color={selectedDay.includes("tuesday")?"primary":"inital"}>Tu</Typography>
          </IconButton>
        </Box>
        <Box flexGrow={1} display={"flex"} justifyContent={"center"}>
          <IconButton aria-label="" onClick={()=>{
            handleChange("wednesday")
          }}>
            <Typography variant="subtitle2" color={selectedDay.includes("wednesday")?"primary":"inital"}>We</Typography>
          </IconButton>
        </Box>
        <Box flexGrow={1} display={"flex"} justifyContent={"center"}>
          <IconButton aria-label="" onClick={()=>{
            handleChange("thursday")
          }}>
            <Typography variant="subtitle2" color={selectedDay.includes("thursday")?"primary":"inital"}>Th</Typography>
          </IconButton>
        </Box>
        <Box flexGrow={1} display={"flex"} justifyContent={"center"}>
          <IconButton aria-label="" onClick={()=>{
            handleChange("friday")
          }}>
            <Typography variant="subtitle2" color={selectedDay.includes("friday")?"primary":"inital"}>Fr</Typography>
          </IconButton>
        </Box>
        <Box flexGrow={1} display={"flex"} justifyContent={"center"}>
          <IconButton aria-label="" onClick={()=>{
            handleChange("saturday")
          }}>
            <Typography variant="subtitle2" color={selectedDay.includes("saturday")?"primary":"inital"}>Sa</Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>
  </>
}

export default SelectDayWeek