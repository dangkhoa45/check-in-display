"use client";

import EventRow from "@/components/EventRow";
import {
  CheckInOutEvent,
  initialCheckIns,
  newCheckIns,
} from "@/types/checkInOutEvent";
import { useEffect, useState } from "react";

export default function CheckOutList() {
  const [checkOuts, setCheckOuts] =
    useState<CheckInOutEvent[]>(initialCheckIns);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index >= newCheckIns.length) return;

    const interval = setInterval(() => {
      const newEvent: CheckInOutEvent = {
        ...newCheckIns[index],
        isNew: true,
      };

      setCheckOuts((prev: CheckInOutEvent[]) => [
        newEvent,
        ...prev.slice(0, 2),
      ]);

      setIndex((i) => i + 1);

      setTimeout(() => {
        setCheckOuts((prev: CheckInOutEvent[]) =>
          prev.map((e: CheckInOutEvent) =>
            e.id === newEvent.id ? { ...e, isNew: false } : e
          )
        );
      }, 15000);
    }, 45000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <>
      {checkOuts.map((event: CheckInOutEvent) => (
        <EventRow key={event.id} event={event} />
      ))}
    </>
  );
}
