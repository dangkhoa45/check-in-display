import { CheckInOutEvent } from "@/types/checkInOutEvent";

interface Props {
  event: CheckInOutEvent & { is_unknown?: boolean };
}

export default function EventRow({ event }: Props) {
  const isUnknown = event.is_unknown;

  const ppeItems = {
    giay: Boolean(event.custom_is_boots),
    gangtay: Boolean(event.custom_is_gloves),
    aophanquang: Boolean(event.custom_is_vest),
  };

  const labelMap: Record<string, string> = {
    giay: "Giày",
    gangtay: "Găng tay",
    aophanquang: "Áo phản quang",
  };

  const ppeStatus = Object.values(ppeItems).every(Boolean) ? "Đầy đủ" : "Thiếu";

  const statusMessage =
    ppeStatus === "Đầy đủ" ? "Check-in thành công" : "Thiếu đồ bảo hộ";

  let bgColor = "bg-gray-900";
  let statusColor = "bg-green-500";

  if (ppeStatus === "Thiếu") {
    bgColor = "bg-orange-500 bg-opacity-30";
    statusColor = "bg-orange-500";
  }

  if (isUnknown) {
    bgColor = "bg-red-600 bg-opacity-30";
    statusColor = "bg-red-600";
  }

  const renderPPEStatus = (ppeItems: any) => (
    <div className="flex flex-wrap gap-2 mt-1">
      {Object.entries(ppeItems).map(([key, value]) => (
        <div
          key={key}
          className="flex items-center gap-1 px-1 py-0.5 rounded text-xs"
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              value ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span>{labelMap[key] || key}</span>
        </div>
      ))}
    </div>
  );

  const formattedTime = new Date(event.time).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className={`${bgColor} text-white p-2 border-b border-gray-800 flex items-center transition-colors duration-500`}
    >
      <div className="w-1/6 text-base font-mono">{formattedTime}</div>
      <div className="w-5/6 flex items-center gap-3">
        <div className="relative w-24 h-24">
          <img
            src={
              `https://dev4.tadalabs.vn/${event.custom_image}` ||
              "/placeholder.svg"
            }
            alt={event.employee_name}
            className="w-24 h-24 rounded-full object-cover transform rotate-90"
          />
          <div
            className={`absolute -bottom-0.5 right-3 w-5 h-5 rounded-full border-2 border-gray-900 ${
              ppeStatus === "Đầy đủ" ? "bg-green-500" : "bg-orange-500"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-xl">{event.employee_name}</div>
          {ppeStatus === "Thiếu" && renderPPEStatus(ppeItems)}
        </div>

        {isUnknown && (
          <div className="text-sm bg-red-700 px-2 py-0.5 rounded mt-1 inline-block">
            🚨 Cảnh báo: Người lạ
          </div>
        )}
      </div>
    </div>
  );
}
