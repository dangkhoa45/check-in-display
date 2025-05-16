import { CheckIn } from "@/types/checkInOutEvent";

interface Props {
  event: CheckIn & { custom_image: string; employee_name: string };
}

export default function EventRow({ event }: Props) {
  const isUnknown = event.is_unknown === "1";

  const ppeItems = {
    giay: Boolean(event.is_boots),
    gangtay: Boolean(event.is_gloves),
    aophanquang: Boolean(event.is_vest),
  };

  const labelMap: Record<string, string> = {
    giay: "Giày",
    gangtay: "Găng tay",
    aophanquang: "Áo phản quang",
  };

  const ppeStatus = Object.values(ppeItems).every(Boolean) ? "Đầy đủ" : "Thiếu";

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

  const formattedTime = new Date(event.timestamp).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const renderPPEStatus = (ppeItems: any) => {
    if (!ppeStatus) return null;

    return (
      <div className=" bg-opacity-80 p-1 rounded mt-1">
        <div className="grid grid-cols-3 gap-x-2 gap-y-1">
          {Object.entries(ppeItems).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-1 px-1 py-0.5 rounded text-xs"
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  value ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-xs">{labelMap[key] || key}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${bgColor} text-white p-2 border-b border-gray-800 flex items-center transition-colors duration-500 flex-1 min-h-0`}
    >
      <div className="w-1/6 text-base font-mono">{formattedTime}</div>
      <div className="w-5/6 flex items-center gap-3">
        <div className="relative w-24 h-24">
          <img
            src={
              event.custom_image
                ? `https://dev4.tadalabs.vn/${event.custom_image}`
                : "/placeholder.svg"
            }
            alt={event.employee_name}
            className={`w-24 h-24 rounded-full object-cover ${
              isUnknown ? "border-4 border-red-500" : ""
            }`}
          />
          {isUnknown && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl font-bold text-red-500">X</div>
            </div>
          )}
          <div
            className={`absolute -bottom-0.5 right-3 w-5 h-5 rounded-full ${statusColor} border-2 border-gray-900`}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-xl">{event.employee_name}</div>
          {!isUnknown && ppeStatus === "Thiếu" && renderPPEStatus(ppeItems)}
          {isUnknown && (
            <div className="text-base font-medium bg-red-700 px-2 py-0.5 inline-block mt-1">
              Cảnh báo: Người lạ
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
