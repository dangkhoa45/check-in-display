"use client";

import EventRow from "@/components/EventRow";
import { initialCheckIns, newCheckIns } from "@/types/checkInOutEvent";
import { useEffect, useState } from "react";

export default function CheckInList() {
  const [checkIns, setCheckIns] = useState(initialCheckIns);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= newCheckIns.length) return;
    const interval = setInterval(() => {
      const newEvent = { ...newCheckIns[index], isNew: true };
      setCheckIns((prev) => [newEvent, ...prev.slice(0, 2)]);
      setIndex((i) => i + 1);

      setTimeout(() => {
        setCheckIns((prev) =>
          prev.map((e) => (e.id === newEvent.id ? { ...e, isNew: false } : e))
        );
      }, 15000);
    }, 30000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <>
      {checkIns.map((event) => (
        <EventRow key={event.id} event={event} />
      ))}
    </>
  );
}
