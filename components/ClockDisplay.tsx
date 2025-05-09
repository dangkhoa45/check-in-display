"use client";

import { useEffect, useState } from "react";

export default function ClockDisplay() {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      setCurrentDate(`${day}/${month}/${year}`);
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">{currentDate}</div>
      <div className="text-xl font-mono bg-gray-900 px-3 py-1 rounded">
        {currentTime}
      </div>
    </div>
  );
}
