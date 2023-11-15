import React, { useState , useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import TurnedInIcon from '@mui/icons-material/TurnedIn';

interface HighlightedDaysMap {
  [key: string]: number[]; // Key is a combination of month and year, e.g., "January-2022"
}

function AppointmentDay(props: PickersDayProps<Dayjs> & { highlightedDaysMap?: HighlightedDaysMap }) {
  const { highlightedDaysMap = {}, day, ...other } = props;
  const monthYearKey = day.format('MMMM-YYYY'); // Create a unique key for each month and year combination

  const highlightedDays = highlightedDaysMap[monthYearKey] || [];
  const isSelected = highlightedDays.includes(day.date());
  
  return (
    <Badge
      overlap="circular"
      badgeContent={isSelected ? <TurnedInIcon sx={{ fill: "#E24B5B" }} /> : undefined}
    >
      <PickersDay key={day.toString()} {...other} day={day} />
    </Badge>
  );
}

type Props = {
  appointments?:any;
  // setSelectedDay:React.Dispatch<React.SetStateAction<[dayjs.Dayjs | null | undefined, React.Dispatch<React.SetStateAction<dayjs.Dayjs | null | undefined>>]>>;
  // selectedDay: [dayjs.Dayjs | null | undefined, React.Dispatch<React.SetStateAction<dayjs.Dayjs | null | undefined>>]
  setSelectedDay?: any;
  selectedDay?: any;
}

function TESTCalendar({appointments,setSelectedDay,selectedDay}:Props) {
  // selected day
  const [value, setValue] = React.useState<Dayjs | null>();

  const initialValue = dayjs();

  const schedules = appointments?.map(item => item.schedule);


  const formatDateToMonthYear = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('en-us', { month: 'long' })}-${date.getFullYear()}`;
  };

  const formatSchedulesToHighlightedDaysMap = (schedules) => {
    const highlightedDaysMap = {};

    schedules.forEach((schedule) => {
      const key = formatDateToMonthYear(schedule);
      if (!highlightedDaysMap[key]) {
        highlightedDaysMap[key] = [];
      }

      // Assuming you want to highlight the day of the month
      const dayOfMonth = new Date(schedule).getDate();
      highlightedDaysMap[key].push(dayOfMonth);
    });

    return highlightedDaysMap;
  };


  const [highlightedDaysMap, setHighlightedDaysMap] = useState<HighlightedDaysMap>({
    // Set initial highlighted days here, e.g., "January-2022": [1, 2, 3]
    // this initial value is todays calendar 
    [initialValue.format('MMMM-YYYY')]: []
  });

  useEffect(() => {
    const updatedHighlightedDaysMap = {
      ...highlightedDaysMap,
      ...formatSchedulesToHighlightedDaysMap(schedules),
    };
    

    setHighlightedDaysMap(updatedHighlightedDaysMap);
  }, []); // Add dependencies if needed


  const handleMonthChange = (date: Dayjs) => {
    const monthYearKey = date.format('MMMM-YYYY'); // Create a unique key for each month and year combination

    // Check if highlighted days are already stored for the selected month and year
    if (!highlightedDaysMap[monthYearKey]) {
      // If not, you can fetch or set the highlighted days for the given month and year
      // For now, let's simulate it by setting some random highlighted days
      setHighlightedDaysMap((prevMap) => ({
        ...prevMap,
        [monthYearKey]: [],
      }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        // defaultValue={initialValue}
        onMonthChange={(value) => {
          handleMonthChange(value);
        }}
        slots={{
          day: (dayProps) => <AppointmentDay {...dayProps} highlightedDaysMap={highlightedDaysMap} />,
        }}
        value={selectedDay}
        onChange={(newValue) => {
          setSelectedDay(newValue)
        }}
      />
    </LocalizationProvider>
  );
}

export default TESTCalendar;