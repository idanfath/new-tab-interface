import { useState, useEffect } from "react";

export const useTime = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-US"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};
