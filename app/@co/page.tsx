"use client";

import EventRow from "@/components/EventRow";
import { useCheckInOutList } from "@/hooks/useCheckInOutList";
import { useEmployees } from "@/hooks/useEmployeeList";

export default function CheckOutList() {
  const { data, loading, error } = useCheckInOutList({ type: "OUT" });
  const { data: employees } = useEmployees();

  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  const mappedData = data.map((event) => {
    const matched = employees.find((emp) => emp.name === event.employee);
    return {
      ...event,
      custom_image: matched?.custom_face_images1 || "/placeholder.svg",
    };
  });

  return (
    <div className="flex flex-col justify-between h-full">
      {loading && (
        <div className="text-center text-sm text-gray-400">
          Đang tải dữ liệu...
        </div>
      )}
      <div className="min-h-[320px]">
        {mappedData.map((item) => (
          <EventRow key={item.name} event={item} />
        ))}
      </div>
    </div>
  );
}
