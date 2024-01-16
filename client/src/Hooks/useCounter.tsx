import React, { useEffect, useState } from 'react';

function useCounter() {
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer.seconds === 0) {
          if (prevTimer.minutes === 0) {
            clearInterval(intervalId);
            return prevTimer; // No change to timer when both minutes and seconds are 0
          } else {
            return { minutes: prevTimer.minutes - 1, seconds: 59 };
          }
        } else {
          return { ...prevTimer, seconds: prevTimer.seconds - 1 };
        }
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [timer]);

  return { timer, setTimer };
}

export default useCounter;
