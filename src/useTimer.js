import { useState, useEffect, useContext } from 'react';
import dayjs from 'dayjs';
import LocationContext from './components/LocationContext'; // Import the context

const useTimer = () => {
  const location = useContext(LocationContext); // Use location from the context
  const [initTime, setInitTime] = useState(null);
  const [value, setValue] = useState({
    day: 0,
    hour: '00',
    minute: '00',
    second: '00',
  });

  useEffect(() => {
    // Set the initial time based on the location
    let targetTime;
    switch (location) {
      case 'sg':
        targetTime = dayjs('2024-11-10T00:00:00'); // November 10, 2024 for sg
        break;
      case 'lt':
        targetTime = dayjs('2024-10-13T00:00:00'); // October 13, 2024 for lt
        break;
      case 'tn':
        targetTime = dayjs('2024-10-27T00:00:00'); // October 27, 2024 for tn
        break;
      default:
        targetTime = dayjs('2024-11-10T00:00:00'); // Default date
        break;
    }
    setInitTime(targetTime); // Set the initial time based on location
  }, [location]);

  useEffect(() => {
    if (!initTime) return; // Wait for initTime to be set

    const inter = setInterval(() => {
      const nowTime = dayjs();
      if (nowTime.isBefore(initTime)) {
        const day = initTime.diff(nowTime, 'd');
        const hour = (initTime.diff(nowTime, 'h') % 24).toString().padStart(2, '0');
        const minute = (initTime.diff(nowTime, 'm') % 60).toString().padStart(2, '0');
        const second = (initTime.diff(nowTime, 's') % 60).toString().padStart(2, '0');

        setValue({ day, hour, minute, second });
      } else {
        setValue({
          day: 0,
          hour: '00',
          minute: '00',
          second: '00',
        });
        stopTimer();
      }
    }, 1000);

    return () => clearInterval(inter); // Cleanup on unmount
  }, [initTime]);

  const stopTimer = () => {
    clearInterval(inter);
  };

  return { value, stopTimer }; // Return the timer values and stopTimer function
};

export default useTimer;
