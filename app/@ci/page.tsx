"use client";

import EventRow from "@/components/EventRow";
import { useRealtimeEventData } from "@/hooks/useRealtimeEventData";

export default function CheckInList() {
  const { data, loading, error } = useRealtimeEventData({ status: "IN" });

  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col justify-between h-full">
      {loading && (
        <div className="text-center text-sm text-gray-400">
          Đang tải dữ liệu...
        </div>
      )}
      <div className="flex flex-col h-full">
        {data.map((item: any) => (
          <EventRow key={item.name} event={item} />
        ))}
      </div>
    </div>
  );
}
