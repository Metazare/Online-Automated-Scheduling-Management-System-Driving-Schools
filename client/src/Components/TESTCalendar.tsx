import React from 'react'
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


import TurnedInIcon from '@mui/icons-material/TurnedIn';
function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <TurnedInIcon sx={{fill:"#E24B5B"}}/> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}
function TESTCalendar() {
    
      // Remove the server-related state and logic
    
      const handleMonthChange = (date: Dayjs) => {
        // Remove the server-related logic
      };
      const highlightedDays = [1, ,23,2, 15]; // Manually define your highlighted days
      const initialValue = dayjs('2023-11-02'); // Set your desired date here

      
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            defaultValue={initialValue}
            // Remove loading and related props
            onMonthChange={handleMonthChange}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any,
            }}
          />
        </LocalizationProvider>
      );
    
}

export default TESTCalendar