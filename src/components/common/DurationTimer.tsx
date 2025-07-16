import { useState, useEffect } from "react";

interface DurationTimerProps {
  checkinTime: string;
  className?: string;
}

const DurationTimer: React.FC<DurationTimerProps> = ({
  checkinTime,
  className,
}) => {
  const [duration, setDuration] = useState<string>("00 : 00 : 00");

  useEffect(() => {
    const checkinDate = new Date(checkinTime);

    const calculateDuration = () => {
      const now = new Date();
      const diffInSeconds = Math.floor(
        (now.getTime() - checkinDate.getTime()) / 1000
      );

      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      setDuration(
        `${formattedHours} : ${formattedMinutes} : ${formattedSeconds}`
      );
    };

    calculateDuration();

    const intervalId = setInterval(calculateDuration, 1000);

    return () => clearInterval(intervalId);
  }, [checkinTime]);

  return <div className={`${className} `}>{duration}</div>;
};

export default DurationTimer;
