"use client";

import { Alarm } from "@/types/alarm";
import { CheckInOutEvent } from "@/types/checkInOutEvent";
import { useMemo } from "react";
import { useAlarmList } from "./useAlarmList";
import { useCheckInOutList } from "./useCheckInOutList";
import { useEmployees } from "./useEmployeeList";

interface Props {
  type: "IN" | "OUT";
}

export const useRealtimeEventData = ({ type }: Props) => {
  const { data: checkIns, loading, error } = useCheckInOutList({ type });
  const { data: employees } = useEmployees();
  const { data: alarmList } = useAlarmList();

  const employeeNames = useMemo(
    () => new Set(employees.map((e) => e.name)),
    [employees]
  );

  const unknownAlarms = useMemo(() => {
    return (alarmList as Alarm[]).filter(
      (alarm) =>
        !employeeNames.has(alarm.name) &&
        Math.abs(Date.now() - new Date(alarm.timestamp).getTime()) <= 15000
    );
  }, [alarmList, employeeNames]);

  const mergedData = useMemo(() => {
    return checkIns.map((event: CheckInOutEvent) => {
      const employee = employees.find((e) => e.name === event.employee);

      return {
        ...event,
        employee_name: employee?.employee_name || "Người lạ",
        custom_image:
          employee?.custom_face_images1 || event?.custom_image || "",
        is_unknown: unknownAlarms.some(
          (alarm) =>
            alarm.timestamp === event.time ||
            alarm.timestamp.includes(event.time)
        ),
      };
    });
  }, [checkIns, employees, unknownAlarms]);

  return { data: mergedData, loading, error };
};
