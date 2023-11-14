import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import TurnedInIcon from '@mui/icons-material/TurnedIn';

function AppointmentDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[], currentMonth: number, currentYear: number }) {
  const { highlightedDays = [], day, currentMonth, currentYear, ...other } = props;

  const isCurrentMonth = day.month() === currentMonth && day.year() === currentYear;
  const isSelected = isCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <TurnedInIcon sx={{ fill: "#E24B5B" }} /> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={!isCurrentMonth} day={day} />
    </Badge>
  );
}

function TESTCalendar() {
  // selected day
  const [value, setValue] = React.useState<Dayjs | null>();

  const initialValue = dayjs();

  const [highlightedMonth, setHighlightedMonth] = useState(initialValue.month());
  const [highlightedYear, setHighlightedYear] = useState(initialValue.year());
  const [highlightedDays, setHighlightedDays] = useState([1, 23, 2, 15]); // Define your highlighted days

  // Set here all the scheduled days including year
  const [scheduledDate, setScheduledDate] = useState({
    [highlightedYear]: {
      "January": [1, 2, 3],
      "February": [4, 5, 6],
      "March": [7, 8, 9],
      "April": [],
      "May": [],
      "June": [],
      "July": [],
      "August": [],
      "September": [],
      "October": [],
      "November": [],
      "December": [],
    },
  });

  const handleMonthChange = (date: Dayjs) => {
    const setActiveMonth = date.month();
    const setActiveYear = date.year();
    setHighlightedMonth(setActiveMonth);
    setHighlightedYear(setActiveYear);

    const monthsArray = Object.values(scheduledDate[setActiveYear]);
    setHighlightedDays(monthsArray[setActiveMonth]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        onMonthChange={(value) => {
          handleMonthChange(value);
        }}
        slots={{
          day: (dayProps) => (
            <AppointmentDay
              {...dayProps}
              currentMonth={highlightedMonth}
              currentYear={highlightedYear}
              highlightedDays={highlightedDays}
            />
          ),
        }}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          alert(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

export default TESTCalendar;