import { useState, useEffect } from 'react';

interface DurationTimerProps {
  checkinTime: string;
  className?: string
}

const DurationTimer: React.FC<DurationTimerProps> = ({ checkinTime, className }) => {
  const [duration, setDuration] = useState<string>("00 : 00 : 00");

  useEffect(() => {
    // Parse the check-in time
    const checkinDate = new Date(checkinTime);
    
    // Function to calculate and format duration
    const calculateDuration = () => {
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - checkinDate.getTime()) / 1000);
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;
      
      // Format with leading zeros
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');
      
      // Set the formatted duration
      setDuration(`${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`);
    };
    
    // Calculate initial duration
    calculateDuration();
    
    // Set up interval to update every second
    const intervalId = setInterval(calculateDuration, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [checkinTime]);
  
  return (
    <div className={`${className} `}>
    {duration}
    </div>
  );
};

export default DurationTimer;