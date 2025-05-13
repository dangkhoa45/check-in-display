"use client";

import { CheckIn } from "@/types/checkInOutEvent";
import { useMemo } from "react";
import { useCheckList } from "./useCheckList";
import { useEmployees } from "./useEmployeeList";

interface Props {
  status: "IN" | "OUT";
}

export const useRealtimeEventData = ({ status }: Props) => {
  const { data: checkIns, loading, error } = useCheckList({ status });
  const { data: employees } = useEmployees();

  const mergedData = useMemo(() => {
    return checkIns.map((event: CheckIn) => {
      const employee = employees.find((e) => e.name === event.employee_id);

      return {
        ...event,
        employee_name: employee?.employee_name || "Người lạ",
        custom_image: employee?.custom_face_images1 || "",
      };
    });
  }, [checkIns, employees]);

  return { data: mergedData, loading, error };
};
